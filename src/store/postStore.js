import { create } from 'zustand';
import { fetchPosts, createPost, deletePost, updatePost, addComment as apiAddComment} from '../services/api';

export const usePostStore = create((set) => ({
    posts: [],
    status: 'idle',
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
            set((s) => ({ posts: [newPost, ...s.posts], status: 'success' }));
        } catch (err) {
            set({ status: 'error', error: err.message || 'Ошибка создания' });
        }
    },

    updatePost: async (id, data) => {
        set({ status: 'loading', error: null });
        try {
            const updated = await updatePost(id, data);
            set(state => ({
                posts: state.posts.map(p => p.id === Number(id) ? updated : p),
                status: 'success'
            }));
        } catch (err) {
            set({ status: 'error', error: err.message });
        }
    },

    addComment: async (postId, text, author) => {
        try {
            // Сначала вызываем API (сохраняем в localStorage)
            const newComment = await apiAddComment(postId, text, author);

            // Затем обновляем стейт
            set((state) => ({
                posts: state.posts.map((post) => {
                    if (post.id === Number(postId)) {
                        const updatedComments = [...(post.comments || []), newComment];
                        return { ...post, comments: updatedComments };
                    }
                    return post;
                })
            }));
        } catch (err) {
            console.error('Ошибка добавления комментария:', err);
        }
    },

    removePost: async (id) => {
        try {
            await deletePost(id);
            set((s) => ({ posts: s.posts.filter((p) => p.id !== id) }));
        } catch (err) {
            set({ status: 'error', error: err.message || 'Ошибка удаления' });
        }
    }
}));
