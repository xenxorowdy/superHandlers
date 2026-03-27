import Link from 'next/link'

const SITE_URL = 'https://www.superhandlerslift.com'
const PHONE = '+16475730160'
const PHONE_DISPLAY = '647-573-0160'

export const metadata = {
  title: 'Service Areas — Forklift Repair & Rentals Across the GTA | Super Handlers',
  description: 'Super Handlers provides forklift repair, maintenance, sales & rentals across Brampton, Toronto, Mississauga, Vaughan, Etobicoke & the Greater Toronto Area. Call 647-573-0160.',
  keywords: [
    'forklift service GTA', 'forklift repair near me', 'forklift service Ontario',
    'forklift company Greater Toronto Area', 'forklift dealer near Brampton',
  ],
  alternates: { canonical: `${SITE_URL}/service-areas` },
  openGraph: {
    title: 'Forklift Service Areas — GTA | Super Handlers',
    description: 'We serve Brampton, Toronto, Mississauga, Vaughan & the full GTA. Forklift repair, sales & rentals.',
    url: `${SITE_URL}/service-areas`,
  },
}

const CITIES = [
  { name: 'Brampton', slug: 'brampton', desc: 'Forklift repair, sales & rentals in Brampton ON.' },
  { name: 'Toronto', slug: 'toronto', desc: 'Mobile forklift repair & equipment across Toronto.' },
  { name: 'Mississauga', slug: 'mississauga', desc: 'Forklift service, rentals & sales in Mississauga.' },
  { name: 'Vaughan', slug: 'vaughan', desc: 'Forklift maintenance, sales & rentals in Vaughan.' },
]

export default function ServiceAreasPage() {
  return (
    <main className="relative min-h-screen pt-[120px] pb-24 bg-slate-50">
      <div className="container mx-auto px-6">

        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-400 flex items-center gap-2">
          <Link href="/" className="hover:text-[#5ba3b5] transition-colors">Home</Link>
          <span aria-hidden>/</span>
          <span className="text-slate-600 font-medium">Service Areas</span>
        </nav>

        <header className="mb-14 text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-[#5ba3b5]/10 text-[#5ba3b5] text-[10px] font-black tracking-[0.2em] uppercase mb-6 border border-[#5ba3b5]/20">
            Where We Work
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Forklift Service Across the Greater Toronto Area
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Super Handlers operates throughout Brampton, Mississauga, Toronto, Vaughan, Bolton, Etobicoke, and all surrounding communities in Ontario.
          </p>
        </header>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {CITIES.map((city) => (
            <li key={city.slug}>
              <Link
                href={`/service-areas/${city.slug}`}
                className="block bg-white rounded-[20px] border border-slate-200 shadow-sm p-8 text-center hover:shadow-md hover:border-[#5ba3b5]/40 transition-all group"
              >
                <h2 className="text-xl font-black text-slate-900 mb-2 group-hover:text-[#5ba3b5] transition-colors">{city.name}</h2>
                <p className="text-sm text-slate-500 mb-4">{city.desc}</p>
                <span className="text-sm font-bold text-[#5ba3b5]">View →</span>
              </Link>
            </li>
          ))}
        </ul>

        <section className="bg-white rounded-[32px] border border-slate-200 p-10 md:p-14 text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-3">Don&apos;t See Your City?</h2>
          <p className="text-slate-500 mb-6 max-w-xl mx-auto">
            We cover all of Southern Ontario. If you&apos;re not sure we serve your area, give us a call — we probably do.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#5ba3b5] hover:bg-[#4a92a4] transition-colors">
              Call {PHONE_DISPLAY}
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
              Send a Message
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
