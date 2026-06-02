import React from 'react';
import { useApp } from '../context/AppContext';

export default function Sidebar({ page, setPage }) {
    const { user, setModal } = useApp();

    const items = [
        { key: 'home', label: 'ГЛАВНАЯ' },
        { key: 'games', label: 'ИГРЫ' },
        { key: 'services', label: 'СЕРВИСЫ' },
        { key: 'steam', label: 'ПОПОЛНЕНИЕ\nSTEAM', className: 'steam' }
    ];

    if (user) items.splice(3, 0, { key: 'profile', label: 'ПРОФИЛЬ' });

    return (
        <aside className="sidebar">
            {items.map(item => (
                <button
                    key={item.key}
                    className={`nav-item${item.className ? ' ' + item.className : ''}${page === item.key ? ' active' : ''}`}
                    style={{ whiteSpace: 'pre-line' }}
                    onClick={() => setPage(item.key)}
                >
                    {item.label}
                </button>
            ))}
        </aside>
    );
}