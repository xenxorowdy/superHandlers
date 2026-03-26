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

const inter = Inter({ subsets: ['latin'] })

const SITE_URL = 'https://www.superhandlerslift.com'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Super Handlers — Forklift Repair, Sales & Rentals in Brampton',
    template: '%s | Super Handlers',
  },
  description: 'Expert forklift repair, sales & rentals in Brampton & the GTA. 24/7 emergency service. Toyota, Hyster, Yale, Crown & more. Call 647-573-0160.',
  keywords: ['forklift repair Brampton', 'forklift rental GTA', 'forklift sales Toronto', 'forklift maintenance', 'used forklift', 'forklift service 24/7', 'warehouse equipment Brampton', 'Super Handlers'],
  authors: [{ name: 'Super Handlers' }],
  creator: 'Super Handlers',
  publisher: 'Super Handlers',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: SITE_URL,
    siteName: 'Super Handlers',
    title: 'Super Handlers — Forklift Repair, Sales & Rentals in Brampton',
    description: 'Expert forklift repair, sales & rentals in Brampton & the GTA. 24/7 service, all major brands. Call 647-573-0160.',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'Super Handlers Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Super Handlers — Forklift Repair & Sales in Brampton & GTA',
    description: 'Expert forklift repair, sales & rentals across the Greater Toronto Area. 24/7 service.',
    images: ['/android-chrome-512x512.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {},
}

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: 'Super Handlers',
  alternateName: 'Super Handlers Lift',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/android-chrome-512x512.png`,
  description: 'Premier forklift maintenance, repairs, sales and rentals serving Brampton, Toronto and the Greater Toronto Area.',
  telephone: '+1-647-573-0160',
  email: 'superhandlers1@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '11 Holland Dr, Unit 9',
    addressLocality: 'Bolton',
    addressRegion: 'ON',
    postalCode: 'L7E 1G7',
    addressCountry: 'CA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.7315,
    longitude: -79.7624,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '14:00',
    },
  ],
  priceRange: '$$',
  areaServed: [
    { '@type': 'City', name: 'Brampton' },
    { '@type': 'City', name: 'Toronto' },
    { '@type': 'City', name: 'Mississauga' },
    { '@type': 'City', name: 'Vaughan' },
    { '@type': 'City', name: 'Etobicoke' },
  ],
  sameAs: [],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Forklift Services',
    itemListElement: [
      { '@type': 'OfferCatalog', name: 'Forklift Repair & Maintenance' },
      { '@type': 'OfferCatalog', name: 'Forklift Sales — New & Pre-Owned' },
      { '@type': 'OfferCatalog', name: 'Forklift Rentals' },
      { '@type': 'OfferCatalog', name: '24/7 Emergency Service' },
    ],
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Super Handlers',
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#business` },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/shop?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en-CA">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM site summary" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLM full site info" />
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
            <Footter />
            <GoogleAnalytics />
          </body>
        </TrackerClientComponent>
      </TrackerProvider>
    </html>
  )
}
