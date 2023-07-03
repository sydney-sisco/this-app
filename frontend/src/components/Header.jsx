import React from 'react';
import styles from './Header.module.css';
import futureLogo from '/future.svg';

const Header = () => {
  return (
    <header className={styles.header}>
      <a className={styles.logo} href="https://github.com/sydney-sisco/this-app/" target="_blank">
        <img src={futureLogo} alt="future logo" />
      </a>
    </header>
  );
};

export default Header;
