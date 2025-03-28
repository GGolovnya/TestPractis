import React from 'react'
import '../../style/ChildTwo.css'

export const ChildTwo = () => {
    return (
        <div className='ContainerButton'>
            <button className='ButtonTop'>
                Верхняя кнопка
            </button>
            <button className='ButtonBottom'>
                Нижняя кнопка
            </button>
        </div>
    )
}