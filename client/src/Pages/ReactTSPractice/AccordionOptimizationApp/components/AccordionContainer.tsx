import React, { useCallback, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { AccordionBlock } from './AccordionBlock';
import { useStore } from '../store/store';
import '../components/style/index.css';

interface AccordionContainerProps {
  totalItems: number;
}

export const AccordionContainer: React.FC<AccordionContainerProps> = ({ totalItems }) => {
  const { loadChunk, results } = useStore();
  const CHUNK_SIZE = 100;
  const [showCompletedOnly, setShowCompletedOnly] = useState<boolean>(false);

  const filteredItems = Array.from({ length: totalItems }, (_, i) => i).filter((id) => {
    const isCompleted = results[id] !== undefined && results[id] !== null;
    return showCompletedOnly ? isCompleted : true;
  });

  const renderItem = useCallback(
    (index: number) => {
      const id = filteredItems[index];
      console.log(`itemContent вызван для индекса ${id}`);
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

  return (
    <div className="AccordionContainer">
      <div>
        <button
          onClick={() => setShowCompletedOnly(!showCompletedOnly)}
          style={{
            backgroundColor: showCompletedOnly ? '#e0e0e0' : 'transparent',
            borderRadius: '4px',
            padding: '5px 10px', // Добавлены отступы для красоты
          }}
        >
          Показать <span style={{ color: 'green' }}>✔</span>
        </button>
      </div>
      <Virtuoso
        style={{ height: 'calc(100% - 40px)' }} // Учитываем высоту кнопки и отступа
        totalCount={filteredItems.length}
        itemContent={renderItem}
        overscan={20}
        rangeChanged={handleRangeChanged}
      />
    </div>
  );
};