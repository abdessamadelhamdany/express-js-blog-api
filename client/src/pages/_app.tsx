import 'normalize.css';
import hljs from 'highlight.js';
import Head from 'next/head';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/src/contexts/auth';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, defaultTheme } from '@/src/styles';
import { APP_NAME, APP_TITLE } from '@/src/lib/constants';
import GoogleAnalytics from '@/src/components/GoogleAnalytics';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.hljs = hljs;
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="hi" />
        <meta name="keywords" content="hi" />

        <title>
          {APP_TITLE} - {APP_NAME}
        </title>

        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />

        <GoogleAnalytics />
      </Head>

      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />

        <AuthProvider user={null}>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
