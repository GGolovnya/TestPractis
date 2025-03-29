import React, { useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { AccordionBlock } from './AccordionBlock';
import { useStore } from '../store/store';
import '../components/style/index.css'

interface AccordionContainerProps {
  totalItems: number; // Добавляем пропс
}

export const AccordionContainer: React.FC <AccordionContainerProps> = ({totalItems}) => {

    // Указываем параметры для Virtuoso
    const { loadChunk } = useStore();
  const CHUNK_SIZE = 100;

    console.log ('AccordionContainer рендерится')

    const renderItem = useCallback((index: number) => {
        console.log(`itemContent вызван для индекса ${index}`);
        return <AccordionBlock key={index} id={index} />;
      }, []);

    const handleRangeChanged = useCallback(
      ({ startIndex, endIndex }: { startIndex: number; endIndex: number }) => {
        const startChunk = Math.floor(startIndex / CHUNK_SIZE);
        const endChunk = Math.floor(endIndex / CHUNK_SIZE);
        // Загружаем текущий и соседние чанки
        for (let i = Math.max(0, startChunk - 1); i <= endChunk + 1; i++) {
          loadChunk(i);
        }
      },
      [loadChunk]
    );
  return (
    <div className='AccordionContainer'>
        <Virtuoso
            // Указываем общее количество элементов
            totalCount={totalItems}
            // Определяем что рендерить для каждого элемента
            itemContent={renderItem}
            overscan={20}
            rangeChanged={handleRangeChanged}
        />
    </div>
  )
}