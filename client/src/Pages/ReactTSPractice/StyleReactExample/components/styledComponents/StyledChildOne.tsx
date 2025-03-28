import React from 'react';
import styled from 'styled-components';

// Стилизованный контейнер для карточки
const CardContainer = styled.div`
  display: flex;
  border-radius: 20px;
  margin: 10px 10px;
  gap: 10px;
  background-color: darkslategrey;
`;

const CardTop = styled.div`
    flex: 1;
    background-color: #68d391; /* Зеленый оттенок */
    padding: 10px;
    margin: 10px;
    border-radius: 20px;
    transition: transform 0.3s ease-in-out; // добавляем анимацию

    // Добавляем поведение стиля при наведении на контейнер
    &:hover {
        background-color: #4caf70;
        transform: scale(1.05);
    }
`

const CardBottom = styled.div`
    flex: 1;
    background-color: #2f855a; /* Темно-зеленый оттенок */
    padding: 10px;
    margin: 10px;
    border-radius: 20px;
    transition: transform 0.3s ease-in-out;

    &:hover {
        background-color: #1f5e3d;
        transform: scale(1.05);
    }
`

export const StyledChildOne = () => {
  return (
    <CardContainer>
        <CardTop>
            <h2>Верхняя часть</h2>
            <p>Текст вверху</p>
        </CardTop>
        <CardBottom>
            <h2>Нижняя часть</h2>
            <p>Текст внизу</p>
        </CardBottom>
    </CardContainer>
  );
};