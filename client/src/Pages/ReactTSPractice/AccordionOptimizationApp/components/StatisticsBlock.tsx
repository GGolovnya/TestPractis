// src/components/StatisticsBlock.tsx
import React from 'react';
import { useStore } from '../store/store';
import '../components/style/index.css';

interface StatisticsBlockProps {
  id: number;
  data: Record<string, unknown> | null;
}

export const StatisticsBlock: React.FC<StatisticsBlockProps> = React.memo(({ id, data }) => {
  const { results } = useStore();
  const result = results[id];

  console.log(`StatisticsBlock ${id} рендерится, результат:`, result);

  const formatTime = (time: number) => {
    const seconds = time / 1000;
    return `${seconds.toFixed(2)} сек`;
  };

  const formateDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="ConrainerStatisticBlock">
      {result ? (
        <div>
          <div className="inputCard">Входные данные: {result.input}</div>
          <div className="resultCard">Результат: {result.result}</div>
          <div className="calculationTimeCard">Время вычисления: {formatTime(result.calculationTime)}</div>
          <div className="timestampCard">Дата: {formateDate(result.timestamp)}</div>
        </div>
      ) : (
        'Выполняются вычисления...'
      )}
    </div>
  );
});