import Head from 'next/head';
import GiphySearch from '../components/GiphySearch';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GiphySearch />
      <footer className={styles.footer}>Created by Olivera Kostadinoska</footer>
    </div>
  );
}
