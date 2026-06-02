import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PROMO_CODES } from '../data/db';

function LoginForm({ onSwitch }) {
    const { login, setModal } = useApp();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handle = async () => {
        const ok = await login(email, pass);
        if (ok) setModal(null);
    };

    return (
        <>
            <h2>ВХОД</h2>
            <div className="modal-form">
                <div>
                    <label>Email</label>
                    <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Пароль</label>
                    <input type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)}
                           onKeyDown={e => e.key === 'Enter' && handle()} />
                </div>
                <button className="btn-primary" onClick={handle}>ВОЙТИ</button>
                <div className="modal-switch">
                    Нет аккаунта? <span onClick={onSwitch}>Зарегистрироваться</span>
                </div>
            </div>
        </>
    );
}

function RegisterForm({ onSwitch }) {
    const { register, setModal } = useApp();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

    const handle = async () => {
        if (!email || !username || !pass) return;
        const ok = await register(email, pass, username);
        if (ok) setModal(null);
    };

    return (
        <>
            <h2>РЕГИСТРАЦИЯ</h2>
            <div className="modal-form">
                <div>
                    <label>Имя пользователя</label>
                    <input placeholder="Nickname" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Пароль</label>
                    <input type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} />
                </div>
                <button className="btn-primary" onClick={handle}>СОЗДАТЬ АККАУНТ</button>
                <div className="modal-switch">
                    Есть аккаунт? <span onClick={onSwitch}>Войти</span>
                </div>
            </div>
        </>
    );
}

function GameModal({ game }) {
    const { addPurchase, user, setModal } = useApp();
    const discounted = game.discount
        ? (game.price * (1 - game.discount / 100)).toFixed(2)
        : game.price.toFixed(2);

    const gradStyle = game.color
        ? { background: `linear-gradient(135deg, ${game.color[0]}, ${game.color[1]})` }
        : {};

    const buy = async () => {
        if (!user) { setModal('login'); return; }
        await addPurchase({ title: game.title, price: parseFloat(discounted), type: 'game' });
    };

    return (
        <>
            <h2>{game.title}</h2>
            <div className="game-detail">
                <div className="game-detail-img" style={gradStyle} />
                <p className="game-detail-desc">{game.description}</p>
                <div className="game-detail-meta">
                    <div className="meta-item">
                        <span className="meta-label">Жанр</span>
                        <span className="meta-value">{game.genre}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">Разработчик</span>
                        <span className="meta-value">{game.developer}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">Дата выхода</span>
                        <span className="meta-value">{game.releaseDate}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">Рейтинг</span>
                        <span className="meta-value">⭐ {game.rating}/5</span>
                    </div>
                </div>
                <div className="game-detail-buy">
                    <div className="game-detail-price">
                        {game.discount > 0 && (
                            <span className="price-old">{game.price}$</span>
                        )}
                        <span className="price-new" style={{ fontSize: 22, fontWeight: 700 }}>{discounted}$</span>
                        {game.discount > 0 && (
                            <span style={{ fontSize: 11, color: 'var(--pink)' }}>Скидка {game.discount}%</span>
                        )}
                    </div>
                    <button className="btn-buy" onClick={buy}>КУПИТЬ</button>
                </div>
            </div>
        </>
    );
}

function ServiceModal({ service }) {
    const { addPurchase, user, setModal } = useApp();

    const buy = async () => {
        if (!user) { setModal('login'); return; }
        await addPurchase({ title: service.name, price: service.price, type: 'service' });
    };

    return (
        <>
            <h2>{service.icon} {service.name}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p style={{ fontSize: 13, color: 'var(--gray)', lineHeight: 1.6 }}>{service.description}</p>
                <div className="game-detail-buy">
                    <span className="price-new" style={{ fontSize: 22, fontWeight: 700 }}>{service.price}$</span>
                    <button className="btn-buy" onClick={buy}>КУПИТЬ</button>
                </div>
            </div>
        </>
    );
}

export default function Modal() {
    const { modal, setModal } = useApp();
    const [authMode, setAuthMode] = useState('login');

    if (!modal) return null;

    return (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
            <div className="modal">
                <button className="modal-close" onClick={() => setModal(null)}>×</button>
                {modal === 'login' || modal === 'register' ? (
                    authMode === 'login'
                        ? <LoginForm onSwitch={() => setAuthMode('register')} />
                        : <RegisterForm onSwitch={() => setAuthMode('login')} />
                ) : modal?.type === 'game' ? (
                    <GameModal game={modal.game} />
                ) : modal?.type === 'service' ? (
                    <ServiceModal service={modal.service} />
                ) : null}
            </div>
        </div>
    );
}