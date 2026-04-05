const STORAGE_KEY = 'exam-blog-posts';

// 1. Инициализация: читаем из хранилища или берем дефолтные данные
const initialData = [
    { id: 1, title: 'Первый пост', content: 'Добро пожаловать в мой блог! Здесь я делюсь заметками о фронтенде.', author: 'Алекс', date: '2024-03-10' },
    { id: 2, title: 'React vs Vue', content: 'Сравнение подходов к рендерингу и управлению состоянием.', author: 'Мария', date: '2024-03-12' }
];

// Получаем данные
let posts = (() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialData;
})();

// Имитация задержки сети
const delay = (ms = 600) => new Promise(res => setTimeout(res, ms));

// 2. Хелпер для сохранения в LocalStorage
const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

export const fetchPosts = async () => {
    await delay();
    return [...posts]; // Возвращаем копию, чтобы не мутировать случайно
};

export const createPost = async (data) => {
    await delay();
    const newPost = { id: Date.now(), ...data, date: new Date().toISOString().split('T')[0] };
    posts = [newPost, ...posts]; // Добавляем в начало
    saveToStorage(); // Сохраняем
    return newPost;
};

export const updatePost = async (id, data) => {
    await delay();
    const index = posts.findIndex(p => p.id === Number(id));
    if (index === -1) throw new Error('Пост не найден');

    posts[index] = { ...posts[index], ...data };
    saveToStorage(); // Сохраняем
    return posts[index];
};

export const deletePost = async (id) => {
    await delay();
    posts = posts.filter(p => p.id !== Number(id));
    saveToStorage(); // Сохраняем
};
