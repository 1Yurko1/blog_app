const STORAGE_KEY = 'exam-blog-posts';

// 1. Инициализация: читаем из хранилища или берем дефолтные данные
const initialData = [
    { id: 1, title: 'Первый пост', content: 'Добро пожаловать в мой блог! Здесь я делюсь заметками о фронтенде.', author: 'Алекс', date: '2024-03-10', comments: [] },
    { id: 2, title: 'React vs Vue', content: 'Сравнение подходов к рендерингу и управлению состоянием.', author: 'Мария', date: '2024-03-12', comments: [] }
];

// Получаем данные
let posts = (() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialData;

    const parsed = JSON.parse(saved);
    return parsed.map(post => ({
        ...post,
        comments: Array.isArray(post.comments) ? post.comments : []
    }));
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
    const newPost = { id: Date.now(), ...data, date: new Date().toISOString().split('T')[0], comments: [] };
    posts = [newPost, ...posts]; // Добавляем в начало
    saveToStorage(); // Сохраняем
    return newPost;
};

export const addComment = async (postId, text, author) => {
    await delay();

    const index = posts.findIndex(p => p.id === Number(postId));
    if (index === -1) throw new Error('Post not found');

    const post = posts[index];

    const currentComments = Array.isArray(post.comments) ? post.comments : [];

    const newComment = {
        id: Date.now(),
        text,
        author,
        date: new Date().toLocaleString()
    };
    posts[index] = {
        ...post,
        comments: [...currentComments, newComment]
    };

    saveToStorage();
    return newComment;
}

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
