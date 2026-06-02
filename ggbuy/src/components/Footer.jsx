import React from 'react';
import { useApp } from '../context/AppContext';

export default function Footer() {
    const { showAlert } = useApp();
    return (
        <footer className="footer">
            <span className="footer-copy">© GGBUY COPYRIGHT 2077</span>
            <button className="btn-advert" onClick={() => showAlert('Для рекламы пишите: ads@ggbuy.ru')}>
                КУПИТЬ РЕКЛАМУ
            </button>
        </footer>
    );
}