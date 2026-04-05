import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePostStore } from '../store/postStore';
import { useEffect } from 'react';

const postSchema = z.object({
    title: z.string().min(3, 'Минимум 3 символа'),
    content: z.string().min(10, 'Минимум 10 символов'),
    author: z.string().min(2, 'Минимум 2 символа')
});

export default function EditPostPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { posts, loadPosts, updatePost } = usePostStore();
    const post = posts.find(p => p.id === Number(id));

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: zodResolver(postSchema)
    });

    // Загружаем посты, если переход по прямой ссылке
    useEffect(() => {
        if (posts.length === 0) loadPosts();
    }, [posts.length, loadPosts]);

    // Заполняем форму данными поста
    useEffect(() => {
        if (post) reset({ title: post.title, content: post.content, author: post.author });
    }, [post, reset]);

    if (!post) return <div className="state-msg">⏳ Загрузка данных...</div>;

    const onSubmit = async (data) => {
        await updatePost(post.id, data);
        navigate(`/post/${post.id}`);
    };

    return (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>✏️ Редактирование</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label className="form-label">Заголовок</label>
                    <input className="form-input" {...register('title')} />
                    {errors.title && <p className="form-error">{errors.title.message}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">Текст</label>
                    <textarea className="form-input" rows={6} {...register('content')} />
                    {errors.content && <p className="form-error">{errors.content.message}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">Автор</label>
                    <input className="form-input" {...register('author')} />
                    {errors.author && <p className="form-error">{errors.author.message}</p>}
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%' }}>
                    {isSubmitting ? 'Сохранение...' : 'Обновить пост'}
                </button>
            </form>
        </div>
    );
}
