import React from 'react'
import { InlineChildOne } from './InlineChildOne'
import { InlineChildTwo } from './InlineChildTwo'

// Синтаксис 3: Вынос стилей в объект за пределы компонента
const style1 = {
  color: 'rgb(8, 243, 11)', //Перебивается инлайновым стилем (пример: Блок 2)
  fontSize: 20,
}

// Синтаксис 3: Вынос стилей в объект за пределы компонента
const styleProops1 = {
  color: 'rgb(254, 118, 15)',
  fontSize: 20,
}
const styleProops2 = {
  color: 'rgb(121, 255, 19)',
  fontSize: 20,
}

export const InlineComponent = () => {

  // Синтаксис 2: Вынос стилей в объект внутри компонента
  const style2 = {
    color: 'black',        // Основной цвет текста
    color1: 'green',       // Дополнительный цвет 1
    color2: 'pink',        // Дополнительный цвет 2
    backgroundColor: 'rgb(52, 52, 52)',
    borderRadius: 20,
  }

  return (
    //Синтаксис 1: Прямое указание стиля внутри элемента
    <div id='Container1' style={{
        color: 'black',
        backgroundColor: 'rgb(255, 255, 255)',
        width: 600,
        height: 500,
        borderRadius: 20,
    }}>
        <h1>React Style Inline</h1>
        {/* Синтаксис 5: Универсальные стили + сделали объединение стилей style2 + padding (добавочный) */}
        <div style={{...style2, padding: 10}}>
          {/* Используем color2 из style2 + добавляем еще стиль textAlign */}
          <p style={{color: style2.color1, textAlign: 'center'}}>Блок 1</p>
        </div>
        {/* Демонстрация перебивания: style2 перебивает style1 */}
        <div style={{...style2, ...style1 , padding: 5}}>
          {/* Используем color2 из style2 + добавляем еще стиль textAlign */}
          <p style={{color: style2.color2, textAlign: 'center'}}>Блок 2</p>
        </div>
        {/* Демонстрация перебивания: style2 + style1, но без явного указания цвета */}
        <div style={{...style2, ...style1 , padding:5}}>
          <p style={{textAlign: 'center'}}>Блок 3</p>
        </div>
        {/* Синтаксис 6: Передача стилей через пропсы */}
        <InlineChildOne customStyles={styleProops1} customStyles2={styleProops2}/>
        <InlineChildTwo customStyles={{ color: style2.color2 }} />
    </div>  
  )
}