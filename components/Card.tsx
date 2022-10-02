import Image from 'next/image';

import styles from '../styles/Card.module.scss';

interface Props {
  imageUrl: string;
  author: string;
  title: string;
  article: string;
  reverse?: boolean;
  big?: boolean;
}

export default function Card(props: Props) {
  let titleText = props.title.replace(/<\/?[^>]+(>|$)/g, '');
  let articleParagraph = props.article.split('\n');

  return (
    <div className={`${styles.card} ${props.reverse ? styles.reverse : ''} ${props.big ? styles.big : ''}`}>
      <div className={styles.image}>
        <Image src={props.imageUrl} layout="fill" />
      </div>

      <div className={styles.content}>
        <div className={styles.contentInner}>
          <span>{props.author}</span>

          <h1>{titleText}</h1>

          <div dangerouslySetInnerHTML={{ __html: articleParagraph[0] }} />
        </div>

        <a href="/" className={styles.readMore}>
          <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.024 0H16.039L24 8L16.039 16H10.024L17.985 8L10.024 0ZM0 16H6.015L13.976 8L6.015 0H0L7.961 8L0 16H0Z" fill="#032937" />
          </svg>
        </a>
      </div>
    </div>
  );
}
