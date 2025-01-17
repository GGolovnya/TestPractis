// Навигационное меню с роутингом
// Задача: Создать навигацию с использованием React Router

import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className="navigation">
      <Link to="/">Домашняя</Link>
    </nav>
  );
};