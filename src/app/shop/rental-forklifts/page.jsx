import Image from 'next/image'
import Link from 'next/link'
import { getInventory } from '@/lib/inventory'
import { SITE_URL } from '@/lib/shopSeo'

export const dynamic = 'force-dynamic'

const CANONICAL = `${SITE_URL}/shop/rental-forklifts`

export const metadata = {
    title: 'Forklift Rentals — Brampton & GTA | Super Handlers',
    description: 'Short & long-term forklift rentals in Brampton, Mississauga, Toronto & the GTA. Flexible monthly rates, all major brands, fully maintained fleet.',
    keywords: [
        'forklift rental Brampton',
        'forklift rental Toronto',
        'forklift rental GTA',
        'forklift rental Ontario',
        'short term forklift rental',
        'long term forklift rental',
        'monthly forklift rental',
        'rental forklift Mississauga',
        'warehouse forklift rental',
        'electric forklift rental',
    ],
    alternates: { canonical: CANONICAL },
    openGraph: {
        title: 'Forklift Rentals | Super Handlers',
        description: 'Short & long-term forklift rentals. All major brands, fully maintained. Serving Brampton, Toronto & GTA.',
        url: CANONICAL,
        type: 'website',
        siteName: 'Super Handlers',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Forklift Rentals | Super Handlers',
        description: 'Short & long-term forklift rentals. All major brands, fully maintained. Serving Brampton, Toronto & GTA.',
    },
}

export default async function RentalForkliftsPage() {
    let inventory = []
    try {
        const all = await getInventory()
        inventory = all.filter((item) => item.metadata?.selected === 'Rental ForkLift')
    } catch (error) {
        console.error('Failed to fetch rental forklift inventory:', error)
    }

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Forklift Rentals — Super Handlers',
        description: 'Short and long-term forklift rentals available in Brampton and the Greater Toronto Area.',
        url: CANONICAL,
        numberOfItems: inventory.length,
        itemListElement: inventory.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
                '@type': 'Product',
                name: item.metadata?.title || 'Rental Forklift',
                description: item.seoDescription,
                image: `${SITE_URL}/api/uploads/${item.filename}`,
                url: item.absoluteUrl,
                brand: { '@type': 'Brand', name: 'Super Handlers' },
                offers: {
                    '@type': 'Offer',
                    price: item.metadata?.price || '0',
                    priceCurrency: 'CAD',
                    availability: 'https://schema.org/InStock',
                    priceSpecification: {
                        '@type': 'UnitPriceSpecification',
                        price: item.metadata?.price || '0',
                        priceCurrency: 'CAD',
                        unitCode: 'MON',
                    },
                    seller: { '@type': 'Organization', name: 'Super Handlers', url: SITE_URL },
                },
            },
        })),
    }

    const breadcrumb = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/shop` },
            { '@type': 'ListItem', position: 3, name: 'Rental Forklifts', item: CANONICAL },
        ],
    }

    return (
        <main className="relative min-h-screen pt-[120px] pb-24 bg-slate-50">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

            <div className="container mx-auto px-6">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-400">
                    <ol className="flex items-center gap-2">
                        <li><Link href="/" className="hover:text-[#5ba3b5]">Home</Link></li>
                        <li aria-hidden>/</li>
                        <li><Link href="/shop" className="hover:text-[#5ba3b5]">Shop</Link></li>
                        <li aria-hidden>/</li>
                        <li className="text-slate-600 font-medium">Rental Forklifts</li>
                    </ol>
                </nav>

                <header className="mb-12 text-center">
                    <span className="inline-block py-1 px-4 rounded-full bg-[#5ba3b5]/10 text-[#5ba3b5] text-[10px] font-black tracking-[0.2em] uppercase mb-6 border border-[#5ba3b5]/20">
                        Rentals
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
                        Forklift Rentals — Brampton &amp; GTA
                    </h1>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                        Flexible short-term and long-term forklift rentals. Fully maintained fleet from all major brands.
                        Serving Brampton, Mississauga, Toronto, Vaughan, and the Greater Toronto Area.
                    </p>
                    {inventory.length > 0 && (
                        <p className="mt-3 text-sm font-semibold text-[#5ba3b5]">{inventory.length} unit{inventory.length !== 1 ? 's' : ''} available</p>
                    )}
                </header>

                {inventory.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-400 text-lg mb-6">No rental forklifts listed right now — contact us to check current availability.</p>
                        <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-[#5ba3b5] px-6 py-3 font-bold text-white hover:bg-[#7ab8c7] transition-colors">
                            Contact Us
                        </Link>
                    </div>
                ) : (
                    <section aria-label="Rental forklift listings">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {inventory.map((item) => {
                                const title = item.metadata?.title || 'Rental Forklift'
                                const price = item.metadata?.price
                                return (
                                    <li key={item.filename}>
                                        <article
                                            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                                            itemScope
                                            itemType="https://schema.org/Product"
                                        >
                                            <meta itemProp="category" content="Rental ForkLift" />
                                            <Link href={item.href} className="block relative h-52 overflow-hidden bg-slate-100">
                                                <Image
                                                    src={`/api/uploads/${item.filename}`}
                                                    alt={`${title} — forklift rental at Super Handlers, Brampton`}
                                                    fill
                                                    unoptimized
                                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                                    itemProp="image"
                                                />
                                            </Link>
                                            <div className="p-4">
                                                <p className="text-[10px] font-bold text-[#5ba3b5] uppercase tracking-wider mb-1">Rental Forklift</p>
                                                <h2 className="text-sm font-bold text-slate-900 mb-2" itemProp="name">
                                                    <Link href={item.href} className="hover:text-[#5ba3b5] transition-colors">{title}</Link>
                                                </h2>
                                                <p className="sr-only" itemProp="description">{item.seoDescription}</p>
                                                <div
                                                    className="flex items-center justify-between"
                                                    itemProp="offers"
                                                    itemScope
                                                    itemType="https://schema.org/Offer"
                                                >
                                                    <span className="text-lg font-black text-[#5ba3b5]" itemProp="price" content={price || '0'}>
                                                        ${new Intl.NumberFormat('en-US').format(price || 0)}
                                                        <span className="text-xs font-medium text-slate-400 ml-0.5">/mo</span>
                                                        <meta itemProp="priceCurrency" content="CAD" />
                                                        <meta itemProp="availability" content="https://schema.org/InStock" />
                                                    </span>
                                                    <Link href={item.href} className="text-xs font-semibold text-[#5ba3b5] hover:text-[#7ab8c7] transition-colors">
                                                        View Details →
                                                    </Link>
                                                </div>
                                            </div>
                                        </article>
                                    </li>
                                )
                            })}
                        </ul>
                    </section>
                )}

                <section className="mt-20 bg-white rounded-[32px] border border-slate-200 p-10 md:p-14">
                    <h2 className="text-2xl font-black text-slate-900 mb-4">Flexible Forklift Rentals in Brampton &amp; the GTA</h2>
                    <p className="text-slate-500 font-medium leading-relaxed mb-4">
                        Super Handlers offers short-term and long-term forklift rentals for businesses across the Greater Toronto Area.
                        Our rental fleet includes electric counterbalance forklifts, reach trucks, and IC engine models from Toyota, Hyster, Yale, Crown, and more.
                        All rental units are regularly serviced and maintained by our certified technicians.
                    </p>
                    <p className="text-slate-500 font-medium leading-relaxed mb-8">
                        Whether you need a forklift for a week, a month, or a year — we have flexible rental agreements to suit your project.
                        Serving Brampton, Mississauga, Toronto, Vaughan, Etobicoke, and surrounding areas.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#5ba3b5] hover:bg-[#7ab8c7] transition-all duration-300">
                            Get a Rental Quote
                        </Link>
                        <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all duration-300">
                            View All Inventory
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    )
}
