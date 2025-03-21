// src/components/AccordionContainer.tsx
import React, { useRef, useEffect } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { AccordionBlock } from './AccordionBlock';
import { useStore } from '../store/store';
import './AccordionContainer.css';

// Компонент контейнера для списка аккордеонов
export const AccordionContainer: React.FC = () => {
  const { loadChunk } = useStore(); // Добавляем loadChunk для предварительной загрузки
  const itemCount = 3000; // Общее количество элементов в списке
  const containerRef = useRef<HTMLDivElement>(null); // Реф для основного контейнера

  // Эффект для обработки изменения размера окна и проверки контейнера
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        console.log('Container height:', containerRef.current.clientHeight);
      }
    };

    handleResize(); // Проверяем высоту при монтировании
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Предварительная загрузка первого чанка для теста (опционально)
  useEffect(() => {
    console.log('Preloading chunk 0');
    loadChunk(0); // Загружаем первый чанк, чтобы данные были доступны
  }, [loadChunk]);

  return (
    <div className="accordion-container" ref={containerRef}>
      {/* Virtuoso компонент для виртуализированного списка */}
      <Virtuoso
        className="accordion-list" // Применяем стили к списку
        totalCount={itemCount} // Указываем общее количество элементов
        itemContent={(index) => {
          console.log(`Rendering AccordionBlock ${index}`); // Логируем рендер каждого блока
          return <AccordionBlock id={index} />;
        }}
        style={{ height: '100%' }} // Устанавливаем высоту списка равной контейнеру
      />
    </div>
  );
};