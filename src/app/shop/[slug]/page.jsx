import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getInventoryItemBySlug } from '@/lib/inventory'
import { SITE_URL } from '@/lib/shopSeo'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export async function generateMetadata({ params }) {
    const { slug } = await params
    const item = await getInventoryItemBySlug(slug)

    if (!item) {
        return {
            title: 'Inventory Item Not Found',
            robots: {
                index: false,
                follow: false,
            },
        }
    }

    const title = item.metadata?.title || 'Forklift'
    const description = item.seoDescription
    const image = `${SITE_URL}/api/uploads/${item.filename}`

    return {
        title: `${title} For Sale | Super Handlers`,
        description,
        keywords: [
            title,
            `${title} for sale`,
            `${title} Brampton`,
            `${title} GTA`,
            'Toyota electric forklift',
            'forklift for sale',
        ],
        alternates: {
            canonical: item.absoluteUrl,
        },
        openGraph: {
            title: `${title} | Super Handlers`,
            description,
            url: item.absoluteUrl,
            type: 'website',
            images: [
                {
                    url: image,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | Super Handlers`,
            description,
            images: [image],
        },
    }
}

export default async function ShopItemPage({ params }) {
    const { slug } = await params
    const item = await getInventoryItemBySlug(slug)

    if (!item) {
        notFound()
    }

    const title = item.metadata?.title || 'Forklift'
    const description = item.seoDescription
    const image = `${SITE_URL}/api/uploads/${item.filename}`
    const isRental = item.metadata?.selected === 'Rental ForkLift'
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: title,
        description,
        category: item.metadata?.selected || 'Forklift',
        image,
        brand: {
            '@type': 'Brand',
            name: title.split(' ')[0] || 'Super Handlers',
        },
        offers: {
            '@type': 'Offer',
            url: item.absoluteUrl,
            price: item.metadata?.price || '0',
            priceCurrency: 'CAD',
            availability: 'https://schema.org/InStock',
            seller: {
                '@type': 'Organization',
                name: 'Super Handlers',
                url: SITE_URL,
            },
        },
    }

    return (
        <main className="relative min-h-screen pt-[120px] pb-24 bg-slate-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <div className="container mx-auto px-6">
                <div className="mb-8">
                    <Link href="/shop" className="text-sm font-semibold text-[#5ba3b5] hover:text-[#7ab8c7]">
                        Back to inventory
                    </Link>
                </div>

                <article className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    <div className="relative overflow-hidden rounded-[28px] bg-white shadow-sm border border-slate-200 min-h-[360px]">
                        <Image
                            src={`/api/uploads/${item.filename}`}
                            alt={`${title} available at Super Handlers`}
                            fill
                            unoptimized
                            className="object-cover"
                        />
                    </div>

                    <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm p-8 lg:p-10">
                        <p className="inline-flex items-center rounded-full bg-[#5ba3b5]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#5ba3b5] border border-[#5ba3b5]/20">
                            {item.metadata?.selected || 'Forklift'}
                        </p>
                        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
                            {title}
                        </h1>
                        <p className="mt-4 text-slate-600 leading-7">
                            {description}
                        </p>

                        <div className="mt-8 flex items-baseline gap-2 border-t border-b border-slate-100 py-6">
                            <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">Price</span>
                            <span className="text-4xl font-black tracking-tight text-[#5ba3b5]">
                                ${new Intl.NumberFormat('en-US').format(item.metadata?.price || 0)}
                            </span>
                            {isRental && <span className="text-sm font-medium text-slate-400">/month</span>}
                        </div>

                        {item.metadata?.description && (
                            <section className="mt-8">
                                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
                                    Features and specifications
                                </h2>
                                <div className="space-y-3 text-slate-600 leading-7">
                                    {item.metadata.description.split('\n').map((line, index) => (
                                        line.trim() ? <p key={index}>{line.trim()}</p> : null
                                    ))}
                                </div>
                            </section>
                        )}

                        <section className="mt-8">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
                                Availability
                            </h2>
                            <p className="text-slate-600 leading-7">
                                This {title} is available from Super Handlers in Bolton, Ontario, serving Brampton, Toronto,
                                Mississauga, Vaughan, and the Greater Toronto Area.
                            </p>
                        </section>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-xl bg-[#5ba3b5] px-6 py-3 font-bold text-white hover:bg-[#7ab8c7] transition-colors"
                            >
                                Request Availability
                            </Link>
                            <Link
                                href="/shop"
                                className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-6 py-3 font-bold text-slate-700 hover:bg-slate-200 transition-colors"
                            >
                                View More Inventory
                            </Link>
                        </div>
                    </div>
                </article>
            </div>
        </main>
    )
}
