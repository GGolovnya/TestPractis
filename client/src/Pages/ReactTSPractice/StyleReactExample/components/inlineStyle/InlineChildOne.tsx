import React from 'react'

interface InlineChildOneProps {
    customStyles: {
        color: string;
        fontSize: number;
    },
    customStyles2: {
        color: string;
        fontSize: number;
    }
}

// Синтаксис 3: Вынос стилей в объект за пределы компонента
const styleSoft = {
    height: 100, // Исправлено hight → height
    background: 'rgb(24, 36, 60)',
    borderRadius: 20,
    display: 'flex',
    gap: 30
  };

// Сложный объект 
const styleHard = {
    color: {
        //Нейминг в объектах может быть разным
        colorUp: 'rgb(250, 116, 116)',
        colorCenter: 'rgb(250, 116, 116)',
        colorBottom: 'rgb(250, 116, 116)',
    },
    size: {
        small: {
            height: 20,
            width: 20,
        },
        medium: {
            height: 30,
            width: 30,
        },
        big: {
            height: 40,
            width: 40,
        }
    },
    background:{
        small: {
            color: 'rgb(67, 67, 67)',
            background: 'rgb(216, 216, 216)',
        },
        medium: {
            color: 'rgb(101, 101, 101)',
            background: 'rgb(198, 198, 198)',
        },
        big: {
            color: 'rgb(182, 182, 182)',
            background: 'rgb(59, 59, 59)',
        }
    }
}

//Синтаксис 4: Диструктурирование стилей
const {small} = styleHard.size
const {medium} = styleHard.size
const {big} = styleHard.size
//Использование алиасы для избежания конфликтов имен
const {small:bgSmall} = styleHard.background
const {medium:bgMedium} = styleHard.background
const {big:bgBig} = styleHard.background



export const InlineChildOne: React.FC<InlineChildOneProps>= ({customStyles, customStyles2}) => {
    return (
        <div style={styleSoft}>
            <div id="customStyles1" style={customStyles}>styleProops1</div>
            <div id="customStyles2" style={customStyles2}>customStyles2</div>
            <div id="small0" style={{
                width: 20,
                height: 20,
                background: 'red'
            }}>small0</div>
            <div id="small" style={{...small, ...bgSmall}}>small</div>
            <div id="medium" style={{...medium, ...bgMedium}}>medi</div>
            <div id="big" style={{...big, ...bgBig}}>big</div>
        </div>
    )
}