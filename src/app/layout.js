
import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'
import GoogleAnalytics from './component/GoogleAnalytics'
import Navbar from './component/Navbar'
import SessionProvider from "./component/SessionProvider.jsx"
import Footter from './component/footter'
import './globals.css'

// require("../mongo/connect")
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Super Handlers Forklifts Solution in Brampton',
  description: 'Your go-to source for top-quality rentals and sales and second-hand forklifts. Serving Brampton toronto canada forklift models and excellent customer service.',
}


export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
  
  
    <head>

    <link rel="icon" type="image/ico" href="/favicon.ico?v=2" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>


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
