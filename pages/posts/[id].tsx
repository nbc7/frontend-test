import Image from 'next/image';
import axios from 'axios';

import dayjs from 'dayjs';

import Header from '../../components/Header';

import styles from '../../styles/Post.module.scss';

interface Post {
  id: string;
  imageUrl: string;
  author: string;
  authorEmail: string;
  title: string;
  article: string;
  date: string;
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  let titleText = post.title.replace(/<\/?[^>]+(>|$)/g, '');

  return (
    <main>
      <Header />

      <div className={styles.container}>
        <article className={styles.post}>
          <div className={styles.card}>
            <div className={styles.image}>
              <Image src={post.imageUrl} layout="fill" />
            </div>

            <div className={styles.content}>
              <div className={styles.contentInner}>
                <span className={styles.date}>{post.date ? dayjs(post.date).format('MMM D, YYYY') : ''}</span>

                <span className={styles.author}>{post.author}</span>
              </div>

              <div className={styles.title}>
                <h1>{titleText}</h1>
              </div>
            </div>
          </div>

          <div className={styles.postArticle} dangerouslySetInnerHTML={{ __html: post.article }} />
        </article>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  const { data } = await axios({
    method: 'GET',
    url: `https://stormy-shelf-93141.herokuapp.com/articles/${id}`,
  });

  const post = {
    id: data.id,
    imageUrl: data.imageUrl,
    author: data.author,
    authorEmail: data.authorEmail,
    title: data.title,
    article: data.article,
    date: data.date,
  };

  return {
    props: {
      post,
    },
  };
}
