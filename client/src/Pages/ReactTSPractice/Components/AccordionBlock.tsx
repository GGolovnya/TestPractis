// src/components/AccordionBlock.tsx
import React, { useCallback, useEffect } from 'react';
import { useStore } from '../store/store';
import { StatisticsBlock } from './StatisticsBlock';
import './AccordionBlock.css';

// Константа для размера чанка данных
const CHUNK_SIZE = 100;

// Интерфейс пропсов компонента
interface AccordionBlockProps {
  id: number;
}

// Компонент аккордеона, мемоизирован для оптимизации производительности
export const AccordionBlock = React.memo<AccordionBlockProps>(({ id }) => {
  // Получаем состояние и методы из Zustand store
  const { 
    openBlocks,      // Объект открытых блоков
    loadChunk,       // Функция загрузки чанка данных
    getData,         // Функция получения данных для блока
    setBlockOpen     // Функция установки состояния открытия блока
  } = useStore();
  
  const isOpen = openBlocks[id]; // Проверяем, открыт ли текущий блок
  const chunkId = Math.floor(id / CHUNK_SIZE); // Вычисляем ID чанка

  // Загружаем начальные данные при монтировании
  useEffect(() => {
    loadChunk(chunkId);
  }, [chunkId, loadChunk]);

  // Обработчик клика по кнопке открытия/закрытия
  const handleClick = useCallback(() => {
    setBlockOpen(id, !isOpen); // Переключаем состояние открытия
  }, [setBlockOpen, id, isOpen]);

  return (
    <div className="accordion-block">
      <button 
        onClick={handleClick}
        className={`accordion-button ${isOpen ? 'open' : ''}`}
      >
        <span className="accordion-icon">{isOpen ? '▼' : '►'}</span>
        <span className="accordion-title">Блок {id}</span>
      </button>
      
      {isOpen && (
        <div className="accordion-content">
          <React.Suspense fallback={
            <div className="loading-indicator">Загрузка...</div>
          }>
            <StatisticsBlock id={id} data={getData(id)} />
          </React.Suspense>
        </div>
      )}
    </div>
  );
});