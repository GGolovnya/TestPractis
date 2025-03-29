import React, { useState } from 'react';
import styles from './PreprocessorChildTwo.module.scss';

export const PreprocessorChildTwo: React.FC = () => {
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