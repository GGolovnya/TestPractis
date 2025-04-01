import React, { useState, useEffect } from 'react';
import { AccordionContainer } from '../components/AccordionContainer';
import { useStore } from '../store/store';
import './AccordionOptimization.css';
import { useNavigate } from 'react-router-dom';
import { updateMaxWorkers } from '../store/store';

export const AccordionOptimization: React.FC = () => {
  const navigate = useNavigate();
  const [totalItems, setTotalItems] = useState<number>(() => {
    const savedItems = localStorage.getItem('totalItems');
    return savedItems ? parseInt(savedItems, 10) : 1000;
  });
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string>('');
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
  // PINK: Добавляем состояния для фиксированного n и флажка
  const [customN, setCustomN] = useState<number>(46);
  const [useFixedN, setUseFixedN] = useState<boolean>(false);
  const { results, resetResults, isServerMode, setServerMode, setCustomN: setStoreCustomN, setUseFixedN: setStoreUseFixedN } = useStore();
  const calculatedCount = Object.keys(results).length;
  const progress = (calculatedCount / totalItems) * 100;
  const [debugMode, setDebugMode] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('totalItems', totalItems.toString());
  }, [totalItems]);

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

  useEffect(() => {
    const originalConsoleLog = console.log;
    console.log = debugMode ? originalConsoleLog : () => {};
    return () => {
      console.log = originalConsoleLog;
    };
  }, [debugMode]);

  useEffect(() => {
    if (inputValue === '') {
      setError('');
      return;
    }
    const num = parseInt(inputValue, 10);
    if (num < 1) {
      setError('Число должно быть не меньше 1');
    } else if (num > 30000) {
      setError('Число не должно быть больше 30000');
    } else {
      setError('');
    }
  }, [inputValue]);

  const handleMaxWorkersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(1, Math.min(8, parseInt(e.target.value) || 4));
    setMaxWorkers(newValue);
    updateMaxWorkers(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length > 1) {
      value = value.replace(/^0+/, '');
    }
    setInputValue(value);
  };

  // PINK: Обработчик для изменения customN
  const handleCustomNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    const newValue = Math.max(1, Math.min(50, value));
    setCustomN(newValue);
    setStoreCustomN(newValue);
  };

  // PINK: Обработчик для переключения флажка
  const handleUseFixedNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setUseFixedN(checked);
    setStoreUseFixedN(checked);
  };

  const handleButtonSetItems = () => {
    const newValue = Math.max(1, Math.min(30000, parseInt(inputValue) || 1000));
    setTotalItems(newValue);
    setInputValue(newValue.toString());
    resetResults();
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Аккордеон с оптимизацией</h1>
      </header>
      <main className="page-content">
        <h2>Всего блоков: {totalItems}</h2>
        <div className="formSetItems">
          <input
            placeholder="Задать кол-во блоков"
            className={`inputSetItems ${error ? 'inputSetItems--error' : ''}`}
            type="number"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className="buttonSetItems"
            onClick={handleButtonSetItems}
            disabled={!!error || inputValue === ''}
          >
            Задать
          </button>
          {error && <p className="error">{error}</p>}
        </div>
        <div className="statisticHardWorkerContainer">
          <h3>Мониторинг производительности</h3>
          <p>Используемая память: {(memoryStats.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB</p>
          <p>Общий размер кучи: {(memoryStats.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB</p>
          <p>Лимит памяти: {(memoryStats.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB</p>
          <label>
            Макс. воркеров (1-8):
            <input
              className="inputSetWorker"
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
          <label style={{ marginLeft: 20 }}>
            Серверный режим:
            <input
              type="checkbox"
              checked={isServerMode}
              onChange={(e) => setServerMode(e.target.checked)}
            />
          </label>
          {/* PINK: Изменяем интерфейс для n */}
          <label style={{ marginLeft: 20 }}>
            Задать фиксированный n:
            <input
              type="checkbox"
              checked={useFixedN}
              onChange={handleUseFixedNChange}
            />
            <input
              type="number"
              value={customN}
              min={1}
              max={50}
              onChange={handleCustomNChange}
              disabled={!useFixedN}
              style={{ width: '60px', marginLeft: '5px' }}
            />
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