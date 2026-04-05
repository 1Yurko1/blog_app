export default function CommentList({ comments }) {
    // Гарантируем, что comments - это массив
    const commentsArray = Array.isArray(comments) ? comments : [];

    if (commentsArray.length === 0) {
        return <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Пока нет комментариев</p>;
    }

    return (
        <div style={{ marginTop: '1.5rem' }}>
            <h4>Комментарии ({commentsArray.length})</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                {commentsArray.map(c => (
                    <div
                        key={c.id}
                        style={{
                            background: 'var(--bg-page)',
                            padding: '1rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <strong style={{ color: 'var(--primary)' }}>{c.author}</strong>
                            <small style={{ color: 'var(--text-muted)' }}>{c.date}</small>
                        </div>
                        <p style={{ margin: 0, color: 'var(--text-main)' }}>
                            {c.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
