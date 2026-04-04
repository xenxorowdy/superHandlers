import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BrandsEffect from './component/BrandsEffect'
import ScrollReveal, { ScrollRevealGroup } from './component/ScrollReveal'
import StatsCounter from './component/CountUp'
import { FaWrench, FaCogs, FaTools, FaCheckCircle, FaStar, FaShieldAlt, FaArrowRight, FaPhoneAlt } from 'react-icons/fa'

export const metadata = {
  title: 'Forklift Repair, Sales & Rentals in Brampton & the GTA',
  description: 'Expert forklift repair, sales & rentals in Brampton & the GTA. 24/7 emergency service, all major brands. Call 647-573-0160.',
  keywords: [
    'forklift repair Brampton', 'forklift repair GTA', 'forklift for sale Brampton',
    'forklift rental Brampton', 'forklift maintenance Ontario', '24/7 forklift repair',
    'Toyota forklift Brampton', 'Hyster forklift GTA', 'warehouse forklift service',
    'mobile forklift repair', 'emergency forklift repair', 'forklift dealer Brampton',
  ],
  openGraph: {
    title: 'Super Handlers — Forklift Repair, Sales & Rentals in Brampton',
    description: 'Expert forklift repair, sales & rentals across the Greater Toronto Area. 24/7 service, all major brands.',
    url: 'https://www.superhandlerslift.com',
    images: [{ url: '/android-chrome-512x512.png', width: 512, height: 512, alt: 'Super Handlers' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Super Handlers — Forklift Repair, Sales & Rentals in Brampton',
    description: 'Expert forklift repair, sales & rentals across the Greater Toronto Area. 24/7 service, all major brands.',
  },
  alternates: {
    canonical: 'https://www.superhandlerslift.com',
  },
}

const SITE_URL = 'https://www.superhandlerslift.com'

const homeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Super Handlers offer 24/7 emergency forklift repair in Brampton?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Super Handlers provides 24/7 emergency mobile forklift repair across Brampton, Mississauga, Toronto, Vaughan, and the Greater Toronto Area. Call us any time at +1-647-573-0160.',
      },
    },
    {
      '@type': 'Question',
      name: 'What forklift brands does Super Handlers service and sell?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We service and sell all major forklift brands including Toyota, Hyster, Yale, Crown, Raymond, Nissan, Clark, Caterpillar, Linde, and Jungheinrich. We carry genuine OEM parts for all brands.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I rent a forklift from Super Handlers in Brampton?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We offer short-term and long-term forklift rentals. Our rental fleet includes electric, propane, and diesel forklifts from all major brands. Contact us or browse our rental inventory online.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Super Handlers located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Super Handlers is located at 11 Holland Dr, Unit 9, Bolton, ON L7E 1G7. We serve Brampton, Mississauga, Toronto, Vaughan, Etobicoke, and the full Greater Toronto Area.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Super Handlers sell used or pre-owned forklifts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We carry certified pre-owned forklifts that are inspected and tested by our certified technicians. All pre-owned units come with a condition report and competitive pricing.',
      },
    },
  ],
}

const homeServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Forklift Repair & Maintenance',
  provider: { '@type': 'LocalBusiness', name: 'Super Handlers', url: SITE_URL },
  areaServed: [
    { '@type': 'City', name: 'Brampton' },
    { '@type': 'City', name: 'Toronto' },
    { '@type': 'City', name: 'Mississauga' },
    { '@type': 'City', name: 'Vaughan' },
  ],
  description: 'Professional forklift repair, maintenance, sales and rental services across Brampton and the Greater Toronto Area.',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'CAD',
    seller: { '@type': 'Organization', name: 'Super Handlers' },
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: 'CA',
      returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
      merchantReturnDays: 0,
    },
  },
}

export default function Home() {
  const services = [
    { title: 'Emergency Repair', description: 'On-site mobile forklift repairs available 24/7 in Brampton & Toronto.', icon: <FaWrench />, href: '/contact' },
    { title: 'Planned Maintenance', description: 'Preventative programs to keep your fleet running at peak efficiency.', icon: <FaCogs />, href: '/contact' },
    { title: 'Parts & Sales', description: 'Genuine OEM parts and new, pre-owned & rental forklifts for all major brands.', icon: <FaTools />, href: '/shop' },
  ]

  return (
    <main className="min-h-screen relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeServiceSchema) }} />
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="/wp7388677-forklift-wallpapers.jpg"
          fill
          sizes="100vw"
          className="object-cover"
          alt="Forklift warehouse operations at Super Handlers, Brampton Ontario"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2335]/95 via-[#1a2335]/80 to-[#1a2335]/40" />

        <div className="container mx-auto px-6 relative z-10 py-32">
          <div className="max-w-3xl">
            <ScrollReveal animation="fade-up" duration={800}>
              <span className="inline-block py-1.5 px-5 rounded-full bg-[#5ba3b5]/20 text-[#7ab8c7] text-xs font-black tracking-[0.2em] uppercase mb-8 border border-[#5ba3b5]/30 backdrop-blur-sm">
                Brampton &amp; GTA&apos;s Trusted Forklift Experts
              </span>
            </ScrollReveal>

            {/* H1 rendered outside ScrollReveal so crawlers always see it */}
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[0.95] text-white">
              Forklift Repair, Sales &amp; Rentals in <span className="text-[#7ab8c7]">Brampton &amp; the GTA</span>
            </h1>

            <ScrollReveal animation="fade-up" delay={200} duration={900}>
              <p className="text-lg md:text-xl text-slate-300 max-w-xl mb-10 font-medium leading-relaxed">
                Super Handlers provides premium forklift maintenance, parts, and expert repair services across Brampton and the Greater Toronto Area. 24/7 emergency service — we keep your business moving.
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={350}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-[#5ba3b5] hover:bg-[#7ab8c7] transition-all duration-300 shadow-lg shadow-[#5ba3b5]/25 active:scale-95">
                  Browse Inventory <FaArrowRight size={12} />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all duration-300 backdrop-blur-sm">
                  Get a Free Quote
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter />

      {/* Services */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <span className="inline-block py-1 px-4 rounded-full bg-[#5ba3b5]/10 text-[#5ba3b5] text-xs font-black tracking-[0.2em] uppercase mb-5 border border-[#5ba3b5]/20">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Forklift Services in Brampton &amp; Toronto</h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">From emergency repairs to planned maintenance and equipment sales — we handle everything forklift.</p>
          </ScrollReveal>

          <ScrollRevealGroup animation="fade-up" stagger={150} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link href={service.href} key={index} className="glass-card p-10 rounded-[24px] group block">
                <div className="w-16 h-16 bg-gradient-to-br from-[#5ba3b5] to-[#7ab8c7] text-white rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#5ba3b5]/20">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 leading-tight">{service.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-6">{service.description}</p>
                <span className="text-[#5ba3b5] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More <FaArrowRight size={11} />
                </span>
              </Link>
            ))}
          </ScrollRevealGroup>
        </div>
      </section>

      {/* Brands */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fade-in">
            <div className="text-center mb-12">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Brands We Service &amp; Sell</h2>
            </div>
            <BrandsEffect />
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <ScrollReveal animation="fade-right" className="flex-1">
              <span className="inline-block py-1 px-4 rounded-full bg-[#5ba3b5]/10 text-[#5ba3b5] text-xs font-black tracking-[0.2em] uppercase mb-6 border border-[#5ba3b5]/20">
                Why Choose Super Handlers
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-8 leading-tight">Expert Forklift Service You Can Count On</h2>
              <div className="space-y-6">
                {[
                  { text: 'Certified expert technicians with decades of forklift repair experience.', icon: <FaShieldAlt /> },
                  { text: 'Fast response times and same-day mobile repairs across the GTA.', icon: <FaCheckCircle /> },
                  { text: 'Competitive pricing with transparent, upfront estimates.', icon: <FaStar /> },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="mt-1 text-[#5ba3b5] text-xl shrink-0">{item.icon}</div>
                    <p className="text-lg text-slate-600 font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-[#5ba3b5] hover:bg-[#7ab8c7] transition-all duration-300 shadow-lg shadow-[#5ba3b5]/20 active:scale-95 mt-12">
                Schedule Appointment <FaArrowRight size={12} />
              </Link>
            </ScrollReveal>
            <ScrollReveal animation="fade-left" delay={200} className="flex-1 w-full">
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl shadow-slate-300/50 aspect-[4/5] max-w-lg mx-auto">
                <Image
                  src="/homescreen.jpg"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  alt="Super Handlers certified forklift technician performing maintenance"
                  loading="lazy"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2335]/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="glass-strong rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#5ba3b5] rounded-xl flex items-center justify-center shrink-0">
                      <FaShieldAlt className="text-white text-lg" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-sm">Certified Technicians</p>
                      <p className="text-xs text-slate-500">Licensed &amp; fully insured</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Internal Links / Quick Navigation */}
      <section className="py-20 px-6 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">Explore Super Handlers</h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">Everything you need for your forklift equipment — from buying and renting to repairs and parts.</p>
          </ScrollReveal>

          <ScrollRevealGroup animation="fade-up" stagger={100} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/shop" className="glass-card p-8 rounded-[20px] group block text-center hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-[#5ba3b5]/10 text-[#5ba3b5] rounded-2xl flex items-center justify-center text-2xl mb-5 mx-auto group-hover:bg-[#5ba3b5] group-hover:text-white transition-all duration-300">
                <FaTools />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Shop Inventory</h3>
              <p className="text-sm text-slate-500 mb-4">Browse new, pre-owned &amp; rental forklifts from all major brands.</p>
              <span className="text-[#5ba3b5] font-bold text-sm flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                View Equipment <FaArrowRight size={10} />
              </span>
            </Link>

            <Link href="/about" className="glass-card p-8 rounded-[20px] group block text-center hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-[#5ba3b5]/10 text-[#5ba3b5] rounded-2xl flex items-center justify-center text-2xl mb-5 mx-auto group-hover:bg-[#5ba3b5] group-hover:text-white transition-all duration-300">
                <FaShieldAlt />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">About Us</h3>
              <p className="text-sm text-slate-500 mb-4">Learn about our team, our mission, and 15+ years of industry expertise.</p>
              <span className="text-[#5ba3b5] font-bold text-sm flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                Our Story <FaArrowRight size={10} />
              </span>
            </Link>

            <Link href="/contact" className="glass-card p-8 rounded-[20px] group block text-center hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-[#5ba3b5]/10 text-[#5ba3b5] rounded-2xl flex items-center justify-center text-2xl mb-5 mx-auto group-hover:bg-[#5ba3b5] group-hover:text-white transition-all duration-300">
                <FaPhoneAlt />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Contact &amp; Quotes</h3>
              <p className="text-sm text-slate-500 mb-4">Request a free quote, schedule service, or reach us for any inquiries.</p>
              <span className="text-[#5ba3b5] font-bold text-sm flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                Get in Touch <FaArrowRight size={10} />
              </span>
            </Link>

            <a href="tel:+6475730160" className="glass-card p-8 rounded-[20px] group block text-center hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-[#5ba3b5]/10 text-[#5ba3b5] rounded-2xl flex items-center justify-center text-2xl mb-5 mx-auto group-hover:bg-[#5ba3b5] group-hover:text-white transition-all duration-300">
                <FaWrench />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">24/7 Emergency</h3>
              <p className="text-sm text-slate-500 mb-4">Forklift breakdown? Our emergency team is available around the clock.</p>
              <span className="text-[#5ba3b5] font-bold text-sm flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                Call 647-573-0160 <FaArrowRight size={10} />
              </span>
            </a>
          </ScrollRevealGroup>
        </div>
      </section>
    </main>
  )
}
