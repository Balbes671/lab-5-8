import React from 'react';
import { GAMES_DB, CATEGORIES_DISPLAY } from '../data/db';
import GameCard from '../components/GameCard';
import { useApp } from '../context/AppContext';

function MiniCardRow({ games }) {
    return (
        <div className="category-games-row">
            {games.slice(0, 3).map(g => (
                <div key={g.id} className="mini-card"
                     style={{ background: g.color ? `linear-gradient(135deg, ${g.color[0]}, ${g.color[1]})` : undefined }}>
                </div>
            ))}
            <div className="mini-card-arrow">›</div>
        </div>
    );
}

export default function Home({ setPage }) {
    const { setModal } = useApp();
    const hotGames = GAMES_DB.filter(g => g.discount > 0).slice(0, 6);

    return (
        <div>
            <div className="hero-banner">
                <h1>ХИТ ПРОДАЖ</h1>
                <p>Лучшие игры со скидками до 30%. Пополнение Steam, сервисы и подписки по выгодным ценам.</p>
            </div>

            <div className="section-title">
                ХИТ ПРОДАЖ <span className="badge">%</span>
            </div>

            <div className="games-grid">
                {hotGames.map(g => <GameCard key={g.id} game={g} />)}
            </div>

            <div className="section-title" style={{ marginTop: 8 }}>КАТЕГОРИИ</div>

            <div className="category-grid">
                {CATEGORIES_DISPLAY.map(cat => {
                    const catGames = GAMES_DB.filter(g => cat.genres.includes(g.genre));
                    return (
                        <div key={cat.key} className="category-block">
                            <h3>{cat.key}</h3>
                            <MiniCardRow games={catGames} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}