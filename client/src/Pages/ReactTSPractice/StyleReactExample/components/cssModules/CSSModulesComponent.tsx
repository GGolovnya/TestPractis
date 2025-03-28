import React from 'react';
import styles from './CSSModulesComponent.module.css';
import { CSSModulesChildOne } from './CSSModulesChildOne';
import { CSSModulesChildTwo } from './CSSModulesChildTwo';

export const CSSModulesComponent = () => {
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>React CSS Modules</h1>
      <CSSModulesChildOne />
      <CSSModulesChildTwo />
    </div>
  );
};