import React, { createContext, useContext, useState, useCallback } from 'react';
import { createUserBin, getUserData, updateUserData, saveBinIndex, getBinIdByEmail } from '../utils/jsonbin';

const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const s = localStorage.getItem('ggbuy_user');
            return s ? JSON.parse(s) : null;
        } catch { return null; }
    });
    const [binId, setBinId] = useState(() => localStorage.getItem('ggbuy_binid') || null);
    const [alert, setAlert] = useState(null);
    const [modal, setModal] = useState(null); // 'login' | 'register' | null | {type:'game', game}

    const showAlert = useCallback((msg, type = 'success') => {
        setAlert({ msg, type });
        setTimeout(() => setAlert(null), 3000);
    }, []);

    const register = useCallback(async (email, password, username) => {
        const existingBin = getBinIdByEmail(email);
        if (existingBin) {
            showAlert('Пользователь уже существует', 'error');
            return false;
        }
        const userData = {
            email,
            password, // в реальном проекте хешировать
            username,
            balance: 0,
            purchases: [],
            createdAt: new Date().toISOString()
        };
        const id = await createUserBin(userData);
        if (!id) {
            // Фолбэк на localStorage если API недоступен
            saveBinIndex(email, 'local_' + email);
            localStorage.setItem('ggbuy_data_' + email, JSON.stringify(userData));
            localStorage.setItem('ggbuy_user', JSON.stringify(userData));
            localStorage.setItem('ggbuy_binid', 'local_' + email);
            setUser(userData);
            setBinId('local_' + email);
            showAlert('Регистрация успешна!');
            return true;
        }
        saveBinIndex(email, id);
        localStorage.setItem('ggbuy_user', JSON.stringify(userData));
        localStorage.setItem('ggbuy_binid', id);
        setUser(userData);
        setBinId(id);
        showAlert('Регистрация успешна!');
        return true;
    }, [showAlert]);

    const login = useCallback(async (email, password) => {
        const id = getBinIdByEmail(email);
        if (!id) { showAlert('Пользователь не найден', 'error'); return false; }

        let userData;
        if (id.startsWith('local_')) {
            userData = JSON.parse(localStorage.getItem('ggbuy_data_' + email) || 'null');
        } else {
            userData = await getUserData(id);
        }

        if (!userData || userData.password !== password) {
            showAlert('Неверный пароль', 'error');
            return false;
        }

        localStorage.setItem('ggbuy_user', JSON.stringify(userData));
        localStorage.setItem('ggbuy_binid', id);
        setUser(userData);
        setBinId(id);
        showAlert('Добро пожаловать, ' + userData.username + '!');
        return true;
    }, [showAlert]);

    const logout = useCallback(() => {
        localStorage.removeItem('ggbuy_user');
        localStorage.removeItem('ggbuy_binid');
        setUser(null);
        setBinId(null);
        showAlert('Вы вышли из аккаунта');
    }, [showAlert]);

    const addPurchase = useCallback(async (item) => {
        if (!user) { showAlert('Войдите в аккаунт', 'error'); return false; }
        const purchase = { ...item, date: new Date().toISOString(), status: 'done', id: Date.now() };
        const updated = { ...user, purchases: [...(user.purchases || []), purchase] };

        if (binId && !binId.startsWith('local_')) {
            await updateUserData(binId, updated);
        } else {
            localStorage.setItem('ggbuy_data_' + user.email, JSON.stringify(updated));
        }
        localStorage.setItem('ggbuy_user', JSON.stringify(updated));
        setUser(updated);
        showAlert('Покупка совершена!');
        return true;
    }, [user, binId, showAlert]);

    return (
        <AppContext.Provider value={{ user, login, logout, register, alert, showAlert, modal, setModal, addPurchase }}>
            {children}
        </AppContext.Provider>
    );
}

export const useApp = () => useContext(AppContext);