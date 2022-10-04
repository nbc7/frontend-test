import Image from 'next/image';
import { useState } from 'react';

import Dialog from './Dialog';

import styles from '../styles/Header.module.scss';

export default function Header() {
  const [showDialog, setShowDialog] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const Menu = () => {
    return (
      <div className={styles.backgroundMenu}>
        <a href="/">Posts</a>

        <button
          type="button"
          onClick={() => {
            setShowMenu(false);
            setShowDialog(true);
          }}
        >
          Contact
        </button>
      </div>
    );
  };

  return (
    <header className={styles.container}>
      <h1>Rockr Blog</h1>

      <div className={styles.menu}>
        <a href="/">Posts</a>

        <button type="button" onClick={() => setShowDialog(true)}>
          Contact
        </button>
      </div>

      <button type="button" className={styles.menuMobile} onClick={() => setShowMenu((prev) => !prev)}>
        {showMenu ? <Image src="/Close.svg" alt="close" width={38} height={38} /> : <Image src="/Menu.svg" alt="menu" width={38} height={38} />}
      </button>

      {showDialog && <Dialog returnShowDialog={(bool) => setShowDialog(bool)} />}
      {showMenu && <Menu />}
    </header>
  );
}
