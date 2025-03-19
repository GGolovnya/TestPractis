// src/components/StatisticsBlock.tsx
import React, { useEffect } from 'react';
import { useStore } from '../store/store';

interface StatisticsBlockProps {
  id: number;
  data: any;
}

export const StatisticsBlock = React.memo<StatisticsBlockProps>(({ id, data }) => {
  const { results, setResult } = useStore();
  const result = results[id];
  
  useEffect(() => {
    if (!data || result) return;
    
    const worker = new Worker('calculator.js');
    const workerTimeout = setTimeout(() => worker.terminate(), 5000);
    
    worker.postMessage({ id, data });
    
    worker.onmessage = (e) => {
      clearTimeout(workerTimeout);
      setResult(id, e.data);
      worker.terminate();
    };
    
    return () => {
      clearTimeout(workerTimeout);
      worker.terminate();
    };
  }, [data, id]);

  return (
    <div>
      {result ? (
        <div>Результат: {result}</div>
      ) : (
        <div>Выполняются вычисления...</div>
      )}
    </div>
  );
});