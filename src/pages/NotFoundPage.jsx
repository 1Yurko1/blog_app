import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div className="card state-msg">
            <h1>404</h1>
            <p>Страница, которую вы ищете, не существует.</p>
            <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>На главную</Link>
        </div>
    );
}
