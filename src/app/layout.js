
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './component/Navbar'
import { Suspense } from 'react'
import SessionProvider from "./component/SessionProvider.jsx"
import Footter from './component/footter'
import { getServerSession } from 'next-auth'
// require("../mongo/connect")
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SuperHandlers',
  description: 'Created by Riyam Jain (riyam.jain.3@gmail.com)',

}

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
<head>
<link rel="icon" href="/superlogo.webp" />

  </head>      

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
