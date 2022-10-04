import { useEffect, useRef, useState } from 'react';
import { GetStaticProps } from 'next';
import axios from 'axios';

import Header from '../components/Header';
import Card from '../components/Card';

import styles from '../styles/index.module.scss';

interface PostProps {
  id: string;
  imageUrl: string;
  author: string;
  authorEmail: string;
  title: string;
  article: string;
  date: string;
}

export default function Home({ postsFirstPage }) {
  const [posts, setPosts] = useState<PostProps[]>(postsFirstPage);
  const [pageNumber, setPageNumber] = useState(2);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasPosts, setHasPosts] = useState(false);

  const loader = useRef(null);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel;

    axios({
      method: 'GET',
      url: 'https://stormy-shelf-93141.herokuapp.com/articles',
      params: { _page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setPosts((prev) => [...prev, ...res.data]);
        setHasPosts(res.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel();
  }, [pageNumber]);

  const handleObserver = (entries) => {
    if (entries[0].isIntersecting && hasPosts) {
      setPageNumber((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver);

    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <main>
      <Header />

      <article className={styles.posts}>
        {posts.map((post, index) => {
          switch ((index + 1) % 6) {
            case 1:
              return (
                <div key={index}>
                  <Card key={post.id} post={post} />
                </div>
              );
            case 2:
              return (
                <div key={index} className={`${styles.rightSmall} ${styles.postsGap}`} style={{ bottom: 'calc(50vw/3)' }}>
                  <Card key={post.id} post={post} />
                </div>
              );
            case 3:
              return (
                <div key={index} className={`${styles.rightBig} ${styles.postsGap}`}>
                  <Card key={post.id} post={post} big />
                </div>
              );
            case 4:
              let style = {};
              index === posts.length - 1 && (style = { marginBottom: 'calc(50vw/3 + 4.2vw)' });
              return (
                <div key={index} className={styles.rightSmall} style={style}>
                  <Card key={post.id} post={post} reverse />
                </div>
              );
            case 5:
              return (
                <div key={index} className={styles.postsGap}>
                  <Card key={post.id} post={post} reverse />
                </div>
              );
            case 0:
              return (
                <div key={index} className={styles.postsGap}>
                  <Card key={post.id} post={post} big />
                </div>
              );
          }
        })}

        {!loading && hasPosts && <div ref={loader}></div>}
        {loading && !error && 'Loading...'}
        {error && 'Error'}
      </article>
    </main>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios({
    method: 'GET',
    url: 'https://stormy-shelf-93141.herokuapp.com/articles',
    params: { _page: 1 },
  });

  return {
    props: {
      postsFirstPage: data,
    },
    revalidate: 60 * 60 * 8,
  };
};
