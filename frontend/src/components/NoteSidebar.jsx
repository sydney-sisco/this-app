import React from 'react';
import styles from './NoteSidebar.module.css';

const NoteSidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.note}>Note 1</div>
      <div className={styles.note}>Note 2</div>
      <div className={styles.note}>Note 3</div>
    </aside>
  );
};

export default NoteSidebar;
