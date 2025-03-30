// src/components/AccordionBlock.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { useStore } from '../store/store';
import '../components/style/index.css';
import { StatisticsBlock } from './StatisticsBlock';

interface AccordionBlockProps {
  id: number;
}

const CHUNK_SIZE = 100;

export const AccordionBlock: React.FC<AccordionBlockProps> = React.memo(({ id }) => {
  const {
    openBlocks,
    setBlockOpen,
    loadChunk,
    getData,
    results,
    isBlockProcessing,
    getBlockStartTime,
    cancelledTasks,
    cancelTask,
    resumeTask,
  } = useStore();
  const isOpen = openBlocks[id] || false;
  const chunkId = Math.floor(id / CHUNK_SIZE);
  const data = getData(id);
  const hasResult = !!results[id];
  const isProcessing = isBlockProcessing(id);
  const startTime = getBlockStartTime(id);
  const isCancelled = cancelledTasks[id] || false;

  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    loadChunk(chunkId);
  }, [chunkId, loadChunk]);

  useEffect(() => {
    if (!isProcessing || !startTime || hasResult || isCancelled) {
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const timeElapsed = (now - startTime) / 1000;
      setElapsedTime(timeElapsed);
    }, 100);

    return () => clearInterval(interval);
  }, [isProcessing, startTime, hasResult, isCancelled]);

  const handleBlockOpenClose = useCallback(() => {
    setBlockOpen(id, !isOpen);
  }, [id, isOpen, setBlockOpen]);

  const handleCancel = useCallback(() => {
    cancelTask(id);
    setElapsedTime(0);
  }, [id, cancelTask]);

  const handleResume = useCallback(() => {
    resumeTask(id);
  }, [id, resumeTask]);

  return (
    <div className="accordionBlock">
      <button
        onClick={handleBlockOpenClose}
        className={`buttonBlockOpenClose ${isOpen ? 'open' : ''} ${hasResult ? 'calculated' : ''}`}
      >
        {isOpen ? '▼' : '►'} Блок {id}
        {isProcessing && !hasResult && !isCancelled && (
          <>
            <span style={{ color: 'yellow', marginLeft: '5px' }}>●</span>
            <span style={{ marginLeft: '5px' }}>{elapsedTime.toFixed(1)} сек</span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleCancel();
              }}
              style={{ marginLeft: '5px', cursor: 'pointer' }}
            >
              ✖
            </span>
          </>
        )}
        {isCancelled && !hasResult && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              handleResume();
            }}
            style={{ marginLeft: '5px', cursor: 'pointer' }}
          >
            ▶
          </span>
        )}
        {hasResult && !isOpen && ' ✔'}
      </button>
      {isOpen && (
        <div className="contentAccordionBlock">
          {data ? <StatisticsBlock id={id} data={data} /> : 'Загрузка данных...'}
        </div>
      )}
    </div>
  );
});