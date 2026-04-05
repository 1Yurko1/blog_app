import { useState, useEffect } from 'react';
import { usePostStore } from '../store/postStore';
import { useDebounce } from '../hooks/useDebounce';

export default function HomePage() {
    const { posts, status, error, loadPosts, removePost } = usePostStore();
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);

    useEffect(() => { loadPosts(); }, [loadPosts]);

    // Фильтрация на клиенте
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    if (status === 'loading') return <div className="state-msg">⏳ Загрузка постов...</div>;
    if (status === 'error') return <div className="state-msg" style={{color: 'var(--danger)'}}>❌ Ошибка: {error}</div>;

    return (
        <div>
            {/* Поиск */}
            <div style={{ marginBottom: '1.5rem' }}>
                <input
                    className="form-input"
                    type="text"
                    placeholder="🔍 Поиск по заголовку..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {filteredPosts.length === 0 ? (
                <div className="card state-msg">
                    <h2>{debouncedSearch ? '🔍 Ничего не найдено' : '📭 Пока нет постов'}</h2>
                    <p>{debouncedSearch ? 'Попробуйте изменить запрос' : 'Станьте первым автором!'}</p>
                </div>
            ) : (
                filteredPosts.map(post => (
                    <article key={post.id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <a href={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
                                <h3>{post.title}</h3>
                            </a>
                            <button
                                className="btn btn-danger"
                                style={{ padding: '4px 10px', fontSize: '0.85rem', marginLeft: '1rem' }}
                                onClick={() => removePost(post.id)}
                            >
                                🗑 Удалить
                            </button>
                        </div>
                        <p className="meta">{post.author} • {post.date}</p>
                        <p>{post.content.slice(0, 150)}...</p>
                    </article>
                ))
            )}
        </div>
    );
}
