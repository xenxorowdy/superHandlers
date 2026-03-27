import Image from 'next/image'
import Link from 'next/link'
import { getInventory } from '@/lib/inventory'
import { SITE_URL } from '@/lib/shopSeo'

export const dynamic = 'force-dynamic'

const CANONICAL = `${SITE_URL}/shop/new-forklifts`

export const metadata = {
    title: 'New Forklifts For Sale — Brampton & GTA | Super Handlers',
    description: 'Buy brand-new forklifts in Brampton, Mississauga, Toronto & the GTA. Toyota, Hyster, Yale, Crown & more. Competitive pricing, certified quality, same-week delivery.',
    keywords: [
        'new forklift for sale',
        'new forklift Brampton',
        'new forklift Toronto',
        'new forklift GTA',
        'buy new forklift Ontario',
        'new Toyota forklift',
        'new Hyster forklift',
        'new electric forklift',
        'new warehouse forklift',
        'forklift dealer Brampton',
    ],
    alternates: { canonical: CANONICAL },
    openGraph: {
        title: 'New Forklifts For Sale | Super Handlers',
        description: 'Brand-new forklifts in stock. All major brands. Serving Brampton, Toronto, Mississauga, Vaughan & GTA.',
        url: CANONICAL,
        type: 'website',
        siteName: 'Super Handlers',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'New Forklifts For Sale | Super Handlers',
        description: 'Brand-new forklifts in stock. All major brands. Serving Brampton, Toronto, Mississauga, Vaughan & GTA.',
    },
}

export default async function NewForkliftsPage() {
    let inventory = []
    try {
        const all = await getInventory()
        inventory = all.filter((item) => item.metadata?.selected === 'New ForkLift')
    } catch (error) {
        console.error('Failed to fetch new forklift inventory:', error)
    }

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'New Forklifts For Sale — Super Handlers',
        description: 'Brand-new forklifts available for sale in Brampton and the Greater Toronto Area.',
        url: CANONICAL,
        numberOfItems: inventory.length,
        itemListElement: inventory.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
                '@type': 'Product',
                name: item.metadata?.title || 'New Forklift',
                description: item.seoDescription,
                image: `${SITE_URL}/api/uploads/${item.filename}`,
                url: item.absoluteUrl,
                brand: { '@type': 'Brand', name: 'Super Handlers' },
                offers: {
                    '@type': 'Offer',
                    price: item.metadata?.price || '0',
                    priceCurrency: 'CAD',
                    availability: 'https://schema.org/InStock',
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
            { '@type': 'ListItem', position: 3, name: 'New Forklifts', item: CANONICAL },
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
                        <li className="text-slate-600 font-medium">New Forklifts</li>
                    </ol>
                </nav>

                <header className="mb-12 text-center">
                    <span className="inline-block py-1 px-4 rounded-full bg-[#5ba3b5]/10 text-[#5ba3b5] text-[10px] font-black tracking-[0.2em] uppercase mb-6 border border-[#5ba3b5]/20">
                        New Inventory
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
                        New Forklifts For Sale
                    </h1>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                        Brand-new forklifts from all major manufacturers. Serving Brampton, Mississauga,
                        Toronto, Vaughan, and the Greater Toronto Area.
                    </p>
                    {inventory.length > 0 && (
                        <p className="mt-3 text-sm font-semibold text-[#5ba3b5]">{inventory.length} unit{inventory.length !== 1 ? 's' : ''} in stock</p>
                    )}
                </header>

                {inventory.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-400 text-lg mb-6">No new forklifts listed right now — check back soon or contact us.</p>
                        <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-[#5ba3b5] px-6 py-3 font-bold text-white hover:bg-[#7ab8c7] transition-colors">
                            Contact Us
                        </Link>
                    </div>
                ) : (
                    <section aria-label="New forklift listings">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {inventory.map((item) => {
                                const title = item.metadata?.title || 'New Forklift'
                                const price = item.metadata?.price
                                return (
                                    <li key={item.filename}>
                                        <article
                                            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                                            itemScope
                                            itemType="https://schema.org/Product"
                                        >
                                            <meta itemProp="category" content="New ForkLift" />
                                            <Link href={item.href} className="block relative h-52 overflow-hidden bg-slate-100">
                                                <Image
                                                    src={`/api/uploads/${item.filename}`}
                                                    alt={`${title} — new forklift for sale at Super Handlers, Brampton`}
                                                    fill
                                                    unoptimized
                                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                                    itemProp="image"
                                                />
                                            </Link>
                                            <div className="p-4">
                                                <p className="text-[10px] font-bold text-[#5ba3b5] uppercase tracking-wider mb-1">New Forklift</p>
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
                    <h2 className="text-2xl font-black text-slate-900 mb-4">Buy New Forklifts in Brampton & the GTA</h2>
                    <p className="text-slate-500 font-medium leading-relaxed mb-4">
                        Super Handlers stocks new forklifts from all major brands — Toyota, Hyster, Yale, Crown, Raymond, and Nissan.
                        Every new unit comes with a manufacturer warranty and has been inspected by our certified technicians before delivery.
                        We serve businesses across Brampton, Mississauga, Toronto, Vaughan, Etobicoke, and the entire Greater Toronto Area.
                    </p>
                    <p className="text-slate-500 font-medium leading-relaxed mb-8">
                        Whether you need an electric counterbalance forklift, a reach truck, or a heavy-duty IC engine model, we can source it.
                        Contact us for same-week delivery and flexible financing options.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#5ba3b5] hover:bg-[#7ab8c7] transition-all duration-300">
                            Request a Quote
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
