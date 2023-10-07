
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './component/Navbar'
import SessionProvider from "./component/SessionProvider.jsx"
import Footter from './component/footter'
import { getServerSession } from 'next-auth'
import Script from 'next/script'
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
  
<link rel="icon" href="/superlogo.webp" />

  </head>      
  <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />

      <Script id="google-analytics-script" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
          page_path: window.location.pathname,
          });
    `}
      </Script>
      <body className={inter.className}>
      <Navbar/>
      <SessionProvider session={session}>
      <div style={{minHeight:"500px"}} >
        {children}
        </div>
        </SessionProvider>
        </body>
        <Footter/>
    </html>
    
  )
}
