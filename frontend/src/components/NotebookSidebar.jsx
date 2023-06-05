import React from 'react';
import styles from './NotebookSidebar.module.css';

const NotebookSidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.notebook}>Notebook 1</div>
      <div className={styles.notebook}>Notebook 2</div>
      <div className={styles.notebook}>Notebook 3</div>
    </aside>
  );
};

export default NotebookSidebar;
