import React from 'react'
import '../../style/ChildOne.css'

export const ChildOne = () => {
    return (
        <div className='ContainerCard'>
            <div className='CardTop'>
                <h2>Под заголовок карточки сверху</h2>
                <p>Какой то текст</p>
            </div>
            <div className='CardBottom'>
                <h2>Под заголовок карточки снизу</h2>
                <p>Какой то текст</p>
            </div>
        </div>
    )
}