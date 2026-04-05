import { useParams } from 'react-router-dom';
import { usePostStore } from '../store/postStore';
import { useEffect } from 'react';

export default function PostPage() {
    const { id } = useParams();
    const { posts, status, loadPosts } = usePostStore();
    const post = posts.find(p => p.id === Number(id));

    useEffect(() => { loadPosts(); }, [loadPosts]);

    if (status === 'loading') return <div className="state-msg">⏳ Загрузка...</div>;
    if (!post) return (
        <div className="card state-msg">
            <h2>🔍 Пост не найден</h2>
            <p>Возможно, он был удалён или URL неверный.</p>
        </div>
    );

    return (
        <div className="card">
            <p className="meta">{post.author} • {post.date}</p>
            <h1>{post.title}</h1>
            <div style={{ marginTop: '2rem', fontSize: '1.1rem', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                {post.content}
            </div>
        </div>
    );
}
