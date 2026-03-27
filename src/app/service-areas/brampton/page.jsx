import Link from 'next/link'

const SITE_URL = 'https://www.superhandlerslift.com'
const PHONE = '+16475730160'
const PHONE_DISPLAY = '647-573-0160'
const CITY = 'Brampton'
const CANONICAL = `${SITE_URL}/service-areas/brampton`

export const metadata = {
  title: 'Forklift Repair & Rentals in Brampton, ON | Super Handlers',
  description: 'Expert forklift repair, maintenance, sales & rentals in Brampton, Ontario. 24/7 emergency mobile service. Toyota, Hyster, Yale & all major brands. Call 647-573-0160.',
  keywords: [
    'forklift repair Brampton', 'forklift rental Brampton', 'forklift maintenance Brampton',
    'forklift service Brampton Ontario', '24/7 forklift repair Brampton',
    'mobile forklift repair Brampton', 'Toyota forklift Brampton', 'Hyster forklift Brampton',
    'forklift dealer Brampton', 'used forklift Brampton', 'forklift company Brampton',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Forklift Repair & Rentals in Brampton | Super Handlers',
    description: '24/7 forklift repair, maintenance, sales & rentals in Brampton ON. All major brands. Call 647-573-0160.',
    url: CANONICAL,
  },
  twitter: { card: 'summary_large_image' },
}

const localSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: 'Super Handlers',
  url: SITE_URL,
  telephone: '+1-647-573-0160',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '11 Holland Dr, Unit 9',
    addressLocality: 'Bolton',
    addressRegion: 'ON',
    postalCode: 'L7E 1G7',
    addressCountry: 'CA',
  },
  areaServed: { '@type': 'City', name: 'Brampton', '@id': 'https://www.wikidata.org/wiki/Q44157' },
  serviceType: ['Forklift Repair', 'Forklift Maintenance', 'Forklift Sales', 'Forklift Rental'],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is there a 24-hour forklift repair service in Brampton?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Super Handlers offers 24/7 emergency mobile forklift repair in Brampton. Call +1-647-573-0160 any time for emergency dispatch.' },
    },
    {
      '@type': 'Question',
      name: 'Can I rent a forklift in Brampton?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Super Handlers offers short-term and long-term forklift rentals in Brampton. Our rental fleet includes electric, propane, and diesel forklifts. Call 647-573-0160 or visit our rental listings online.' },
    },
    {
      '@type': 'Question',
      name: 'Where is Super Handlers located relative to Brampton?',
      acceptedAnswer: { '@type': 'Answer', text: 'Super Handlers is located at 11 Holland Dr, Unit 9, Bolton ON — just minutes north of Brampton. We dispatch mobile repair teams directly to your Brampton location.' },
    },
    {
      '@type': 'Question',
      name: 'What forklift brands does Super Handlers service in Brampton?',
      acceptedAnswer: { '@type': 'Answer', text: 'We service all major brands in Brampton including Toyota, Hyster, Yale, Crown, Raymond, Nissan, Clark, Caterpillar, Linde, and Jungheinrich.' },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${SITE_URL}/service-areas` },
    { '@type': 'ListItem', position: 3, name: 'Brampton', item: CANONICAL },
  ],
}

export default function BramptonPage() {
  return (
    <main className="relative min-h-screen pt-[120px] pb-24 bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="container mx-auto px-6">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-400 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#5ba3b5] transition-colors">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/service-areas" className="hover:text-[#5ba3b5] transition-colors">Service Areas</Link>
          <span aria-hidden>/</span>
          <span className="text-slate-600 font-medium">{CITY}</span>
        </nav>

        <header className="mb-14">
          <span className="inline-block py-1 px-4 rounded-full bg-[#5ba3b5]/10 text-[#5ba3b5] text-[10px] font-black tracking-[0.2em] uppercase mb-6 border border-[#5ba3b5]/20">
            Serving {CITY}
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Forklift Repair &amp; Rentals in {CITY}, Ontario
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mb-8">
            Super Handlers is Brampton&apos;s trusted forklift company. Expert repair, planned maintenance, new &amp; pre-owned sales, and flexible rentals — available 24/7.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#5ba3b5] hover:bg-[#4a92a4] transition-colors shadow-md shadow-[#5ba3b5]/25">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden><path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" /></svg>
              Call {PHONE_DISPLAY}
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
              Request a Quote
            </Link>
          </div>
        </header>

        {/* Services */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            { title: '24/7 Emergency Repair', desc: `Fast on-site mobile forklift repair anywhere in ${CITY}. We dispatch within hours.`, href: '/services' },
            { title: 'Planned Maintenance', desc: 'Scheduled maintenance programs to keep your Brampton fleet running safely and efficiently.', href: '/services' },
            { title: 'Forklift Sales', desc: 'New and certified pre-owned forklifts — all major brands, ready for Brampton delivery.', href: '/shop' },
            { title: 'Forklift Rentals', desc: `Short & long-term forklift rentals in ${CITY}. Fully maintained fleet at competitive rates.`, href: '/shop/rental-forklifts' },
            { title: 'Parts & Components', desc: 'Genuine OEM & aftermarket parts for all brands. Same-day availability on most items.', href: '/services' },
            { title: 'Safety Inspections', desc: 'Ontario-compliant forklift safety inspections and certification. Fast turnaround.', href: '/services' },
          ].map((svc) => (
            <Link key={svc.title} href={svc.href} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md hover:border-[#5ba3b5]/30 transition-all group">
              <h2 className="font-black text-slate-900 mb-2 group-hover:text-[#5ba3b5] transition-colors">{svc.title}</h2>
              <p className="text-sm text-slate-500 leading-6">{svc.desc}</p>
            </Link>
          ))}
        </section>

        {/* SEO body */}
        <section className="bg-white rounded-[32px] border border-slate-200 p-10 md:p-14 mb-12">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Your Local Forklift Experts in Brampton</h2>
          <p className="text-slate-500 leading-7 mb-4">
            Super Handlers has been serving businesses in Brampton, Ontario for over 15 years. Our certified technicians provide fast, reliable forklift repair and maintenance for warehouses, distribution centres, manufacturing plants, and construction sites across Brampton, from Bramalea to Castlemore, Mount Pleasant to Heart Lake.
          </p>
          <p className="text-slate-500 leading-7 mb-6">
            Whether you need a forklift repaired overnight, a new unit for your expanding warehouse, or a short-term rental for a busy season — Super Handlers has you covered. We stock genuine OEM parts for Toyota, Hyster, Yale, Crown, Raymond, and all other major brands, so repairs are completed right the first time.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#5ba3b5] hover:bg-[#4a92a4] transition-colors">Call {PHONE_DISPLAY}</a>
            <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Browse Inventory</Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-[32px] border border-slate-200 p-10 md:p-14">
          <h2 className="text-2xl font-black text-slate-900 mb-8">Forklift FAQs — {CITY}</h2>
          <dl className="space-y-6">
            {faqSchema.mainEntity.map((q, i) => (
              <div key={i} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                <dt className="font-bold text-slate-900 mb-2">{q.name}</dt>
                <dd className="text-slate-500 leading-7">{q.acceptedAnswer.text}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </main>
  )
}
