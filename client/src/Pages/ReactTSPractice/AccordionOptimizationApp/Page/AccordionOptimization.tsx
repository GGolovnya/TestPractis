// src/Pages/AccordionOptimization.tsx
import React, { useState, useEffect } from 'react';
import { AccordionContainer } from '../components/AccordionContainer';
import { useStore } from '../store/store';
import './AccordionOptimization.css';
import { useNavigate } from 'react-router-dom';

export const AccordionOptimization: React.FC = () => {
  const navigate = useNavigate();
  const [totalItems, setTotalItems] = useState<number>(() => {
    const savedItems = localStorage.getItem('totalItems');
    return savedItems ? parseInt(savedItems, 10) : 200;
  }); // управляет значением в <totalItems>
  const [inputValue, setInputValue] = useState<string>('') // управляет значением в <input></input>
  const [error, setError] = useState<string>('')
  const [memoryStats, setMemoryStats] = useState<{
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  }>({
    usedJSHeapSize: 0,
    totalJSHeapSize: 0,
    jsHeapSizeLimit: 0,
  });
  const [maxWorkers, setMaxWorkers] = useState<number>(4);
  const { results, resetResults } = useStore();
  const calculatedCount = Object.keys(results).length;
  const progress = (calculatedCount / totalItems) * 100;
  const [debugMode, setDebugMode] = useState<boolean>(false);

  // Сохраняем totalItems в localStorage при каждом его изменении
  useEffect (() => {
    localStorage.setItem('totalItems', totalItems.toString())
  }, [totalItems])

  // Обновление статистики памяти
  useEffect(() => {
    const updateMemoryStats = () => {
      if ('memory' in performance) {
        const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit } = performance.memory as {
          usedJSHeapSize: number;
          totalJSHeapSize: number;
          jsHeapSizeLimit: number;
        };
        setMemoryStats({ usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit });
      }
    };
    const interval = setInterval(updateMemoryStats, 1000);
    return () => clearInterval(interval);
  }, []);

  // Переключение режима отладки
  useEffect(() => {
    const originalConsoleLog = console.log;
    console.log = debugMode ? originalConsoleLog : () => {};
    return () => {
      console.log = originalConsoleLog;
    };
  }, [debugMode]);

  // Валидация inputValue при каждом изменении
  useEffect(() => {
    if(inputValue === '') {
      setError(''); // нет ошибки
      return;
    }

    const num = parseInt(inputValue, 10);

    if (num < 1) {
      setError('Число должно быть не меньше 1');
    } else if (num > 30000) {
      setError('Число не должно быть больше 30000')
    } else {
      setError('') // Все в порядке
    }
  },[inputValue])

  const handleMaxWorkersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(1, Math.min(8, parseInt(e.target.value) || 4));
    setMaxWorkers(newValue);
  };

  // Обработчик изменения значения в input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    if (value.length > 1) {
      value = value.replace(/^0+/, '')
    }
    setInputValue(value); // Обновляем значение в input
  };

  // Обработчик кнопки "Задать"
  const handleButtonSetItems = () => {
    const newValue = Math.max(1, Math.min(30000, parseInt(inputValue) || 200)) // Ограничения: 1–30,000
    setTotalItems(newValue);
    setInputValue(newValue.toString());// Синхронизируем input с totalItems
    resetResults();
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Аккордеон с оптимизацией</h1>
      </header>
      <main className="page-content">
        <h2>Всего блоков: {totalItems}</h2>
          <div className='formSetItems'>
            <input
              placeholder='Задать кол-во блоков'
              className={`inputSetItems ${error ? 'inputSetItems--error' : ''}`}
              type='number'
              value={inputValue}
              onChange={handleInputChange}
            />
            <button 
              className='buttonSetItems'
              onClick={handleButtonSetItems}
              disabled={!!error || inputValue === ''}
            >
              Задать
            </button>
            {error && <p className='error'>{error}</p>}
          </div>
        <div className='statisticHardWorkerContainer'>
          <h3>Мониторинг производительности</h3>
          <p>Используемая память: {(memoryStats.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB</p>
          <p>Общий размер кучи: {(memoryStats.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB</p>
          <p>Лимит памяти: {(memoryStats.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB</p>
          <label>
            Макс. воркеров (1-8):
            <input
              className='inputSetWorker'
              type="number"
              value={maxWorkers}
              min={1}
              max={8}
              onChange={handleMaxWorkersChange}
            />
          </label>
          <label style={{ marginLeft: 20 }}>
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
        <button style={{ marginTop: 20, marginLeft: 10 }} onClick={() => navigate('/')}>
          Домой
        </button>
      </main>
    </div>
  );
};