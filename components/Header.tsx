import Image from 'next/image';
import { useState } from 'react';

import styles from '../styles/Header.module.scss';

export default function Header() {
  const [showDialog, setShowDialog] = useState(false);

  const Dialog = () => {
    return (
      <div className={styles.background}>
        <div className={styles.dialog}>
          <div className={styles.close}>
            <button type="button" onClick={() => setShowDialog(false)}>
              <Image src="/Close.svg" alt="close" width={48} height={48} />
            </button>
          </div>

          <h1>Contact</h1>

          <form>
            <div>
              <span>Name</span>
              <input type="text" placeholder="Fill your full name" />
            </div>

            <div>
              <span>E-mail</span>
              <input type="email" placeholder="Fill a valid e-mail" />
            </div>

            <div>
              <span>Phone</span>
              <input type="phone" placeholder="Fill your phone" />
            </div>

            <div>
              <span>Post</span>
              <textarea placeholder="Hello..." />
            </div>

            <div>
              <button type="button" onClick={(e) => console.log(e)}>
                <div>
                  <Image src="/Send.svg" alt="close" width={24} height={24} />
                  Submit
                </div>
              </button>
            </div>
          </form>
        </div>
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

      {showDialog && <Dialog />}
    </header>
  );
}
