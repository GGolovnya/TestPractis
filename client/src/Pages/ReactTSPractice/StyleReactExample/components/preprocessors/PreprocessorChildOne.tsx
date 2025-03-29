import React from 'react'
import styles from './PreprocessorChildOne.module.scss'

export const PreprocessorChildOne: React.FC = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardTop}>
        <h2>Верхняя карточка</h2>
        <p>Текс сверху</p>
      </div>
      <div className={styles.cardBottom}>
        <h2>Нижняя карточка</h2>
        <p>Текс снизу</p>
      </div>
    </div>
  )
}
