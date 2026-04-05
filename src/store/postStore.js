import { create } from 'zustand';
import { fetchPosts, createPost, deletePost } from '../services/api';

export const usePostStore = create((set) => ({
    posts: [],
    status: 'idle', // idle | loading | success | error
    error: null,

    loadPosts: async () => {
        set({ status: 'loading', error: null });
        try {
            const data = await fetchPosts();
            set({ posts: data, status: 'success' });
        } catch (err) {
            set({ status: 'error', error: err.message || 'Не удалось загрузить посты' });
        }
    },

    addPost: async (data) => {
        set({ status: 'loading', error: null });
        try {
            const newPost = await createPost(data);
            set((state) => ({ posts: [newPost, ...state.posts], status: 'success' }));
        } catch (err) {
            set({ status: 'error', error: err.message || 'Ошибка создания поста' });
        }
    },

    removePost: async (id) => {
        set({ status: 'loading', error: null });
        try {
            await deletePost(id);
            set((state) => ({ posts: state.posts.filter((p) => p.id !== id), status: 'success' }));
        } catch (err) {
            set({ status: 'error', error: err.message || 'Ошибка удаления' });
        }
    }
}));
