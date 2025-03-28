import React from 'react'
import styled from '@emotion/styled';

// Создаем базовый контейнер
const CardContainer = styled.div`
    display: flex; /* Горизонтальное расположение */
    background-color: #2d3748; /* Темно-синий фон */
    border-radius: 20px; /* Скругленные углы */
    margin: 10px; /* Отступы снаружи */
`;

const CardTop = styled.div`
  flex: 1; /* Занимает половину ширины */
  background-color: #63b3ed; /* Голубой фон */
  padding: 10px; /* Внутренние отступы */
  margin: 10px; /* Внешние отступы */
  border-radius: 20px; /* Скругленные углы */

  transition: transform 0.3s ease-in-out; /* Плавная анимация */

  &:hover {
    background-color: #4299e1; /* Более темный голубой */
    transform: scale(1.05); /* Увеличение при наведении */
  }
`;

const CardBottom = styled.div`
  flex: 1;
  background-color: #2b6cb0; /* Темно-голубой фон */
  padding: 10px;
  margin: 10px;
  border-radius: 20px;

  transition: transform 0.3s ease-in-out;

  &:hover{
    background-color: #2c5282; /* Более темный оттенок */
    transform: scale(1.05);  }
`;

export const EmotionChildOne = () => {
    return (
      <CardContainer>
        <CardTop>
            <h2>Верхняя карточка</h2>
            <p>Текст сверху</p>
        </CardTop>
        <CardBottom>
            <h2>Нижняя карточка</h2>
            <p>Текст снизу</p>
        </CardBottom>
      </CardContainer>
    );
  };
