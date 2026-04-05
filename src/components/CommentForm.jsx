import { useState } from 'react';

export default function CommentForm({ onSubmit, isSubmitting }) {
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim() || !author.trim()) return;
        onSubmit(text, author);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            <h4>Оставить комментарий</h4>
            <div className="form-group">
                <input className="form-input" placeholder="Ваше имя" value={author} onChange={e => setAuthor(e.target.value)} required />
            </div>
            <div className="form-group">
                <textarea className="form-input" rows={3} placeholder="Текст комментария..." value={text} onChange={e => setText(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Отправка...' : 'Отправить'}
            </button>
        </form>
    );
}
