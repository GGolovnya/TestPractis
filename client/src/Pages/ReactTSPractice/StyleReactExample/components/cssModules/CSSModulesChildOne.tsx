import React from 'react';
import styles from './CSSModulesChildOne.module.css';

export const CSSModulesChildOne = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardTop}>
        <h2>Верхняя карточка</h2>
        <p>Текст сверху</p>
      </div>
      <div className={styles.cardBottom}>
        <h2>Нижняя карточка</h2>
        <p>Текст снизу</p>
      </div>
    </div>
  );
};