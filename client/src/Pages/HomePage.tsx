// src/Pages/HomePage.tsx
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export function HomePage() {
  const navigate = useNavigate();
  
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Добро пожаловать</h1>
      </header>
      <main className="home-content">
        <section className="welcome-section">
          <p>Добро пожаловать на нашу демонстрационную страницу!</p>
          <p>Здесь вы можете ознакомиться с различными компонентами.</p>
        </section>
        <nav className="navigation-links">
          <button 
            className="nav-button"
            onClick={() => navigate('/accordion')}
          >
            Перейти к аккордеону
          </button>
        </nav>
      </main>
    </div>
  );
}