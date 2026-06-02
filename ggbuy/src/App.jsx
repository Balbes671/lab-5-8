import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Home from './pages/Home';
import Games from './pages/Games';
import Services from './pages/Services';
import SteamTopup from './pages/SteamTopup';
import Profile from './pages/Profile';

function AlertBanner() {
    const { alert } = useApp();
    if (!alert) return null;
    return <div className={`alert${alert.type === 'error' ? ' error' : ''}`}>{alert.msg}</div>;
}

function AppInner() {
    const [page, setPage] = useState('home');
    const { user } = useApp();

    const pages = {
        home: <Home setPage={setPage} />,
        games: <Games />,
        services: <Services />,
        steam: <SteamTopup />,
        profile: user ? <Profile /> : <Home setPage={setPage} />
    };

    return (
        <div className="layout">
            <Header />
            <Sidebar page={page} setPage={setPage} />
            <main className="main">{pages[page] || pages.home}</main>
            <Footer />
            <Modal />
            <AlertBanner />
        </div>
    );
}

export default function App() {
    return (
        <AppProvider>
            <AppInner />
        </AppProvider>
    );
}