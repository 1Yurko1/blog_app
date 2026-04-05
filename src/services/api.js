// Начальные данные (мок)
let posts = [
    { id: 1, title: 'Первый пост', content: 'Добро пожаловать в мой блог! Здесь я делюсь заметками о фронтенде.', author: 'Алекс', date: '2024-03-10' },
    { id: 2, title: 'React vs Vue', content: 'Сравнение подходов к рендерингу и управлению состоянием.', author: 'Мария', date: '2024-03-12' }
];

// Имитация задержки сети
const delay = (ms = 600) => new Promise(res => setTimeout(res, ms));

export const fetchPosts = async () => {
    await delay();
    return [...posts];
};

export const createPost = async (data) => {
    await delay();
    const newPost = { id: Date.now(), ...data, date: new Date().toISOString().split('T')[0] };
    posts = [newPost, ...posts];
    return newPost;
};

export const deletePost = async (id) => {
    await delay();
    posts = posts.filter(p => p.id !== id);
};
