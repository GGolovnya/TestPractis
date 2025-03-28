import React, { useState } from 'react';
import styles from './CSSModulesChildTwo.module.css';

export const CSSModulesChildTwo = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.buttonContainer}>
      <button
        className={`${styles.button} ${isActive ? styles.buttonActive : ''}`}
        onClick={() => setIsActive(!isActive)}
      >
        {isActive ? 'Активная кнопка' : 'Верхняя кнопка'}
      </button>
      <button className={styles.button}>Нижняя кнопка</button>
    </div>
  );
};