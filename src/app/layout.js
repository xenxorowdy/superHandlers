
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './component/Navbar'
import { Suspense } from 'react'
import Footter from './component/footter'
// require("../mongo/connect")
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SuperHandlers',
  description: 'Created by Riyam Jain (riyam.jain.3@gmail.com)',

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
<head>
<link rel="icon" href="/superlogo.webp" />

  </head>      

      <body className={inter.className}>

      <Navbar/>
      <div style={{minHeight:"500px"}} >
        {children}
        </div>
        </body>
        <Footter/>
    </html>
    
  )
}
