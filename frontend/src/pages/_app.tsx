import * as React from 'react';
import Head from 'next/head';
import {AppProps} from 'next/app';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import theme from '../config/theme';
import createEmotionCache from '../config/createEmotionCache';
import {SessionProvider} from "next-auth/react"
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
import NProgress from 'nprogress';
//import do css do nprogress
import "nprogress/nprogress.css";
import {Router} from "next/router";

/**
 * toda vez que a rota for alterada
 */
Router.events.on("routeChangeStart", () => {
    NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
    NProgress.done();
});

Router.events.on("routeChangeError", () => {
    NProgress.done();
});


interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
    const {Component, emotionCache = clientSideEmotionCache, pageProps: {session, ...pageProps}} = props;
    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </Head>
            <SessionProvider session={session}>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline/>
                    <Component {...pageProps} />
                </ThemeProvider>
            </SessionProvider>
            {/*global indica que vai ser em todas as paginas*/}
            <style global jsx>
                {
                        `#nprogress {
                          position: relative;
                          z-index: 9999999;
                        }
    
                        #nprogress .bar {
                          background: #f44336 !important;
                          height: 3px;
                        }
                      `
                }
            </style>

        </CacheProvider>
    );
}