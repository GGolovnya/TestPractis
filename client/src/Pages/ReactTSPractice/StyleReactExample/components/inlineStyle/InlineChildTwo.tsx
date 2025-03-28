import React, {useState} from 'react'

interface InlineChildTwoProps {
    customStyles: {
        color: string;
    }
}

export const InlineChildTwo: React.FC<InlineChildTwoProps> = ({customStyles}) => {
    // Создаем 2 состояния под разные кнопки
    const [isActive1, setIsActive1] = useState(false);
    const [isActive2, setIsActive2] = useState(false);

    const baseStyle = {
        backgroundColor: 'rgb(81, 176, 17)',
        borderRadius: 20,
    }

    const baseStyleSize = {
        padding: 10,
        textAlign: 'center' as const,
        width: 150, 
        height: 40
    }

    //Можно создавать динамический стиль
    const dynamicStyle = (isActive: boolean) => ({
            backgroundColor: isActive ? 'rgb(81, 176, 17)' : 'rgb(149, 149, 149)',
            color: isActive ? 'black' : 'white',
        });

    return (
        <div
        id='ContainerButton'
        style={baseStyle}>
            <button
                id='dynamicButton'
                style={dynamicStyle(isActive1)}
                onClick={() => setIsActive1(!isActive1)}
                >
                Нажми и смени цвет
            </button>
            <div
                id='dynamicDiv'
                style={{...baseStyleSize, ...dynamicStyle(isActive2)}}
                onClick={() => setIsActive2(!isActive2)}
                >
                Нажми и смени цвет
            </div>
            <div
                id='PropsDiv'
                style={customStyles}
                >
                Переданный пропс
            </div>
        </div>
    )
}