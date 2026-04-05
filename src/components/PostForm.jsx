import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePostStore } from '../store/postStore';
import { useNavigate, Link } from 'react-router-dom';
import {useForm} from "react-hook-form";

const postSchema = z.object({
    title: z.string().min(3, 'Заголовок: минимум 3 символа'),
    content: z.string().min(10, 'Текст: минимум 10 символов'),
    author: z.string().min(2, 'Укажите имя автора')
});

export default function PostForm() {
    // 2. Инициализация формы
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: { title: '', content: '', author: '' }
});

    const addPost = usePostStore(s => s.addPost);
    const navigate = useNavigate();

    // 3. Обработка отправки
    const onSubmit = async (data) => {
        await addPost(data);   // Данные улетают в стор → API → обновляется список
        navigate('/');         // Перенаправляем на главную
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '1rem', textDecoration: 'none', color: '#007bff' }}>← На главную</Link>
            <h1>✍️ Создание поста</h1>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: 4 }}>Заголовок</label>
                    <input {...register('title')} placeholder="Введите заголовок" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                    {errors.title && <p style={{ color: 'red', margin: '4px 0 0 0', fontSize: '0.9rem' }}>{errors.title.message}</p>}
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: 4 }}>Текст поста</label>
                    <textarea {...register('content')} placeholder="Напишите содержание..." rows="6" style={{ width: '100%', padding: '8px', boxSizing: 'border-box', resize: 'vertical' }} />
                    {errors.content && <p style={{ color: 'red', margin: '4px 0 0 0', fontSize: '0.9rem' }}>{errors.content.message}</p>}
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: 4 }}>Автор</label>
                    <input {...register('author')} placeholder="Ваше имя" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                    {errors.author && <p style={{ color: 'red', margin: '4px 0 0 0', fontSize: '0.9rem' }}>{errors.author.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        padding: '10px 16px',
                        background: isSubmitting ? '#888' : '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    {isSubmitting ? 'Публикация...' : 'Опубликовать'}
                </button>
            </form>
        </div>
    );
}
