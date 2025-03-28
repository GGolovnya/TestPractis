import React from 'react'
import '../../style/main.css' //импортируем централизованный стиль
import { ChildOne } from './ChildOne'
import { ChildTwo } from './ChildTwo'

export const MainComponent = () => {
    return (
        <div className='mainContainer'>
            <h1>React Style External CSS</h1>
            <ChildOne />
            <ChildTwo />
        </div>
    )
}