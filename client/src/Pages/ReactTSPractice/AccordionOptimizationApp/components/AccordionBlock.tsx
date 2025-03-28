import React, { useCallback } from 'react';
import { useStore } from '../store/store'
import '../components/style/index.css'

interface AccordionBlockProps {
    id: number;
}

export const AccordionBlock: React.FC<AccordionBlockProps> = React.memo(({ id }) => {

    const { openBlocks, setBlockOpen } = useStore(); //берет состояние из стора
    
    const isOpen = openBlocks[id] || false; // определяем, открыт ли текущий блок 

    const handleBlockOpenClose = useCallback(() => {
        console.log(`Тоггл блока ${id}, новое состояние: ${!isOpen}`);
        setBlockOpen (id, !isOpen);
    }, [id, isOpen, setBlockOpen])

    console.log(`AccordionBlock ${id} рендерится, открыт: ${isOpen}`);

    return (
        <div className='accordionBlock'>
            <button 
                onClick={handleBlockOpenClose}
                className={`buttonBlockOpenClose ${isOpen ? 'open' : ''}`}>
                {isOpen ? '▼' : '►'} Блок {id}
            </button>
            {isOpen && 
                <div className="contentAccordionBlock">Содержимое </div>
            }
        </div>
    );
});
