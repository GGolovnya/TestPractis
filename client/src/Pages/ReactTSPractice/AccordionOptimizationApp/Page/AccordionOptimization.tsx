import React, { useState, useEffect } from 'react';
import { AccordionContainer } from '../components/AccordionContainer';
import { stopBackgroundCalculations, useStore } from '../store/store';
import './AccordionOptimization.css';
import { useNavigate } from 'react-router-dom';

export const AccordionOptimization: React.FC = () => {
  const totalItems = 3000;
  const navigate = useNavigate();
  const [memoryStats, setMemoryStats] = useState({
    usedJSHeapSize: 0,
    totalJSHeapSize: 0,
    jsHeapSizeLimit: 0
  });
  const [maxWorkers, setMaxWorkers] = useState(4); // Динамическое изменение MAX_WORKERS

  // Прогресс бар
  const { results } = useStore();
  const calculatedCount = Object.keys(results).length;
  const progress = (calculatedCount / totalItems) * 100;

  const [debugMode, setDebugMode] = useState(false);

  // Мониторинг памяти
  useEffect(() => {
    const updateMemoryStats = () => {
      if ('memory' in performance) {
        const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit } = performance.memory;
        setMemoryStats({ usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit });
      }
    };
    const interval = setInterval(updateMemoryStats, 1000); // Обновляем каждую секунду
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log = debugMode ? console.log.bind(console) : () => {};
  }, [debugMode]);

  const handleStopCalculations = () => {
    stopBackgroundCalculations();
    console.log('Вычисления остановлены');
  };

  const handleMaxWorkersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(1, Math.min(8, parseInt(e.target.value) || 4)); // Ограничим от 1 до 8
    setMaxWorkers(newValue);
    // Здесь можно обновить MAX_WORKERS в workerQueue, но для простоты перезапустим вычисления
    stopBackgroundCalculations();
  };

  console.log('AccordionOptimization рендерится');
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Аккордеон с оптимизацией</h1>
      </header>
      <main className="page-content">
        <h2>Всего блоков: {totalItems}</h2>
        <div style={{ marginBottom: 20 }}>
          <h3>Мониторинг производительности</h3>
          <p>Используемая память: {(memoryStats.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB</p>
          <p>Общий размер кучи: {(memoryStats.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB</p>
          <p>Лимит памяти: {(memoryStats.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB</p>
          <label>
            Макс. воркеров (1-8):
            <input
              type="number"
              value={maxWorkers}
              min={1}
              max={8}
              onChange={handleMaxWorkersChange}
              style={{ marginLeft: 10, width: 50 }}
            />
          </label>
          <label>
    Режим отладки:
    <input type="checkbox" checked={debugMode} onChange={(e) => setDebugMode(e.target.checked)} />
  </label>
          <div style={{ marginBottom: 20 }}>
    <h3>Прогресс вычислений</h3>
    <progress value={calculatedCount} max={totalItems} style={{ width: '100%' }} />
    <p>{calculatedCount} из {totalItems} ({progress.toFixed(1)}%)</p>
  </div>
        </div>
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