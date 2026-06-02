import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { GAMES_DB, SERVICES_DB } from '../data/db';

export default function Header() {
    const { user, logout, setModal } = useApp();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const wrapRef = useRef(null);

    const handleSearch = (val) => {
        setQuery(val);
        if (val.length < 2) { setResults([]); return; }
        const q = val.toLowerCase();
        const games = GAMES_DB.filter(g => g.title.toLowerCase().includes(q)).map(g => ({ ...g, _type: 'game' }));
        const svcs = SERVICES_DB.filter(s => s.name.toLowerCase().includes(q)).map(s => ({ ...s, _type: 'service' }));
        setResults([...games, ...svcs].slice(0, 7));
    };

    useEffect(() => {
        const handler = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setResults([]); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <header className="header">
            <div className="logo">GGBUY</div>

            <div className="search-wrapper" ref={wrapRef}>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Поиск игр, сервисов..."
                        value={query}
                        onChange={e => handleSearch(e.target.value)}
                    />
                    <button className="search-btn">🔍</button>
                </div>
                {results.length > 0 && (
                    <div className="search-results">
                        {results.map(r => (
                            <div
                                key={r._type + r.id}
                                className="search-result-item"
                                onClick={() => {
                                    if (r._type === 'game') setModal({ type: 'game', game: r });
                                    setResults([]);
                                    setQuery('');
                                }}
                            >
                                <span>{r._type === 'game' ? '🎮' : r.icon}</span>
                                <span>{r.title || r.name}</span>
                                <span className="price">
                  {r._type === 'game'
                      ? `${r.discount ? (r.price * (1 - r.discount / 100)).toFixed(2) : r.price}$`
                      : `${r.price}$`}
                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="header-spacer" />

            {user ? (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: 'var(--gray)' }}>
            👤 {user.username}
          </span>
                    <button className="btn-login" onClick={logout}>ВЫЙТИ</button>
                </div>
            ) : (
                <button className="btn-login" onClick={() => setModal('login')}>ВХОД</button>
            )}
        </header>
    );
}