import React, { useEffect } from 'react';
import { useStore } from '../store/store';
import { initializeWorker } from '../utils/workerSetup';
import '../components/style/index.css'

interface StatisticsBlockProps {
  id: number;
  data: Record<string, unknown> | null;
}

// Интерфейс для результата (ожидаемый формат данных)
interface ResultData {
  calculationTime: number; // в секундах
  timestamp: number; // в миллисекундах
  input: string;
  result: number;
}

export const StatisticsBlock: React.FC<StatisticsBlockProps> = React.memo(({ id, data }) => {
  const { results, setResult } = useStore();
  const result = results[id] as ResultData | undefined; // Приводим тип результата

  // Запускаем вычисления, если данных ещё нет
  useEffect(() => {
    if (!data || result) return;

    console.log(`Запуск вычислений для блока ${id}`);
    const worker = initializeWorker(`calculator-${id}`, (error) => {
      console.error(`Ошибка в блоке ${id}:`, error);
    });

    if (!worker) return;

    worker.postMessage({ id, data });

    worker.onmessage = (e) => {
      console.log(`Результат вычислений для блока ${id}:`, e.data);
      setResult(id, e.data);
      worker.terminate();
    };

    return () => worker.terminate();
  }, [id, data, result, setResult]);

  console.log(`StatisticsBlock ${id} рендерится, результат:`, result);

  // Функция для форматирования даты (timestamp → "28 марта 2025, 14:30")
  const formateDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  return (
    <div className='ConrainerStatisticBlock'>
      {result ? (
        <div>
          <div className='inputCard'>
            Входные данные: {result.input}
          </div>
          <div className='resultCard'>
            Результат: {result.result}
          </div>
          <div className='calculationTimeCard'>
            Время вычисления: {result.calculationTime}
          </div>
          <div className='timestampCard'>
            Дата: {formateDate(result.timestamp)}
          </div>
        </div>
      ) : (
        'Выполняются вычисления...'
      )}
    </div>
  );
});