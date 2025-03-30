// src/components/AccordionContainer.tsx
import React, { useCallback, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { AccordionBlock } from './AccordionBlock';
import { useStore } from '../store/store';
import '../components/style/index.css';
import { pauseAllCalculations, resumeAllCalculations } from '../store/store';

interface AccordionContainerProps {
  totalItems: number;
}

export const AccordionContainer: React.FC<AccordionContainerProps> = ({ totalItems }) => {
  const { loadChunk, results, setBlockOpen, resetStore } = useStore();
  const CHUNK_SIZE = 100;
  const [showCompletedOnly, setShowCompletedOnly] = useState<boolean>(false);

  const filteredItems = Array.from({ length: totalItems }, (_, i) => i).filter((id) => {
    const isCompleted = results[id] !== undefined && results[id] !== null;
    return showCompletedOnly ? isCompleted : true;
  });

  const renderItem = useCallback(
    (index: number) => {
      const id = filteredItems[index];
      return <AccordionBlock key={id} id={id} />;
    },
    [filteredItems]
  );

  const handleRangeChanged = useCallback(
    ({ startIndex, endIndex }: { startIndex: number; endIndex: number }) => {
      const startChunk = Math.floor(filteredItems[startIndex] / CHUNK_SIZE);
      const endChunk = Math.floor(filteredItems[endIndex] / CHUNK_SIZE);
      for (let i = Math.max(0, startChunk - 1); i <= endChunk + 1; i++) {
        loadChunk(i);
      }
    },
    [loadChunk, filteredItems]
  );

  const handleOpenAll = useCallback(async () => {
    const BATCH_SIZE = 50;
    const DELAY_MS = 100;
    for (let i = 0; i < filteredItems.length; i += BATCH_SIZE) {
      const batch = filteredItems.slice(i, i + BATCH_SIZE);
      batch.forEach((id) => setBlockOpen(id, true));
      await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    }
  }, [filteredItems, setBlockOpen]);

  const handleCloseAll = useCallback(() => {
    useStore.setState({ openBlocks: {} });
  }, []);

  const handleReset = useCallback(() => {
    // Полный сброс через store
    resetStore();
    // Сброс локального состояния компонента
    setShowCompletedOnly(false);
    // Принудительное обновление UI через перезагрузку (можно заменить на key для Virtuoso)
    window.location.reload();
  }, [resetStore]);

  const handlePauseAll = useCallback(() => {
    pauseAllCalculations();
  }, []);

  const handleResumeAll = useCallback(() => {
    resumeAllCalculations();
  }, []);

  return (
    <div className="AccordionContainer">
      <div style={{ display: 'flex', gap: '10px', padding: '10px' }}>
        <button
          onClick={() => setShowCompletedOnly(!showCompletedOnly)}
          style={{
            backgroundColor: showCompletedOnly ? '#e0e0e0' : 'transparent',
            borderRadius: '4px',
            padding: '5px 10px',
          }}
        >
          Показать <span style={{ color: 'green' }}>✔</span>
        </button>
        <button onClick={handleOpenAll} style={{ borderRadius: '4px', padding: '5px 10px' }}>
          Открыть все
        </button>
        <button onClick={handleCloseAll} style={{ borderRadius: '4px', padding: '5px 10px' }}>
          Закрыть все
        </button>
        <button
          onClick={handleReset}
          style={{
            borderRadius: '4px',
            padding: '5px 10px',
            backgroundColor: '#ff4444',
            color: 'white',
          }}
        >
          Очистить
        </button>
        <button onClick={handlePauseAll} style={{ borderRadius: '4px', padding: '5px 10px' }}>
          ✖ все вычисления
        </button>
        <button onClick={handleResumeAll} style={{ borderRadius: '4px', padding: '5px 10px' }}>
          ▶ все вычисления
        </button>
      </div>
      <Virtuoso
        style={{ height: 'calc(100% - 40px)' }}
        totalCount={filteredItems.length}
        itemContent={renderItem}
        overscan={20}
        rangeChanged={handleRangeChanged}
      />
    </div>
  );
};