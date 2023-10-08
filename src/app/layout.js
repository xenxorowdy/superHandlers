
import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'
import Navbar from './component/Navbar'
import SessionProvider from "./component/SessionProvider.jsx"
import Footter from './component/footter'
import './globals.css'
import Head from 'next/head'
import Link from 'next/link'
import GoogleAnalytics from './component/GoogleAnalytics'

// require("../mongo/connect")
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SuperHandlers:  Rentals and Sales Forklift Solution in Brampton',
  description: 'Your go-to source for top-quality forklift rentals and second-hand forklifts. Serving Brampton toronto canada forklift models and excellent customer service.',
}


export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
  
  
    <head>

    <link rel="icon" href="/favicon.ico" />
    <meta name="msvalidate.01" content="BB71A4F1A9AFEBDB310A8D74CE88827D" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
    <meta name="msapplication-TileImage" content="/android-chrome-512x512.png"/>


    </head>
      <body className={inter.className}>
      <Navbar/>
      <SessionProvider session={session}>
      <div style={{minHeight:"500px"}} >
        {children}
        </div>
        </SessionProvider>
        <GoogleAnalytics/>
        </body>
        <Footter/>
    </html>
    
  )
}
