import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import { Inter, } from 'next/font/google';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import styles from '@/styles/Home.module.css';
import NavBar from '@/components/NavBar';
import NextNProgress from 'nextjs-progressbar';

//This is where the whole app is wrapped. 
//This is where you can add global styles, fonts, etc.
//What we put in here can be used globally. 

const inter = Inter({ subsets: ['latin'] });

// We want to wrap this in a div so that we can apply some global styles to it.

export default function App({ Component, pageProps }: AppProps) {
  return ( 
    <div className={inter.className} >
        <Head>
        <title key="title">NextJS News App</title>
        <meta name="description" key="description "content="Next crash course" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextNProgress />
      <NavBar />
      <Container className={styles.pageContainer}>
        <Component {...pageProps} />
      </Container>
    </div>
  );
}
