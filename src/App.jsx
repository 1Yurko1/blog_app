import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CreatePostPage from './pages/CreatePostPage';
import PostPage from './pages/PostPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <main className="container">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create" element={<CreatePostPage />} />
                    <Route path="/post/:id" element={<PostPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}
