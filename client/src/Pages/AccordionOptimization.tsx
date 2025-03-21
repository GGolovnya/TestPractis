// src/Pages/AccordionOptimization.tsx
import React from 'react';
import { AccordionContainer } from './ReactTSPractice/components/AccordionContainer';
import './AccordionOptimization.css';

export const AccordionOptimization: React.FC = () => {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Аккордеон с оптимизацией</h1>
      </header>
      <main className="page-content">
        <AccordionContainer />
      </main>
    </div>
  );
};