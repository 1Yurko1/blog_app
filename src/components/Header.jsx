import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <header className="header">
            <div className="container header-inner">
                <Link to="/" className="logo">📝 DevBlog</Link>
                <nav>
                    {isHome ? (
                        <Link to="/create" className="btn btn-primary">Написать пост</Link>
                    ) : (
                        <Link to="/" className="btn btn-ghost">← К списку</Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
