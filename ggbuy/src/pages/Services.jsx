import React from 'react';
import { SERVICES_DB, SUBSCRIPTIONS_DB } from '../data/db';
import { useApp } from '../context/AppContext';

export default function Services() {
    const { setModal } = useApp();

    return (
        <div>
            <div className="section-title">СЕРВИСЫ</div>

            <div className="services-grid">
                {SERVICES_DB.map(s => (
                    <div key={s.id} className="service-card" onClick={() => setModal({ type: 'service', service: s })}>
                        <div className="service-card-icon">{s.icon}</div>
                        <div className="service-card-name">{s.name}</div>
                        <div className="service-card-desc">{s.description}</div>
                        <div className="service-card-price">{s.price}$</div>
                    </div>
                ))}
            </div>

            <div className="section-title" style={{ marginTop: 8 }}>ПОДПИСКИ</div>

            <div>
                {SUBSCRIPTIONS_DB.map(sub => (
                    <div key={sub.id} className="sub-card">
                        <div className="sub-card-info">
                            <div className="sub-card-name">{sub.name}</div>
                            <div className="sub-card-duration">{sub.duration}</div>
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                                {sub.features.map((f, i) => (
                                    <span key={i} style={{
                                        fontSize: 11, background: 'rgba(124,58,237,0.2)',
                                        border: '1px solid rgba(124,58,237,0.4)', borderRadius: 4, padding: '2px 8px', color: 'var(--white)'
                                    }}>
                    {f}
                  </span>
                                ))}
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                            <div className="sub-card-price">{sub.price}$</div>
                            <button
                                className="btn-buy"
                                onClick={() => setModal({ type: 'service', service: { ...sub, icon: '🎮', description: sub.features.join(', ') } })}
                            >
                                КУПИТЬ
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}