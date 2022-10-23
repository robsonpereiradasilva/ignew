import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import {  SessionProvider } from "next-auth/react"


import  '../styles/global.scss'
import { type } from 'os'


 
function MyApp({ Component, pageProps }: AppProps)  {
  return (
    <SessionProvider session={(pageProps as any).session}>
      <Header />
      <Component {...pageProps} />

    </SessionProvider>
    ) 
}

export default MyApp
