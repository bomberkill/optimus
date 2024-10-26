import '@mantine/core/styles.css';

import { useEffect, useRef, useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { MantineProvider } from '@mantine/core';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { theme } from '../theme';
import { useRouter } from 'next/router';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleReload = () => {
      localStorage.setItem("isRefresh", "true");
    }
    window.addEventListener("beforeunload", handleReload);
    return () => {
      window.addEventListener("beforeinput", handleReload);
    }
  },[])
  useEffect(() => {
    const isRefresh = localStorage.getItem("isRefresh");
    if (router.pathname === '/' && isRefresh === "true") {
      localStorage.clear()
    };
    localStorage.removeItem("isRefresh");
  },[router.pathname])
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Optimus Marketing</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </MantineProvider>
  );
}
export default appWithTranslation(App);
