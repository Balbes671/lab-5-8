import React, { useState } from 'react';
import { PROMO_CODES } from '../data/db';
import { useApp } from '../context/AppContext';

export default function SteamTopup() {
    const { addPurchase, user, setModal, showAlert } = useApp();
    const [currency, setCurrency] = useState('RUB');
    const [promo, setPromo] = useState('');
    const [promoDiscount, setPromoDiscount] = useState(0);
    const [amount, setAmount] = useState(500);
    const [steamLogin, setSteamLogin] = useState('');
    const [customAmount, setCustomAmount] = useState('');

    const applyPromo = () => {
        const code = promo.trim().toUpperCase();
        if (PROMO_CODES[code]) {
            setPromoDiscount(PROMO_CODES[code]);
            showAlert(`Промокод применён! Скидка ${PROMO_CODES[code]}%`);
        } else {
            showAlert('Неверный промокод', 'error');
        }
    };

    const finalAmount = customAmount ? parseFloat(customAmount) : amount;
    const finalPrice = (finalAmount * (1 - promoDiscount / 100) * 0.012).toFixed(2);

    const handleTopup = async () => {
        if (!user) { setModal('login'); return; }
        if (!steamLogin) { showAlert('Введите логин Steam', 'error'); return; }
        if (!finalAmount || finalAmount <= 0) { showAlert('Укажите сумму', 'error'); return; }
        await addPurchase({
            title: `Пополнение Steam (${steamLogin}) — ${finalAmount} ${currency}`,
            price: parseFloat(finalPrice),
            type: 'steam'
        });
    };

    return (
        <div>
            <div className="section-title">ПОПОЛНЕНИЕ STEAM</div>

            <div className="topup-container">
                <div className="topup-form">
                    <div>
                        <div className="form-section-title">Выбор валюты</div>
                        <div className="currency-buttons" style={{ marginTop: 8 }}>
                            {['RUB', 'BYN', 'KZ'].map(c => (
                                <button key={c} className={`currency-btn${currency === c ? ' active' : ''}`}
                                        onClick={() => setCurrency(c)}>
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="form-section-title">Введите промокод</div>
                        <div className="promo-row" style={{ marginTop: 8 }}>
                            <input className="form-input" placeholder="GGBUY10" value={promo}
                                   onChange={e => setPromo(e.target.value)} />
                            <button className="btn-apply" onClick={applyPromo}>ПРИМЕНИТЬ</button>
                        </div>
                        {promoDiscount > 0 && (
                            <div style={{ fontSize: 12, color: 'var(--green)', marginTop: 6 }}>
                                ✓ Скидка {promoDiscount}% применена
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="form-section-title">Получите {currency}</div>
                        <div className="amount-buttons" style={{ marginTop: 8 }}>
                            {[200, 500, 1000].map(a => (
                                <button key={a} className={`amount-btn${amount === a && !customAmount ? ' active' : ''}`}
                                        onClick={() => { setAmount(a); setCustomAmount(''); }}>
                                    {a}
                                </button>
                            ))}
                        </div>
                        <input
                            className="form-input"
                            style={{ marginTop: 8 }}
                            placeholder={`Своя сумма (${currency})`}
                            value={customAmount}
                            onChange={e => { setCustomAmount(e.target.value); setAmount(0); }}
                            type="number"
                            min="50"
                        />
                    </div>

                    <div>
                        <div className="form-section-title">Логин Steam</div>
                        <input className="form-input" style={{ marginTop: 8 }} placeholder="your_steam_login"
                               value={steamLogin} onChange={e => setSteamLogin(e.target.value)} />
                    </div>

                    <div style={{ borderTop: '1px solid rgba(124,58,237,0.3)', paddingTop: 14 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
                            <span style={{ color: 'var(--gray)' }}>Итого:</span>
                            <span style={{ fontWeight: 700, color: 'var(--green)', fontSize: 18 }}>{finalPrice}$</span>
                        </div>
                        <button className="btn-topup" onClick={handleTopup}>ПОПОЛНИТЬ</button>
                    </div>
                </div>

                <div className="topup-info">
                    <h3>ВАЖНАЯ ИНФОРМАЦИЯ</h3>
                    <ul>
                        <li>Пополнение происходит в течение 5–15 минут после подтверждения платежа.</li>
                        <li>Убедитесь, что логин Steam введён без ошибок — именно он используется для зачисления средств.</li>
                        <li>Промокоды дают скидку на финальную стоимость в долларах, но не на зачисляемую сумму в {currency}.</li>
                        <li>Минимальная сумма пополнения — 50 {currency}.</li>
                        <li>В случае проблем обратитесь в поддержку с ID транзакции.</li>
                        <li>Пополнение возможно только на Steam аккаунты без активных ограничений.</li>
                        <li>Доступные валюты: RUB, BYN, KZT.</li>
                    </ul>

                    <div style={{ marginTop: 20, padding: 14, background: 'rgba(124,58,237,0.1)', borderRadius: 'var(--radius)', border: '1px solid rgba(124,58,237,0.3)' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: 1, marginBottom: 8, color: 'var(--gray)' }}>
                            ПРОМОКОДЫ ДЛЯ ТЕСТИРОВАНИЯ
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {Object.entries(PROMO_CODES).map(([code, disc]) => (
                                <div key={code} style={{ fontSize: 12, display: 'flex', justifyContent: 'space-between' }}>
                                    <code style={{ color: 'var(--pink)', fontFamily: 'monospace' }}>{code}</code>
                                    <span style={{ color: 'var(--gray)' }}>−{disc}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}