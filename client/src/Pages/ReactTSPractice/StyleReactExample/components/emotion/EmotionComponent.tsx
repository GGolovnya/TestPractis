import React from 'react';
import { EmotionChildOne } from './EmotionChildOne';
import { EmotionChildTwo } from './EmotionChildTwo';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 600px;
  height: 500px;
  background-color: #edf2f7;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #2d3748;
  text-align: center;
  margin: 0;
`;

export const EmotionComponent = () => {
  return (
    <Container>
      <Title>EmotionComponent</Title>
      <EmotionChildOne />
      <EmotionChildTwo />
    </Container>
  );
};