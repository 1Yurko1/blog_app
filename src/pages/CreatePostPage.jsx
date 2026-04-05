import PostForm from '../components/PostForm';

export default function CreatePostPage() {
    return (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>✨ Новый пост</h2>
            <PostForm mode="create" />
        </div>
    );
}
