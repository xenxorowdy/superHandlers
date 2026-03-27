const SITE_URL = 'https://www.superhandlerslift.com'

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Super Handlers',
  url: `${SITE_URL}/about`,
  description: 'Super Handlers — over 15 years of certified forklift repair, sales and rental expertise across Brampton and the Greater Toronto Area.',
  mainEntity: {
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: 'Super Handlers',
    foundingDate: '2009',
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 5 },
    knowsAbout: [
      'Forklift Repair', 'Forklift Maintenance', 'Forklift Sales',
      'Forklift Rentals', 'Toyota Forklifts', 'Hyster Forklifts',
      'Yale Forklifts', 'Crown Forklifts', 'Electric Forklifts',
    ],
  },
}

export const metadata = {
  title: 'About Us — 15+ Years of Forklift Expertise in the GTA',
  description: 'Learn about Super Handlers — over 15 years of certified forklift repair, sales & rental expertise serving Brampton, Toronto & the GTA. Licensed, insured, local.',
  keywords: [
    'about Super Handlers', 'forklift company Brampton', 'forklift experts GTA',
    'certified forklift technicians Ontario', 'forklift dealer history',
  ],
  openGraph: {
    title: 'About Super Handlers — Forklift Experts Since 2009',
    description: 'Over 15 years of certified forklift service across the Greater Toronto Area. Licensed technicians, all major brands.',
    url: `${SITE_URL}/about`,
    images: [{ url: '/android-chrome-512x512.png', width: 512, height: 512, alt: 'Super Handlers' }],
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: `${SITE_URL}/about` },
}

export default function AboutLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      {children}
    </>
  )
}
