import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePostStore } from '../store/postStore';
import { useNavigate, Link } from 'react-router-dom';
import {useForm} from "react-hook-form";
import {useEffect} from "react";

const postSchema = z.object({
    title: z.string().min(3, 'Минимум 3 символа'),
    content: z.string().min(10, 'Минимум 10 символов'),
    author: z.string().min(2, 'Минимум 2 символа')
});

export default function PostForm({ mode, initialData }) {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: { title: '', content: '', author: '' }
    });

    const { addPost, updatePost } = usePostStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (mode === 'edit' && initialData) {
            reset(initialData);
        }
    }, [initialData, mode, reset]);

    const onSubmit = async (data) => {
        if (mode === 'create') await addPost(data);
        if (mode === 'edit') await updatePost(initialData.id, data);
        navigate('/');
    };

    return (
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
                {isSubmitting ? 'Сохранение...' : mode === 'create' ? 'Опубликовать' : 'Обновить'}
            </button>
        </form>
    );
}
