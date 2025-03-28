import React, { useState } from 'react';
import styled from '@emotion/styled';

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #4a5568; /* Серый фон */
    margin: 0 10px;
    padding: 10px;
    gap: 10px;
`;

const StyledButton = styled.button<{isActive?: boolean}>`
  background-color: ${ ({isActive}) => (isActive ? '#9f7aea' : '#718096')} ;
  color: white;
  border: none;
  padding: 10px;
  width: 300px; /* Фиксированная ширина */
  border-radius: 10px; /* Закругленные углы */
  cursor: pointer; /* Курсор как при наведении на кнопку */

  &:hover{
    background-color: ${({isActive}) => (isActive ? '#7c3aed' : '#a0aec0')};
  }
`;

export const EmotionChildTwo = () => {
    const [isActive, setIsActive] = useState(false)
  return (
    <ButtonContainer>
        <StyledButton isActive={isActive} onClick={() => setIsActive(!isActive)}>
            {isActive ? 'Активная кнопка' : 'Неактивная кнопка'}            
        </StyledButton>
        <StyledButton>Нижняя кнопка</StyledButton>
    </ButtonContainer>
  );
};