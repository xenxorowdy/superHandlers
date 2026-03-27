const SITE_URL = 'https://www.superhandlerslift.com'

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Super Handlers',
  url: `${SITE_URL}/contact`,
  description: 'Contact Super Handlers for forklift repair, sales & rentals in Brampton & the GTA. Call 647-573-0160 or request a free quote online.',
  mainEntity: {
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: 'Super Handlers',
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
    openingHours: 'Mo-Fr 08:00-18:00, Sa 09:00-14:00',
  },
}

const contactFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I contact Super Handlers for a forklift repair?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Call us at +1-647-573-0160 (available 24/7 for emergencies), email superhandlers1@gmail.com, or fill out the contact form on our website. We respond within 2 hours on business days.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Super Handlers offer free quotes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We provide free, no-obligation quotes for all forklift repair, maintenance, sales and rental inquiries. Contact us online or call 647-573-0160.',
      },
    },
    {
      '@type': 'Question',
      name: 'What areas does Super Handlers service?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We serve all of the Greater Toronto Area including Brampton, Mississauga, Toronto, Vaughan, Bolton, Etobicoke, North York, Scarborough, and surrounding communities in Ontario.',
      },
    },
  ],
}

export const metadata = {
  title: 'Contact Us — Free Forklift Service Quote | Super Handlers',
  description: 'Contact Super Handlers for forklift repair, sales & rentals in Brampton & the GTA. Call 647-573-0160 or request a free quote online. 24/7 emergency available.',
  keywords: [
    'contact Super Handlers', 'forklift repair quote Brampton', 'forklift service GTA',
    'forklift emergency contact', '647-573-0160', 'free forklift quote Ontario',
  ],
  openGraph: {
    title: 'Contact Super Handlers — Free Forklift Service Quote',
    description: 'Reach out for expert forklift repair, sales & rentals. 24/7 emergency support across the GTA.',
    url: `${SITE_URL}/contact`,
    images: [{ url: '/android-chrome-512x512.png', width: 512, height: 512, alt: 'Super Handlers' }],
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: `${SITE_URL}/contact` },
}

export default function ContactLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactFaqSchema) }}
      />
      {children}
    </>
  )
}
