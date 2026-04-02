import Image from 'next/image'
import Link from 'next/link'
import { getInventory } from '@/lib/inventory'
import { SITE_URL } from '@/lib/shopSeo'

export const dynamic = 'force-dynamic'

const CANONICAL = `${SITE_URL}/shop/pre-owned-forklifts`

export const metadata = {
    title: 'Pre-Owned Forklifts For Sale — Brampton & GTA | Super Handlers',
    description: 'Buy certified pre-owned forklifts in Brampton, Mississauga, Toronto & the GTA. Inspected & warranted used forklifts. All major brands at competitive prices.',
    keywords: [
        'used forklift for sale',
        'pre-owned forklift Brampton',
        'used forklift Toronto',
        'certified pre-owned forklift',
        'used forklift GTA',
        'second hand forklift Ontario',
        'used Toyota forklift',
        'used electric forklift',
        'affordable forklift',
        'inspected used forklift',
    ],
    alternates: { canonical: CANONICAL },
    openGraph: {
        title: 'Pre-Owned Forklifts For Sale | Super Handlers',
        description: 'Certified pre-owned forklifts. Inspected & warranted. All major brands. Serving Brampton, Toronto & GTA.',
        url: CANONICAL,
        type: 'website',
        siteName: 'Super Handlers',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pre-Owned Forklifts For Sale | Super Handlers',
        description: 'Certified pre-owned forklifts. Inspected & warranted. All major brands. Serving Brampton, Toronto & GTA.',
    },
}

export default async function PreOwnedForkliftsPage() {
    let inventory = []
    try {
        const all = await getInventory()
        inventory = all.filter((item) => item.metadata?.selected === 'Pre Owned ForkLift')
    } catch (error) {
        console.error('Failed to fetch pre-owned forklift inventory:', error)
    }

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Pre-Owned Forklifts For Sale — Super Handlers',
        description: 'Certified pre-owned forklifts available for sale in Brampton and the Greater Toronto Area.',
        url: CANONICAL,
        numberOfItems: inventory.length,
        itemListElement: inventory.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
                '@type': 'Product',
                name: item.metadata?.title || 'Pre-Owned Forklift',
                description: item.seoDescription,
                image: [`${SITE_URL}/api/uploads/${item.filename}`],
                url: item.absoluteUrl,
                mpn: (item.metadata?.title || 'Forklift').replace(/\s+/g, '-').toUpperCase(),
                brand: { '@type': 'Brand', name: 'Super Handlers' },
                itemCondition: 'https://schema.org/UsedCondition',
                offers: {
                    '@type': 'Offer',
                    url: item.absoluteUrl,
                    ...(item.metadata?.price && { price: item.metadata.price, priceCurrency: 'CAD' }),
                    availability: 'https://schema.org/InStock',
                    seller: { '@type': 'Organization', name: 'Super Handlers', url: SITE_URL },
                    shippingDetails: {
                        '@type': 'OfferShippingDetails',
                        shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'CAD' },
                        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'CA', addressRegion: 'ON' },
                    },
                    hasMerchantReturnPolicy: {
                        '@type': 'MerchantReturnPolicy',
                        applicableCountry: 'CA',
                        returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
                    },
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
            { '@type': 'ListItem', position: 3, name: 'Pre-Owned Forklifts', item: CANONICAL },
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
                        <li className="text-slate-600 font-medium">Pre-Owned Forklifts</li>
                    </ol>
                </nav>

                <header className="mb-12 text-center">
                    <span className="inline-block py-1 px-4 rounded-full bg-[#5ba3b5]/10 text-[#5ba3b5] text-[10px] font-black tracking-[0.2em] uppercase mb-6 border border-[#5ba3b5]/20">
                        Pre-Owned
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
                        Pre-Owned Forklifts For Sale
                    </h1>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                        Certified pre-owned forklifts — inspected, tested, and guaranteed.
                        All major brands at competitive prices. Serving Brampton, Mississauga,
                        Toronto, Vaughan, and the Greater Toronto Area.
                    </p>
                    {inventory.length > 0 && (
                        <p className="mt-3 text-sm font-semibold text-[#5ba3b5]">{inventory.length} unit{inventory.length !== 1 ? 's' : ''} available</p>
                    )}
                </header>

                {inventory.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-400 text-lg mb-6">No pre-owned forklifts listed right now — contact us to check upcoming inventory.</p>
                        <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-[#5ba3b5] px-6 py-3 font-bold text-white hover:bg-[#7ab8c7] transition-colors">
                            Contact Us
                        </Link>
                    </div>
                ) : (
                    <section aria-label="Pre-owned forklift listings">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {inventory.map((item) => {
                                const title = item.metadata?.title || 'Pre-Owned Forklift'
                                const price = item.metadata?.price
                                return (
                                    <li key={item.filename}>
                                        <article
                                            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                                            itemScope
                                            itemType="https://schema.org/Product"
                                        >
                                            <meta itemProp="category" content="Pre Owned ForkLift" />
                                            <Link href={item.href} className="block relative h-52 overflow-hidden bg-slate-100">
                                                <Image
                                                    src={`/api/uploads/${item.filename}`}
                                                    alt={`${title} — certified pre-owned forklift at Super Handlers, Brampton`}
                                                    fill
                                                    unoptimized
                                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                                    itemProp="image"
                                                />
                                            </Link>
                                            <div className="p-4">
                                                <p className="text-[10px] font-bold text-[#5ba3b5] uppercase tracking-wider mb-1">Pre-Owned Forklift</p>
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
                                                        <meta itemProp="itemCondition" content="https://schema.org/UsedCondition" />
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
                    <h2 className="text-2xl font-black text-slate-900 mb-4">Certified Pre-Owned Forklifts in Brampton &amp; the GTA</h2>
                    <p className="text-slate-500 font-medium leading-relaxed mb-4">
                        Every pre-owned forklift at Super Handlers is thoroughly inspected and tested by our certified technicians before going on sale.
                        We stock used forklifts from Toyota, Hyster, Yale, Crown, Raymond, Nissan, and other major manufacturers.
                        Each unit comes with a detailed condition report and is priced competitively for businesses across Brampton, Mississauga, Toronto, and the GTA.
                    </p>
                    <p className="text-slate-500 font-medium leading-relaxed mb-8">
                        Looking for a specific model or capacity? Contact us — we source pre-owned forklifts to match your exact requirements
                        and budget. Trade-ins are also welcome.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#5ba3b5] hover:bg-[#7ab8c7] transition-all duration-300">
                            Inquire About a Unit
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
