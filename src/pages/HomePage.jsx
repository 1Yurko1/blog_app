import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePostStore } from '../store/postStore';

export default function HomePage() {
    const { posts, status, error, loadPosts, removePost } = usePostStore();

    useEffect(() => { loadPosts(); }, [loadPosts]);

    if (status === 'loading') return <div className="state-msg">⏳ Загрузка постов...</div>;
    if (status === 'error') return <div className="state-msg" style={{color: 'var(--danger)'}}>❌ Ошибка: {error}</div>;

    return (
        <div>
            {posts.length === 0 ? (
                <div className="card state-msg">
                    <h2>Пока нет постов</h2>
                    <p>Станьте первым автором!</p>
                </div>
            ) : (
                posts.map(post => (
                    <article key={post.id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <h3>{post.title}</h3>
                            </Link>
                            <button className="btn btn-danger" style={{ padding: '4px 8px', fontSize: '0.8rem' }} onClick={() => removePost(post.id)}>
                                🗑
                            </button>
                        </div>
                        <p className="meta">{post.author} • {post.date}</p>
                        <p>{post.content.slice(0, 150)}...</p>
                        <Link to={`/post/${post.id}`} className="btn btn-ghost" style={{ padding: '0 0', fontSize: '0.9rem' }}>Читать далее →</Link>
                    </article>
                ))
            )}
        </div>
    );
}
