import React from 'react';
import { useApp } from '../context/AppContext';

export default function Profile() {
    const { user, logout } = useApp();
    if (!user) return null;

    const purchases = user.purchases || [];
    const totalSpent = purchases.reduce((s, p) => s + (p.price || 0), 0).toFixed(2);

    return (
        <div>
            <div className="section-title">ПРОФИЛЬ</div>

            <div className="profile-card">
                <div className="avatar">{user.username?.[0]?.toUpperCase() || '?'}</div>
                <div className="profile-info">
                    <div className="profile-name">{user.username}</div>
                    <div className="profile-email">{user.email}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray)', marginTop: 2 }}>
                        Зарегистрирован: {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                    </div>
                </div>
                <div className="profile-balance">
                    <div className="balance-label">Потрачено</div>
                    <div className="balance-value">{totalSpent}$</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
                {[
                    { label: 'Покупок', value: purchases.length },
                    { label: 'Игр', value: purchases.filter(p => p.type === 'game').length },
                    { label: 'Сервисов', value: purchases.filter(p => p.type !== 'game').length }
                ].map(stat => (
                    <div key={stat.label} style={{
                        background: 'var(--card-bg)', border: 'var(--border)', borderRadius: 'var(--radius)',
                        padding: '16px', textAlign: 'center'
                    }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 900, color: 'var(--pink)' }}>
                            {stat.value}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: 1, marginTop: 4 }}>
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            <div className="section-title" style={{ fontSize: 16 }}>ИСТОРИЯ ПОКУПОК</div>

            {purchases.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--gray)', padding: 40 }}>
                    История покупок пуста
                </div>
            ) : (
                <div style={{ background: 'var(--card-bg)', border: 'var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                    <table className="purchases-table">
                        <thead>
                        <tr>
                            <th>Наименование</th>
                            <th>Тип</th>
                            <th>Цена</th>
                            <th>Дата</th>
                            <th>Статус</th>
                        </tr>
                        </thead>
                        <tbody>
                        {[...purchases].reverse().map(p => (
                            <tr key={p.id}>
                                <td>{p.title}</td>
                                <td style={{ color: 'var(--gray)', textTransform: 'capitalize' }}>{p.type}</td>
                                <td style={{ color: 'var(--green)', fontWeight: 700 }}>{p.price}$</td>
                                <td style={{ color: 'var(--gray)', fontSize: 12 }}>
                                    {new Date(p.date).toLocaleString('ru-RU')}
                                </td>
                                <td>
                    <span className={`status-badge ${p.status}`}>
                      {p.status === 'done' ? 'Выполнено' : 'В обработке'}
                    </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            <button
                className="btn-login"
                style={{ marginTop: 20, display: 'block' }}
                onClick={logout}
            >
                ВЫЙТИ ИЗ АККАУНТА
            </button>
        </div>
    );
}