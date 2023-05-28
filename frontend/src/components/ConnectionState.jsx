import React from 'react';
import styles from './ConnectionState.module.css';

export function ConnectionState({ isConnected }) {
  const dotColor = isConnected ? styles.green : styles.red;

  return (
    <div>
      <p>State: {isConnected ? 'Connected' : 'Not connected'}</p>
      <div className={`${styles.dot} ${dotColor}`}></div>
    </div>
  );
}