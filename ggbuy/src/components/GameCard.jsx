import React from 'react';
import { useApp } from '../context/AppContext';

export default function GameCard({ game }) {
    const { setModal } = useApp();
    const discountedPrice = game.discount
        ? (game.price * (1 - game.discount / 100)).toFixed(2)
        : null;

    const gradStyle = {
        background: game.color
            ? `linear-gradient(135deg, ${game.color[0]}, ${game.color[1]})`
            : 'linear-gradient(135deg, #1a1aff, #7c3aed)'
    };

    return (
        <div className="game-card" onClick={() => setModal({ type: 'game', game })}>
            {game.discount > 0 && (
                <div className="discount-badge">-{game.discount}%</div>
            )}
            <div className="game-card-img" style={gradStyle} />
            <div className="game-card-body">
                <div className="game-card-title">{game.title}</div>
                <div className="game-card-price">
                    {game.discount > 0 ? (
                        <>
                            <span className="price-old">{game.price}$</span>
                            <span className="price-new">{discountedPrice}$</span>
                        </>
                    ) : (
                        <span className="price-new">{game.price}$</span>
                    )}
                </div>
            </div>
        </div>
    );
}