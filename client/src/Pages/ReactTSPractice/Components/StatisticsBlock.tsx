// src/components/StatisticsBlock.tsx
import React, { useState, useEffect } from 'react';
import { useStore } from '../store/store';
import { initializeWorker } from '../utils/workerSetup';
import './StatisticsBlock.css';

// Интерфейс пропсов компонента
interface StatisticsBlockProps {
  id: number;
  data: Record<string, unknown> | null;
}

// Компонент для отображения статистики, мемоизирован для оптимизации
export const StatisticsBlock = React.memo<StatisticsBlockProps>(({ id, data }) => {
  const { results, setResult } = useStore(); // Получаем результаты и метод их установки
  const [error, setError] = useState<string | null>(null); // Состояние ошибки
  const result: Record<string, unknown> | null = results[id]; // Результат для текущего блока

  // Обработчик повторной попытки вычислений
  const handleRetry = () => {
    setError(null);
    setResult(id, null);
  };

  // Эффект для запуска вычислений в Web Worker
  useEffect(() => {
    if (!data || result) return; // Если данных нет или результат уже есть, ничего не делаем

    // Инициализируем Web Worker для вычислений
    const worker = initializeWorker(
      `calculator-${id}`,
      (errorMessage) => {
        setError(errorMessage); // Устанавливаем ошибку, если она возникла
      }
    );

    if (!worker) return;

    // Устанавливаем таймаут для воркера
    const workerTimeout = setTimeout(() => {
      worker.terminate();
      setError('Worker initialization timeout');
    }, 5000);

    // Отправляем данные в воркер
    worker.postMessage({ id, data });

    // Обрабатываем результат от воркера
    worker.onmessage = (e) => {
      clearTimeout(workerTimeout);
      setResult(id, e.data); // Сохраняем результат в store
      worker.terminate(); // Завершаем работу воркера
    };

    // Очистка при размонтировании
    return () => {
      clearTimeout(workerTimeout);
      worker.terminate();
    };
  }, [data, id, result, setResult]);

  return (
    <div className="statistics-block">
      {error ? (
        // Отображение ошибки с кнопкой повтора
        <div className="error-message">
          <p>{error}</p>
          <button className="retry-button" onClick={handleRetry}>
            Повторить вычисления
          </button>
        </div>
      ) : result ? (
        // Отображение результатов в сетке
        <div className="results-grid">
          {Object.entries(result).map(([key, value]) => (
            <div key={key} className="result-item">
              <strong>{key}</strong>
              <span>{JSON.stringify(value)}</span>
            </div>
          ))}
        </div>
      ) : (
        // Сообщение о выполнении вычислений
        <div className="loading-message">
          Выполняются вычисления...
        </div>
      )}
    </div>
  );
});