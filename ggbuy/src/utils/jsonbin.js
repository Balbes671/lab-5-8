// Замените YOUR_MASTER_KEY и YOUR_BIN_ID на ваши данные с jsonbin.io
const MASTER_KEY = '$2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const BASE_URL = 'https://api.jsonbin.io/v3';

// Создаёт новый bin для пользователя и возвращает bin_id
export async function createUserBin(userData) {
    try {
        const res = await fetch(`${BASE_URL}/b`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': MASTER_KEY,
                'X-Bin-Name': `user_${userData.email}`,
                'X-Bin-Private': 'true'
            },
            body: JSON.stringify(userData)
        });
        const data = await res.json();
        return data.metadata?.id || null;
    } catch (e) {
        console.error('createUserBin:', e);
        return null;
    }
}

// Читает данные пользователя по bin_id
export async function getUserData(binId) {
    try {
        const res = await fetch(`${BASE_URL}/b/${binId}/latest`, {
            headers: { 'X-Master-Key': MASTER_KEY }
        });
        const data = await res.json();
        return data.record || null;
    } catch (e) {
        console.error('getUserData:', e);
        return null;
    }
}

// Обновляет данные пользователя
export async function updateUserData(binId, userData) {
    try {
        const res = await fetch(`${BASE_URL}/b/${binId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': MASTER_KEY
            },
            body: JSON.stringify(userData)
        });
        const data = await res.json();
        return data.record || null;
    } catch (e) {
        console.error('updateUserData:', e);
        return null;
    }
}

// Простой поиск пользователя по email через список bins
export async function findUserByEmail(email) {
    try {
        const res = await fetch(`${BASE_URL}/b?name=user_${email}`, {
            headers: { 'X-Master-Key': MASTER_KEY }
        });
        // jsonbin не поддерживает поиск по name в free tier,
        // поэтому используем localStorage как индекс
        return null;
    } catch (e) {
        return null;
    }
}

// Локальное хранилище как индекс email -> binId
export function saveBinIndex(email, binId) {
    const idx = JSON.parse(localStorage.getItem('ggbuy_idx') || '{}');
    idx[email] = binId;
    localStorage.setItem('ggbuy_idx', JSON.stringify(idx));
}

export function getBinIdByEmail(email) {
    const idx = JSON.parse(localStorage.getItem('ggbuy_idx') || '{}');
    return idx[email] || null;
}