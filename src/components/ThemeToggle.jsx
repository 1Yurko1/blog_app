import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-ghost"
            style={{ padding: '8px', fontSize: '1.2rem', border: '1px solid var(--border)' }}
            title="Переключить тему"
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
}
