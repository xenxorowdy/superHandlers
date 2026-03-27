import Link from 'next/link'

const SITE_URL = 'https://www.superhandlerslift.com'
const PHONE = '+16475730160'
const PHONE_DISPLAY = '647-573-0160'

export const metadata = {
  title: 'Forklift Services — Repair, Maintenance, Sales & Rentals | Super Handlers',
  description: 'Full-service forklift company in Brampton & GTA. Emergency repair, planned maintenance, new & used forklift sales, short & long-term rentals. All major brands. Call 647-573-0160.',
  keywords: [
    'forklift repair service Brampton', 'forklift maintenance GTA', 'forklift sales Ontario',
    'forklift rental service', 'mobile forklift repair', '24/7 forklift service',
    'planned forklift maintenance', 'forklift parts Brampton', 'OEM forklift parts Ontario',
    'forklift inspection Ontario', 'forklift certification Ontario',
  ],
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: 'Forklift Services in Brampton & GTA | Super Handlers',
    description: 'Emergency repair, maintenance, sales & rentals. All major brands. 24/7 service across the GTA.',
    url: `${SITE_URL}/services`,
    images: [{ url: '/android-chrome-512x512.png', width: 512, height: 512 }],
  },
  twitter: { card: 'summary_large_image' },
}

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Super Handlers Forklift Services',
  url: `${SITE_URL}/services`,
  itemListElement: [
    {
      '@type': 'ListItem', position: 1,
      item: {
        '@type': 'Service',
        name: '24/7 Emergency Forklift Repair',
        serviceType: 'Emergency Forklift Repair',
        description: 'On-site mobile forklift repairs available 24 hours a day, 7 days a week across Brampton and the GTA.',
        provider: { '@type': 'LocalBusiness', name: 'Super Handlers', telephone: '+1-647-573-0160' },
        areaServed: [{ '@type': 'City', name: 'Brampton' }, { '@type': 'City', name: 'Toronto' }],
        offers: { '@type': 'Offer', priceCurrency: 'CAD', availability: 'https://schema.org/InStock' },
      },
    },
    {
      '@type': 'ListItem', position: 2,
      item: {
        '@type': 'Service',
        name: 'Planned Forklift Maintenance',
        serviceType: 'Preventative Maintenance',
        description: 'Scheduled preventative maintenance programs to maximize uptime and extend forklift lifespan.',
        provider: { '@type': 'LocalBusiness', name: 'Super Handlers' },
      },
    },
    {
      '@type': 'ListItem', position: 3,
      item: {
        '@type': 'Service',
        name: 'Forklift Sales — New & Pre-Owned',
        serviceType: 'Forklift Sales',
        description: 'New and certified pre-owned forklifts from all major brands. Toyota, Hyster, Yale, Crown, Raymond, and more.',
        provider: { '@type': 'LocalBusiness', name: 'Super Handlers' },
      },
    },
    {
      '@type': 'ListItem', position: 4,
      item: {
        '@type': 'Service',
        name: 'Forklift Rentals',
        serviceType: 'Forklift Rental',
        description: 'Short-term and long-term forklift rentals. Flexible monthly rates, fully maintained fleet.',
        provider: { '@type': 'LocalBusiness', name: 'Super Handlers' },
      },
    },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly can Super Handlers respond to a forklift breakdown in Brampton?',
      acceptedAnswer: { '@type': 'Answer', text: 'We offer same-day mobile response for emergency forklift repairs in Brampton and the GTA. Our 24/7 emergency line is +1-647-573-0160.' },
    },
    {
      '@type': 'Question',
      name: 'What is included in a planned forklift maintenance program?',
      acceptedAnswer: { '@type': 'Answer', text: 'Our maintenance programs include fluid checks and changes, brake inspections, mast and chain lubrication, tire inspection, battery checks (electric forklifts), safety certification, and a full inspection report.' },
    },
    {
      '@type': 'Question',
      name: 'Does Super Handlers sell genuine OEM forklift parts?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. We stock and supply genuine OEM parts for all major forklift brands including Toyota, Hyster, Yale, Crown, and Raymond. Same-day parts availability on most common items.' },
    },
  ],
}

const SERVICES = [
  {
    slug: 'emergency-repair',
    icon: '🔧',
    title: '24/7 Emergency Forklift Repair',
    subtitle: 'Mobile · Same-Day · All Brands',
    desc: 'Forklift breakdown? Our certified technicians dispatch to your location across Brampton, Mississauga, Toronto, and the GTA — day or night, weekends included. No breakdown is too big.',
    bullets: [
      'On-site mobile repair across the GTA',
      'Response within hours, not days',
      'All brands: Toyota, Hyster, Yale, Crown & more',
      'Electric, propane & diesel forklifts',
      'Genuine OEM & aftermarket parts in stock',
    ],
  },
  {
    slug: 'planned-maintenance',
    icon: '⚙️',
    title: 'Planned Forklift Maintenance',
    subtitle: 'Preventative · Scheduled · Documented',
    desc: 'Keep your fleet running at peak efficiency with our preventative maintenance programs. Reduce unexpected downtime, extend equipment life, and stay compliant with Ontario safety regulations.',
    bullets: [
      'Customized maintenance schedules',
      'Full inspection & safety certification',
      'Fluid changes, brake & tire checks',
      'Mast, chain & battery servicing',
      'Detailed inspection reports provided',
    ],
  },
  {
    slug: 'forklift-sales',
    icon: '🏭',
    title: 'Forklift Sales — New & Pre-Owned',
    subtitle: 'New · Certified Pre-Owned · All Brands',
    desc: 'Browse new and certified pre-owned forklifts from all major manufacturers. Every pre-owned unit is inspected by our technicians. Flexible financing available.',
    bullets: [
      'New forklifts from all major brands',
      'Certified pre-owned with inspection report',
      'Toyota, Hyster, Yale, Crown, Raymond & more',
      'Electric, IC, reach trucks & warehouse equipment',
      'Trade-ins welcome',
    ],
    cta: { label: 'Browse Inventory', href: '/shop' },
  },
  {
    slug: 'forklift-rentals',
    icon: '📦',
    title: 'Forklift Rentals',
    subtitle: 'Short-Term · Long-Term · Flexible',
    desc: 'Short-term or long-term forklift rentals at competitive monthly rates. Fully maintained fleet — we handle all service so you can focus on your operation.',
    bullets: [
      'Daily, weekly & monthly rental options',
      'All maintenance included',
      'Electric & IC engine units available',
      'Delivery across Brampton & GTA',
      'No long-term commitment required',
    ],
    cta: { label: 'View Rentals', href: '/shop/rental-forklifts' },
  },
  {
    slug: 'parts',
    icon: '🔩',
    title: 'Forklift Parts & Components',
    subtitle: 'OEM · Aftermarket · Fast Sourcing',
    desc: 'We supply genuine OEM and quality aftermarket parts for all major forklift brands. Same-day availability on most common items. We can source hard-to-find parts fast.',
    bullets: [
      'Genuine OEM parts for all brands',
      'High-quality aftermarket alternatives',
      'Batteries, chargers & electrical components',
      'Mast chains, rollers & seals',
      'Tyres: cushion, pneumatic & foam-filled',
    ],
  },
  {
    slug: 'inspection-certification',
    icon: '✅',
    title: 'Forklift Inspection & Certification',
    subtitle: 'Ontario-Compliant · Documented · Fast',
    desc: 'Mandatory Ontario forklift safety inspections performed by certified technicians. We provide full documentation for your compliance records.',
    bullets: [
      'Ontario OHSA-compliant inspections',
      'Annual & pre-use inspection programs',
      'Written inspection reports',
      'Load-test certification available',
      'Fast turnaround — often same day',
    ],
  },
]

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen pt-[120px] pb-24 bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="container mx-auto px-6">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-400 flex items-center gap-2">
          <Link href="/" className="hover:text-[#5ba3b5] transition-colors">Home</Link>
          <span aria-hidden>/</span>
          <span className="text-slate-600 font-medium">Services</span>
        </nav>

        {/* Header */}
        <header className="mb-16 text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-[#5ba3b5]/10 text-[#5ba3b5] text-[10px] font-black tracking-[0.2em] uppercase mb-6 border border-[#5ba3b5]/20">
            What We Do
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Forklift Services in Brampton &amp; the GTA
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto mb-8">
            Full-service forklift company — from emergency breakdown repair to planned maintenance, equipment sales, and flexible rentals. All major brands. 24/7 availability.
          </p>
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#5ba3b5] hover:bg-[#4a92a4] transition-colors shadow-md shadow-[#5ba3b5]/25"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
              <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
            </svg>
            Call {PHONE_DISPLAY}
          </a>
        </header>

        {/* Services Grid */}
        <section aria-label="All services" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {SERVICES.map((svc) => (
            <article key={svc.slug} className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-8 flex flex-col hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4" aria-hidden>{svc.icon}</div>
              <p className="text-[10px] font-bold text-[#5ba3b5] uppercase tracking-[0.15em] mb-2">{svc.subtitle}</p>
              <h2 className="text-xl font-black text-slate-900 mb-3 leading-tight">{svc.title}</h2>
              <p className="text-slate-500 text-sm leading-6 mb-5">{svc.desc}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {svc.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-[#5ba3b5] mt-0.5 shrink-0">›</span>
                    {b}
                  </li>
                ))}
              </ul>
              {svc.cta ? (
                <Link href={svc.cta.href} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#5ba3b5] hover:bg-[#4a92a4] transition-colors mt-auto">
                  {svc.cta.label} →
                </Link>
              ) : (
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors mt-auto">
                  Get a Quote →
                </Link>
              )}
            </article>
          ))}
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-[32px] border border-slate-200 p-10 md:p-14 mb-12">
          <h2 className="text-2xl font-black text-slate-900 mb-8">Frequently Asked Questions</h2>
          <dl className="space-y-6">
            {faqSchema.mainEntity.map((q, i) => (
              <div key={i} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                <dt className="font-bold text-slate-900 mb-2">{q.name}</dt>
                <dd className="text-slate-500 leading-7 text-[15px]">{q.acceptedAnswer.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-3">Ready to Get Started?</h2>
          <p className="text-slate-500 mb-6">Call us or request a free quote — we respond within 2 hours on business days.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#5ba3b5] hover:bg-[#4a92a4] transition-colors shadow-md shadow-[#5ba3b5]/25">
              Call {PHONE_DISPLAY}
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
              Request a Quote
            </Link>
          </div>
        </section>

      </div>
    </main>
  )
}
