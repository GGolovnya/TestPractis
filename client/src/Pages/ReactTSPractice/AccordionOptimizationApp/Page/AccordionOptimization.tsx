// src/Pages/AccordionOptimization.tsx
import React from 'react';
import { AccordionContainer } from '../components/AccordionContainer';
import './AccordionOptimization.css';
import { useNavigate } from 'react-router-dom';

export const AccordionOptimization: React.FC = () => {
  const totalItems = 3000; // Определяем здесь количество элементов

  const navigate = useNavigate()
  console.log('AccordionOptimization рендерится');
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Аккордеон с оптимизацией</h1>
      </header>
      <main className="page-content">
        <h2> Всего блоков: {totalItems} </h2>
        <AccordionContainer totalItems={totalItems} />
      </main>
      <button 
        style={{marginTop: 20}}
        onClick={() => navigate('/')}>
        Домой
      </button>
    </div>
  );
};