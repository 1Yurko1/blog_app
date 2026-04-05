import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePostStore } from '../store/postStore';
import { useNavigate } from 'react-router-dom';

const postSchema = z.object({
    title: z.string().min(3, 'Минимум 3 символа'),
    content: z.string().min(10, 'Минимум 10 символов'),
    author: z.string().min(2, 'Минимум 2 символа')
});

export default function CreatePostPage() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(postSchema) });
    const addPost = usePostStore(s => s.addPost);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        await addPost(data);
        navigate('/');
    };

    return (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>✨ Новый пост</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label className="form-label">Заголовок</label>
                    <input className="form-input" {...register('title')} placeholder="О чём напишем?" />
                    {errors.title && <p className="form-error">{errors.title.message}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">Текст</label>
                    <textarea className="form-input" rows={6} {...register('content')} placeholder="Подробности..." />
                    {errors.content && <p className="form-error">{errors.content.message}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">Автор</label>
                    <input className="form-input" {...register('author')} placeholder="Ваше имя" />
                    {errors.author && <p className="form-error">{errors.author.message}</p>}
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%' }}>
                    {isSubmitting ? 'Сохранение...' : 'Опубликовать'}
                </button>
            </form>
        </div>
    );
}
