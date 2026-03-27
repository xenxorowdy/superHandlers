import Link from 'next/link'

const SITE_URL = 'https://www.superhandlerslift.com'
const PHONE = '+16475730160'
const PHONE_DISPLAY = '647-573-0160'
const CITY = 'Mississauga'
const CANONICAL = `${SITE_URL}/service-areas/mississauga`

export const metadata = {
  title: 'Forklift Repair & Rentals in Mississauga, ON | Super Handlers',
  description: 'Expert forklift repair, maintenance, sales & rentals in Mississauga, Ontario. 24/7 emergency mobile service. All major brands. Call 647-573-0160.',
  keywords: [
    'forklift repair Mississauga', 'forklift rental Mississauga', 'forklift service Mississauga Ontario',
    '24/7 forklift repair Mississauga', 'mobile forklift repair Mississauga',
    'Toyota forklift Mississauga', 'forklift dealer Mississauga', 'warehouse forklift Mississauga',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Forklift Repair & Rentals in Mississauga | Super Handlers',
    description: '24/7 forklift repair, maintenance, sales & rentals in Mississauga ON. All major brands. Call 647-573-0160.',
    url: CANONICAL,
  },
  twitter: { card: 'summary_large_image' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Super Handlers service forklifts in Mississauga?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Super Handlers dispatches mobile forklift technicians across Mississauga 24/7. We service all industrial and warehouse areas including Airport Road, Dixie, Hurontario, and Meadowvale.' },
    },
    {
      '@type': 'Question',
      name: 'Can I rent a forklift in Mississauga short-term?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. We offer daily, weekly, and monthly forklift rentals with delivery to Mississauga. Our rental fleet includes electric and IC engine forklifts from all major brands.' },
    },
    {
      '@type': 'Question',
      name: 'How fast can Super Handlers respond to a forklift breakdown in Mississauga?',
      acceptedAnswer: { '@type': 'Answer', text: 'For emergency breakdowns in Mississauga, we aim to dispatch within 2 hours. Call our 24/7 line at +1-647-573-0160 for immediate assistance.' },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${SITE_URL}/service-areas` },
    { '@type': 'ListItem', position: 3, name: CITY, item: CANONICAL },
  ],
}

export default function MississaugaPage() {
  return (
    <main className="relative min-h-screen pt-[120px] pb-24 bg-slate-50">
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
            Expert forklift services for Mississauga&apos;s warehouses, industrial parks, and distribution centres. Available 24/7 for emergency repairs and routine maintenance.
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

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            { title: '24/7 Emergency Repair', desc: 'Immediate mobile forklift repair response to any Mississauga industrial area.' },
            { title: 'Planned Maintenance', desc: 'Maintenance programs designed for Mississauga distribution and manufacturing operations.' },
            { title: 'Forklift Sales', desc: 'New & certified pre-owned forklifts delivered to Mississauga businesses.' },
            { title: 'Forklift Rentals', desc: 'Flexible rentals for Mississauga warehouses — electric, propane, diesel.' },
            { title: 'Parts Supply', desc: 'Genuine OEM and aftermarket parts. Fast sourcing for all brands.' },
            { title: 'Safety Certifications', desc: 'Ontario OHSA-compliant inspections and annual certification programs.' },
          ].map((svc) => (
            <Link key={svc.title} href="/services" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md hover:border-[#5ba3b5]/30 transition-all group">
              <h2 className="font-black text-slate-900 mb-2 group-hover:text-[#5ba3b5] transition-colors">{svc.title}</h2>
              <p className="text-sm text-slate-500 leading-6">{svc.desc}</p>
            </Link>
          ))}
        </section>

        <section className="bg-white rounded-[32px] border border-slate-200 p-10 md:p-14 mb-12">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Forklift Experts Serving Mississauga</h2>
          <p className="text-slate-500 leading-7 mb-4">
            Mississauga is one of Ontario&apos;s largest industrial hubs, home to thousands of warehouses, logistics centres, and manufacturing facilities. Super Handlers has been a trusted forklift service partner for Mississauga businesses for over 15 years. We service all major industrial areas including Dixie Road, Hurontario, Airport Corporate Centre, Meadowvale Business Park, and Lakeshore.
          </p>
          <p className="text-slate-500 leading-7 mb-6">
            Our mobile repair trucks are stocked with OEM parts for Toyota, Hyster, Yale, Crown, and all other major brands, so your forklift gets repaired right the first time — minimizing costly downtime for your Mississauga operation.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#5ba3b5] hover:bg-[#4a92a4] transition-colors">Call {PHONE_DISPLAY}</a>
            <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Browse Inventory</Link>
          </div>
        </section>

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
