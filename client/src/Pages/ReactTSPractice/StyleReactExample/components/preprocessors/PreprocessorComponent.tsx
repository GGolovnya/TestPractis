import React from 'react';
import styles from './PreprocessorComponent.module.scss';
import { PreprocessorChildOne } from './PreprocessorChildOne';
import { PreprocessorChildTwo } from './PreprocessorChildTwo';

export const PreprocessorComponent: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>React SCSS Preprocessor</h1>
      <PreprocessorChildOne />
      <PreprocessorChildTwo />
    </div>
  );
};