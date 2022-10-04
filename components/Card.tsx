import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/Card.module.scss';

interface Props {
  post: { id: string; imageUrl: string; author: string; authorEmail: string; title: string; article: string; date: string };
  reverse?: boolean;
  big?: boolean;
}

export default function Card(props: Props) {
  let titleText = props.post.title.replace(/<\/?[^>]+(>|$)/g, '');
  let articleParagraph = props.post.article.split('\n');

  return (
    <div className={`${styles.card} ${props.reverse ? styles.reverse : ''} ${props.big ? styles.big : ''}`}>
      <div className={styles.image}>
        <Image src={props.post.imageUrl} layout="fill" />
      </div>

      <div className={styles.content}>
        <div className={styles.contentInner}>
          <span>{props.post.author}</span>

          <h1>{titleText}</h1>

          <div dangerouslySetInnerHTML={{ __html: articleParagraph[0] }} />
        </div>

        <Link href={`/posts/${props.post.id}`}>
          <button type="button" className={styles.readMore}>
            <Image src="/Vector.svg" alt="close" width={24} height={24} />
          </button>
        </Link>
      </div>
    </div>
  );
}
