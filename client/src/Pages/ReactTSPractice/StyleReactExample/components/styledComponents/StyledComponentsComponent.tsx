import React from 'react'
import { StyledChildOne } from './StyledChildOne'
import { StyledChildTwo } from './StyledChildTwo'
import styled from 'styled-components';

const ContainerStyledComponentsComponent = styled.div`
    width: 600px;
	height: 500px;
    background-color: gray;
    border-radius:20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    box-sizing: border-box;
`

const StyledTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #2d3748;
  text-align: center;
  margin: 0;
  padding: 10px 0 0 0 ;
`;

export const StyledComponentsComponent: React.FC = () => {
  return (
        <ContainerStyledComponentsComponent>
            <StyledTitle>React Styled " Styled-components "</StyledTitle>
            <StyledChildOne/>
            <StyledChildTwo/>
        </ContainerStyledComponentsComponent>
  )
}
