export const GAMES_DB = [
    {
        id: 1,
        title: "Crimson Desert",
        genre: "RPG",
        price: 59.99,
        discount: 20,
        description: "Масштабная RPG в открытом мире с захватывающей историей и динамичными сражениями.",
        developer: "Pearl Abyss",
        releaseDate: "2024-03-15",
        rating: 4.5,
        img: null,
        color: ["#8b0000","#3a0050"]
    },
    {
        id: 2,
        title: "Slay the Spire 2",
        genre: "Roguelike",
        price: 24.99,
        discount: 0,
        description: "Создайте уникальную колоду, встречайте странных существ и находите реликвии.",
        developer: "MegaCrit",
        releaseDate: "2024-08-20",
        rating: 4.8,
        img: null,
        color: ["#0a3a00","#1a5a10"]
    },
    {
        id: 3,
        title: "Resident Evil 9",
        genre: "Survival Horror",
        price: 69.99,
        discount: 15,
        description: "Новая глава культовой серии survival horror с новым главным героем и пугающим миром.",
        developer: "Capcom",
        releaseDate: "2024-11-01",
        rating: 4.6,
        img: null,
        color: ["#1a0000","#3a1000"]
    },
    {
        id: 4,
        title: "Cyberpunk 2077: Phantom Liberty 2",
        genre: "RPG",
        price: 39.99,
        discount: 30,
        description: "Второе крупное дополнение к Cyberpunk 2077. Ночной город манит снова.",
        developer: "CD Projekt RED",
        releaseDate: "2024-09-05",
        rating: 4.7,
        img: null,
        color: ["#001a3a","#003a6a"]
    },
    {
        id: 5,
        title: "Hollow Knight: Silksong",
        genre: "Metroidvania",
        price: 19.99,
        discount: 0,
        description: "Исследуйте огромный мир, сражайтесь с боссами и раскрывайте тайны нового королевства.",
        developer: "Team Cherry",
        releaseDate: "2024-06-12",
        rating: 4.9,
        img: null,
        color: ["#001a2a","#0a2a4a"]
    },
    {
        id: 6,
        title: "Elden Ring: Shadow",
        genre: "Action RPG",
        price: 49.99,
        discount: 10,
        description: "Дополнение к шедевру FromSoftware. Новые земли, боссы и оружие ждут вас.",
        developer: "FromSoftware",
        releaseDate: "2024-06-21",
        rating: 4.8,
        img: null,
        color: ["#1a1000","#3a2500"]
    },
    {
        id: 7,
        title: "Hades II",
        genre: "Roguelike",
        price: 29.99,
        discount: 0,
        description: "Продолжение великолепного рогалика от Supergiant Games. Новый герой, новый Олимп.",
        developer: "Supergiant",
        releaseDate: "2024-05-06",
        rating: 4.9,
        img: null,
        color: ["#2a001a","#5a0030"]
    },
    {
        id: 8,
        title: "Black Myth: Wukong",
        genre: "Action RPG",
        price: 59.99,
        discount: 25,
        description: "Эпическое action-RPG по мотивам китайского мифологического романа.",
        developer: "Game Science",
        releaseDate: "2024-08-20",
        rating: 4.7,
        img: null,
        color: ["#001a00","#003a10"]
    }
];

export const GENRES = ["Все", "RPG", "Roguelike", "Survival Horror", "Metroidvania", "Action RPG"];

export const SERVICES_DB = [
    {
        id: 1,
        name: "Смена региона Steam",
        description: "Смена региона аккаунта Steam на нужный",
        price: 4.99,
        icon: "🌍",
        category: "steam"
    },
    {
        id: 2,
        name: "Активация ключа",
        description: "Активация игрового ключа на аккаунт",
        price: 1.99,
        icon: "🔑",
        category: "steam"
    },
    {
        id: 3,
        name: "Буст уровня Steam",
        description: "Повышение уровня профиля Steam",
        price: 9.99,
        icon: "⬆️",
        category: "steam"
    },
    {
        id: 4,
        name: "Оформление профиля",
        description: "Красивое оформление вашего Steam профиля",
        price: 7.99,
        icon: "🎨",
        category: "steam"
    },
    {
        id: 5,
        name: "Разблокировка игр",
        description: "Добавление игр в библиотеку аккаунта",
        price: 14.99,
        icon: "🎮",
        category: "games"
    },
    {
        id: 6,
        name: "VPN Premium",
        description: "Месяц доступа к VPN сервису",
        price: 3.99,
        icon: "🔐",
        category: "other"
    }
];

export const SUBSCRIPTIONS_DB = [
    {
        id: 1,
        name: "PlayStation Plus Essential",
        duration: "1 месяц",
        price: 5.99,
        features: ["2 игры в месяц", "Онлайн мультиплеер"]
    },
    {
        id: 2,
        name: "PlayStation Plus Extra",
        duration: "1 месяц",
        price: 9.99,
        features: ["400+ игр в каталоге", "Онлайн мультиплеер", "Облачное сохранение"]
    },
    {
        id: 3,
        name: "Xbox Game Pass Ultimate",
        duration: "1 месяц",
        price: 6.99,
        features: ["300+ игр", "Xbox Live Gold", "EA Play включён"]
    },
    {
        id: 4,
        name: "EA Play Pro",
        duration: "1 месяц",
        price: 4.99,
        features: ["Все игры EA", "Ранний доступ к новинкам"]
    },
    {
        id: 5,
        name: "Ubisoft+",
        duration: "1 месяц",
        price: 5.99,
        features: ["100+ игр Ubisoft", "Новые выпуски в день релиза"]
    }
];

export const PROMO_CODES = {
    "GGBUY10": 10,
    "NEWUSER": 15,
    "SALE20": 20
};

export const CATEGORIES_DISPLAY = [
    { key: "ШУТЕРЫ", genres: ["Action RPG"] },
    { key: "RPG", genres: ["RPG", "Action RPG"] },
    { key: "СИМУЛЯТОРЫ", genres: ["Metroidvania", "Roguelike"] },
    { key: "ДРУГОЕ", genres: ["Survival Horror"] }
];