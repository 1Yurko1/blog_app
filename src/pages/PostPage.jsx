import { useParams, Link } from 'react-router-dom';
import { usePostStore } from '../store/postStore';
import { useEffect, useState } from 'react';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

export default function PostPage() {
    const { id } = useParams();
    const { posts, loadPosts, addComment } = usePostStore();
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);

    const post = posts.find(p => p.id === Number(id));

    useEffect(() => { loadPosts(); }, [loadPosts]);

    if (!post) return <div className="state-msg">⏳ Загрузка...</div>;

    const handleCommentSubmit = async (text, author) => {
        setIsSubmittingComment(true);
        await addComment(post.id, text, author);
        setIsSubmittingComment(false);
    };

    return (
        <div className="card">
            <Link to="/" className="btn btn-ghost" style={{ marginBottom: '1rem', display: 'inline-block' }}>← Назад к списку</Link>

            <p className="meta">{post.author} • {post.date}</p>
            <h1 style={{ marginBottom: '1.5rem' }}>{post.title}</h1>

            <div style={{ fontSize: '1.1rem', lineHeight: '1.7', whiteSpace: 'pre-wrap', marginBottom: '2rem' }}>
                {post.content}
            </div>

            {/* ✅ Секция комментариев */}
            <CommentList comments={post.comments} />
            <CommentForm onSubmit={handleCommentSubmit} isSubmitting={isSubmittingComment} />
        </div>
    );
}
