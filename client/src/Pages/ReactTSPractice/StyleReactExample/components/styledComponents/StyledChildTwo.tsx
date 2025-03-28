import React, {useState} from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px;
    gap: 10px;
`
const StyledButton = styled.button<{ isActive?: boolean}>`
    background-color: ${props => (
        props.isActive ? '   #2e145b;' : '   #343434;'
    )};
    color: white;
    border-radius: 10px;
    width: 300px;
    padding: 10px;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: ${props => (props.isActive ? '#805ad5' : '#9970e6')};
    }
`
export const StyledChildTwo = () => {
    const [isActive, setIsActive] = useState(false)
  return (
    <ButtonContainer>
        <StyledButton isActive={isActive} onClick={() => setIsActive(!isActive)}>
         {isActive ? 'Не активная кнопка' : 'Активная кнопка'}
        </StyledButton>
        <StyledButton>Нижняя кнопка</StyledButton>
    </ButtonContainer>
  )
}
