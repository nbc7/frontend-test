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
        {posts.map((post) => {
          return <Card key={post.id} imageUrl={post.imageUrl} author={post.author} title={post.title} article={post.article} />;
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
