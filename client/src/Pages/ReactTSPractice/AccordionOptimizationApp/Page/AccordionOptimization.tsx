// src/Pages/AccordionOptimization.tsx
import React from 'react';
import { AccordionContainer } from '../components/AccordionContainer';
import { stopBackgroundCalculations } from '../store/store';
import './AccordionOptimization.css';
import { useNavigate } from 'react-router-dom';

export const AccordionOptimization: React.FC = () => {
  const totalItems = 3000;
  const navigate = useNavigate();

  const handleStopCalculations = () => {
    stopBackgroundCalculations();
    console.log('Вычисления остановлены');
  };

  console.log('AccordionOptimization рендерится');
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Аккордеон с оптимизацией</h1>
      </header>
      <main className="page-content">
        <h2>Всего блоков: {totalItems}</h2>
        <AccordionContainer totalItems={totalItems} />
        <button style={{ marginTop: 20 }} onClick={handleStopCalculations}>
          Остановить вычисления
        </button>
        <button style={{ marginTop: 20, marginLeft: 10 }} onClick={() => navigate('/')}>
          Домой
        </button>
      </main>
    </div>
  );
};