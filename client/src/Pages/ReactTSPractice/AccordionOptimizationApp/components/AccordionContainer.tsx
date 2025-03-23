import React, { useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { AccordionBlock } from './AccordionBlock';
import '../components/style/index.css'

export const AccordionContainer: React.FC = () => {
    const totalItems = 3000; // Задаем количество блоков

    console.log ('AccordionContainer рендерится')

    const renderItem = useCallback((index: number) => {
        console.log(`itemContent вызван для индекса ${index}`);
        return <AccordionBlock key={index} id={index} />;
      }, []);

  return (
    <div className='AccordionContainer'>
        <Virtuoso
            // Указываем общее количество элементов
            totalCount={totalItems}
            // Определяем что рендерить для каждого элемента
            itemContent={renderItem}
            overscan={20}
        />
    </div>
  )
}