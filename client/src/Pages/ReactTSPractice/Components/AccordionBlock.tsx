// src/components/AccordionBlock.tsx
import React, { useCallback } from 'react';
import { useStore } from '../store/store';
import { StatisticsBlock } from './StatisticsBlock';

interface AccordionBlockProps {
  id: number;
}

export const AccordionBlock = React.memo<AccordionBlockProps>(({ id }) => {
  const { 
    openBlocks,
    loadChunk,
    getData,
    setBlockOpen
  } = useStore();
  
  const isOpen = openBlocks[id];
  const chunkId = Math.floor(id / CHUNK_SIZE);

  const handleClick = useCallback(() => {
    setBlockOpen(id, !isOpen);
    if (!isOpen) {
      loadChunk(chunkId);
    }
  }, [setBlockOpen, id, isOpen, loadChunk, chunkId]);

  return (
    <div>
      <button onClick={handleClick}>
        {isOpen ? '▼' : '►'} Блок {id}
      </button>
      
      {isOpen && (
        <React.Suspense fallback={<div>Загрузка...</div>}>
          <StatisticsBlock id={id} data={getData(id)} />
        </React.Suspense>
      )}
    </div>
  );
});