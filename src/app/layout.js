import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'
import GoogleAnalytics from './component/GoogleAnalytics'
import Navbar from './component/Navbar'
import SessionProvider from "./component/SessionProvider.jsx"
import Footter from './component/footter'
import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next';
import TrackerProvider from './component/openTracker'
import TrackerClientComponent from './component/trackerstart.jsx'

// require("../mongo/connect")
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Super Handlers: Brampton & Toronto's Premier Forklift Repair and Maintenance Experts.",
  description: `Welcome to Precision Forklift Services, your go-to destination for exceptional forklift care in Brampton and Toronto. Our seasoned technicians are dedicated to providing top-tier repairs and maintenance services tailored to the unique demands of your business. Whether it's routine upkeep, urgent repairs, or a customized service plan, trust us to keep your forklifts operating at peak performance.
  At Precision Forklift Services, we understand that downtime is not an option for your operations. That's why we deliver swift and effective solutions, ensuring your equipment remains reliable and efficient. With a wealth of experience, we take pride in offering dependable and cost-effective forklift services designed to enhance the longevity and functionality of your machinery.
  As your local industry leaders, we prioritize customer satisfaction and quality service. Serving businesses across Brampton and Toronto, we bring a professional and responsive approach to forklift care. Elevate the performance of your material handling operations with Precision Forklift Services. Contact us today for all your forklift service needs, and experience the difference of precision and expertise.
  `,
}


export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">


      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "Organization",
              "name": "Super Handlers",
              "url": "https://www.superhandlerslift.com",
              "logo": "https://www.superhandlerslift.com/android-chrome-512x512.png",
            }),
          }}
        />
        <link rel="icon" type="image/ico" href="/favicon.ico?v=2" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />


      </head>

      <TrackerProvider>
        <TrackerClientComponent>
          <body className={inter.className}>
            <Navbar />
            <SessionProvider session={session}>
              <div style={{ minHeight: "500px" }} >
                {children}
                <SpeedInsights />
              </div>
            </SessionProvider>
            <GoogleAnalytics />
          </body>
          <Footter />
        </TrackerClientComponent>
      </TrackerProvider>
    </html>

  )
}
