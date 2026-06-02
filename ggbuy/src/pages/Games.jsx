import React, { useState } from 'react';
import { GAMES_DB, GENRES } from '../data/db';
import GameCard from '../components/GameCard';

export default function Games() {
    const [activeGenre, setActiveGenre] = useState('Все');
    const [sort, setSort] = useState('default');

    let games = activeGenre === 'Все' ? GAMES_DB : GAMES_DB.filter(g => g.genre === activeGenre);

    if (sort === 'price_asc') games = [...games].sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') games = [...games].sort((a, b) => b.price - a.price);
    if (sort === 'discount') games = [...games].sort((a, b) => b.discount - a.discount);
    if (sort === 'rating') games = [...games].sort((a, b) => b.rating - a.rating);

    return (
        <div>
            <div className="section-title">
                ИГРЫ <span className="badge">%</span>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                {GENRES.map(g => (
                    <button
                        key={g}
                        className={`currency-btn${activeGenre === g ? ' active' : ''}`}
                        onClick={() => setActiveGenre(g)}
                    >
                        {g}
                    </button>
                ))}
                <select
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    style={{
                        marginLeft: 'auto', background: 'var(--light-gray)', border: 'var(--border)',
                        color: 'var(--white)', borderRadius: 'var(--radius)', padding: '8px 12px',
                        fontFamily: 'var(--font-main)', fontSize: 13, cursor: 'pointer'
                    }}
                >
                    <option value="default">По умолчанию</option>
                    <option value="price_asc">Цена ↑</option>
                    <option value="price_desc">Цена ↓</option>
                    <option value="discount">По скидке</option>
                    <option value="rating">По рейтингу</option>
                </select>
            </div>

            <div className="games-grid">
                {games.map(g => <GameCard key={g.id} game={g} />)}
            </div>

            {games.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--gray)', padding: 40 }}>
                    Игры не найдены
                </div>
            )}
        </div>
    );
}