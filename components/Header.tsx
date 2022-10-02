import styles from '../styles/Header.module.scss';

export default function Header() {
  return (
    <header className={styles.container}>
      <h1>Rockr Blog</h1>
      <div>
        <a>Posts</a>
        <a>Contact</a>
      </div>
    </header>
  );
}
