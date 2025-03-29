import React, { useCallback, useEffect } from 'react';
import { useStore } from '../store/store'
import '../components/style/index.css'
import { StatisticsBlock } from './StatisticsBlock';

interface AccordionBlockProps {
    id: number;
}

const CHUNK_SIZE = 100;

export const AccordionBlock: React.FC<AccordionBlockProps> = React.memo(({ id }) => {

    const { openBlocks, setBlockOpen, loadChunk, getData, results } = useStore(); //берет состояние из стора
    const isOpen = openBlocks[id] || false; // определяем, открыт ли текущий блок 
    const chunkId = Math.floor(id / CHUNK_SIZE);
    const data = getData(id);
    const hasResult = !!results[id]

    useEffect(() => {
        console.log(`Загрузка чанка ${chunkId} для бока ${id}`)
        loadChunk(chunkId)
    },[chunkId, loadChunk])

    const handleBlockOpenClose = useCallback(() => {
        console.log(`Тоггл блока ${id}, новое состояние: ${!isOpen}`);
        setBlockOpen (id, !isOpen);
    }, [id, isOpen, setBlockOpen])

    console.log(`AccordionBlock ${id} рендерится, открыт: ${isOpen}, данные:`, data);

    return (
        <div className='accordionBlock'>
            <button 
                onClick={handleBlockOpenClose}
                className={`buttonBlockOpenClose ${isOpen ? 'open' : ''} ${hasResult ? 'calculated' : ''} `}>
                {isOpen ? '▼' : '►'} Блок {id} {hasResult && !isOpen ? '  ✔' : ''}
            </button>
            {isOpen && 
                <div className="contentAccordionBlock">
                    {data ? (
                        <StatisticsBlock id={id} data={data} />
                    ) : (
                        'Загрузка данных...'
                    )}
                </div>
            }
        </div>
    );
});
