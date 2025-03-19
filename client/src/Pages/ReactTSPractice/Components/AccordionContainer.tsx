
// src/components/AccordionContainer.tsx
import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { AccordionBlock } from './AccordionBlock';

export const AccordionContainer: React.FC = () => {
  const itemCount = 10000;
  
  return (
    <List
      height={800}
      itemCount={itemCount}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          <AccordionBlock id={index} />
        </div>
      )}
    </List>
  );
};