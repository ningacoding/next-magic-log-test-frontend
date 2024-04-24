import type {ReactElement, ReactNode} from 'react';
import type {NextPage} from 'next';
import type {AppProps} from 'next/app';
import "../app/globals.css";
import {Providers} from '@/app/providers';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

// @ts-ignore
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

// @ts-ignore
export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return <Providers>
    {getLayout(<Component {...pageProps} />)}
  </Providers>;
}
