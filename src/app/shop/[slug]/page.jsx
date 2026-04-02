import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getInventoryItemBySlug, getInventory } from '@/lib/inventory'
import { SITE_URL } from '@/lib/shopSeo'
import ShareButton from '@/app/component/ShareButton'
import ImageGallery from '@/app/component/ImageGallery'

export const dynamic = 'force-dynamic'

const PHONE = '+16475730160'
const PHONE_DISPLAY = '+1 (647) 573-0160'
const KNOWN_BRANDS = ['toyota', 'hyster', 'yale', 'crown', 'raymond', 'nissan', 'clark', 'caterpillar', 'jungheinrich', 'linde', 'mitsubishi', 'komatsu', 'doosan']

function extractBrand(title = '') {
    const words = title.toLowerCase().split(/\s+/)
    return words.find(w => KNOWN_BRANDS.includes(w)) || null
}

function buildKeywords(item) {
    const title = item.metadata?.title || 'Forklift'
    const isRental = item.metadata?.selected === 'Rental ForkLift'
    const action = isRental ? 'rental' : 'for sale'
    const brand = extractBrand(title)
    const brandLabel = brand ? brand.charAt(0).toUpperCase() + brand.slice(1) : null

    const kw = [
        title,
        `${title} ${action}`,
        `${title} Brampton`,
        `${title} GTA`,
        `${title} Ontario`,
    ]

    if (brandLabel) {
        kw.push(
            `${brandLabel} forklift ${action}`,
            `${brandLabel} forklift Brampton`,
            `${brandLabel} forklift GTA`,
            `${brandLabel} forklift Ontario`,
            `${brandLabel} electric forklift`,
        )
    }

    kw.push(
        `forklift ${action} Brampton`,
        `forklift ${action} GTA`,
        'forklift dealer Ontario',
        'Super Handlers forklift',
    )

    return kw
}

function buildTitle(item) {
    const title = item.metadata?.title || 'Forklift'
    const isRental = item.metadata?.selected === 'Rental ForkLift'
    return isRental
        ? `${title} Rental — GTA | Super Handlers`
        : `${title} For Sale in Brampton | Super Handlers`
}

export async function generateMetadata({ params }) {
    const { slug } = await params
    const item = await getInventoryItemBySlug(slug)

    if (!item) {
        return {
            title: 'Inventory Item Not Found',
            robots: { index: false, follow: false },
        }
    }

    const title = item.metadata?.title || 'Forklift'
    const description = item.seoDescription
    const image = `${SITE_URL}/api/uploads/${item.filename}`

    return {
        title: buildTitle(item),
        description,
        keywords: buildKeywords(item),
        alternates: { canonical: item.absoluteUrl },
        openGraph: {
            title: buildTitle(item),
            description,
            url: item.absoluteUrl,
            type: 'website',
            siteName: 'Super Handlers',
            images: [{ url: image, alt: `${title} at Super Handlers`, width: 1200, height: 630 }],
        },
        twitter: {
            card: 'summary_large_image',
            title: buildTitle(item),
            description,
            images: [image],
        },
    }
}

export default async function ShopItemPage({ params }) {
    const { slug } = await params
    const [item, allInventory] = await Promise.all([
        getInventoryItemBySlug(slug),
        getInventory(),
    ])

    if (!item) notFound()

    const title = item.metadata?.title || 'Forklift'
    const description = item.seoDescription
    const image = `${SITE_URL}/api/uploads/${item.filename}`
    const isRental = item.metadata?.selected === 'Rental ForkLift'
    const isPreOwned = item.metadata?.selected === 'Pre Owned ForkLift'
    const brand = extractBrand(title)
    const brandLabel = brand ? brand.charAt(0).toUpperCase() + brand.slice(1) : null

    // All images: primary first, then extras stored in metadata
    const extraImages = item.metadata?.extraImages || []
    const allImages = [item.filename, ...extraImages]

    // Related: same category, different item, max 4
    const related = allInventory
        .filter(i => i.filename !== item.filename && i.metadata?.selected === item.metadata?.selected)
        .slice(0, 4)

    const categoryHref = isRental
        ? '/shop/rental-forklifts'
        : isPreOwned
            ? '/shop/pre-owned-forklifts'
            : '/shop/new-forklifts'

    const categoryLabel = isRental
        ? 'Rental Forklifts'
        : isPreOwned
            ? 'Pre-Owned Forklifts'
            : 'New Forklifts'

    // --- Structured data ---
    const productImages = [image, ...extraImages.map(f => `${SITE_URL}/api/uploads/${f}`)]

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: title,
        description,
        image: productImages,
        url: item.absoluteUrl,
        sku: item.filename,
        mpn: title.replace(/\s+/g, '-').toUpperCase(),
        brand: {
            '@type': 'Brand',
            name: brandLabel || 'Super Handlers',
        },
        ...(isPreOwned && { itemCondition: 'https://schema.org/UsedCondition' }),
        offers: {
            '@type': 'Offer',
            url: item.absoluteUrl,
            ...(item.metadata?.price && {
                price: item.metadata.price,
                priceCurrency: 'CAD',
            }),
            availability: 'https://schema.org/InStock',
            ...(isRental && item.metadata?.price && {
                priceSpecification: {
                    '@type': 'UnitPriceSpecification',
                    price: item.metadata.price,
                    priceCurrency: 'CAD',
                    unitCode: 'MON',
                },
            }),
            seller: {
                '@type': 'Organization',
                name: 'Super Handlers',
                url: SITE_URL,
                telephone: PHONE,
            },
            shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingRate: {
                    '@type': 'MonetaryAmount',
                    value: '0',
                    currency: 'CAD',
                },
                shippingDestination: {
                    '@type': 'DefinedRegion',
                    addressCountry: 'CA',
                    addressRegion: 'ON',
                },
                deliveryTime: {
                    '@type': 'ShippingDeliveryTime',
                    handlingTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 1,
                        maxValue: 3,
                        unitCode: 'DAY',
                    },
                    transitTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 1,
                        maxValue: 5,
                        unitCode: 'DAY',
                    },
                },
            },
            hasMerchantReturnPolicy: {
                '@type': 'MerchantReturnPolicy',
                applicableCountry: 'CA',
                returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
                merchantReturnDays: 0,
            },
        },
    }

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/shop` },
            { '@type': 'ListItem', position: 3, name: categoryLabel, item: `${SITE_URL}${categoryHref}` },
            { '@type': 'ListItem', position: 4, name: title, item: item.absoluteUrl },
        ],
    }

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: `Is the ${title} available?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: `Yes, the ${title} is currently in stock at Super Handlers in Bolton, Ontario. Call us at ${PHONE_DISPLAY} or request availability online.`,
                },
            },
            {
                '@type': 'Question',
                name: `Where can I buy the ${title} near Brampton?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: `Super Handlers at 11 Holland Dr, Unit 9, Bolton ON stocks the ${title}. We serve Brampton, Mississauga, Toronto, Vaughan, and the GTA. Call ${PHONE_DISPLAY}.`,
                },
            },
            ...(isRental
                ? [{
                    '@type': 'Question',
                    name: `What is the rental price for the ${title}?`,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: item.metadata?.price
                            ? `The ${title} rents for $${new Intl.NumberFormat('en-US').format(item.metadata.price)} CAD/month. Contact us for long-term rental discounts.`
                            : `Contact Super Handlers at ${PHONE_DISPLAY} for rental pricing on the ${title}.`,
                    },
                }]
                : [{
                    '@type': 'Question',
                    name: `What is the price of the ${title}?`,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: item.metadata?.price
                            ? `The ${title} is listed at $${new Intl.NumberFormat('en-US').format(item.metadata.price)} CAD. Contact Super Handlers for financing options.`
                            : `Contact Super Handlers at ${PHONE_DISPLAY} for pricing on the ${title}.`,
                    },
                }]
            ),
        ],
    }

    return (
        <main className="relative min-h-screen pt-[120px] pb-24 bg-slate-50">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <div className="container mx-auto px-6">

                {/* Back + breadcrumb + share */}
                <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4 flex-wrap">
                        {/* Back button */}
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#5ba3b5] transition-colors group"
                            aria-label="Back to inventory"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden>
                                <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
                            </svg>
                            Back to Inventory
                        </Link>

                        <span className="text-slate-200" aria-hidden>|</span>

                        {/* Breadcrumb */}
                        <nav aria-label="Breadcrumb" className="text-sm text-slate-400 flex items-center gap-2 flex-wrap">
                            <Link href="/" className="hover:text-[#5ba3b5] transition-colors">Home</Link>
                            <span aria-hidden>/</span>
                            <Link href="/shop" className="hover:text-[#5ba3b5] transition-colors">Shop</Link>
                            <span aria-hidden>/</span>
                            <Link href={categoryHref} className="hover:text-[#5ba3b5] transition-colors">{categoryLabel}</Link>
                            <span aria-hidden>/</span>
                            <span className="text-slate-600 font-medium truncate max-w-[180px]">{title}</span>
                        </nav>
                    </div>
                    <ShareButton title={`${title} | Super Handlers`} url={item.absoluteUrl} />
                </div>

                {/* Main product layout */}
                <article className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                    {/* Image gallery */}
                    <ImageGallery images={allImages} title={title} />

                    {/* Info panel */}
                    <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm p-8 lg:p-10 flex flex-col gap-6">

                        {/* Category + availability badge */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="inline-flex items-center rounded-full bg-[#5ba3b5]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#5ba3b5] border border-[#5ba3b5]/20">
                                {item.metadata?.selected || 'Forklift'}
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-green-600 border border-green-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                                In Stock
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                            {title}
                        </h1>

                        {/* Description */}
                        <p className="text-slate-500 leading-7 text-[15px]">{description}</p>

                        {/* Price */}
                        {item.metadata?.price ? (
                            <div className="flex items-baseline gap-2 border-t border-b border-slate-100 py-5">
                                <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">Price</span>
                                <span className="text-4xl font-black tracking-tight text-[#5ba3b5]">
                                    ${new Intl.NumberFormat('en-US').format(item.metadata.price)}
                                    <span className="text-base font-medium text-slate-400 ml-1">CAD</span>
                                </span>
                                {isRental && <span className="text-sm font-medium text-slate-400">/month</span>}
                            </div>
                        ) : null}

                        {/* CTA buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            {/* Call button */}
                            <a
                                href={`tel:${PHONE}`}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5ba3b5] px-6 py-3.5 font-bold text-white hover:bg-[#4a92a4] active:scale-[0.98] transition-all duration-200 shadow-md shadow-[#5ba3b5]/30 text-[15px]"
                                aria-label={`Call Super Handlers at ${PHONE_DISPLAY}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden>
                                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                                </svg>
                                Call Us Now
                            </a>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-6 py-3.5 font-bold text-slate-700 hover:bg-slate-200 active:scale-[0.98] transition-all duration-200 text-[15px]"
                            >
                                Request Availability
                            </Link>
                        </div>

                        {/* Phone number visible */}
                        <p className="text-sm text-slate-400 text-center sm:text-left">
                            Or call directly:{' '}
                            <a href={`tel:${PHONE}`} className="text-[#5ba3b5] font-bold hover:underline">
                                {PHONE_DISPLAY}
                            </a>
                        </p>

                        {/* Features & specs */}
                        {item.metadata?.description && (
                            <section>
                                <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-3">
                                    Features &amp; Specifications
                                </h2>
                                <div className="space-y-2 text-slate-600 text-[15px] leading-7">
                                    {item.metadata.description.split('\n').map((line, i) =>
                                        line.trim()
                                            ? (
                                                <p key={i} className="flex gap-2">
                                                    <span className="text-[#5ba3b5] mt-1 shrink-0">›</span>
                                                    {line.trim()}
                                                </p>
                                            )
                                            : null
                                    )}
                                </div>
                            </section>
                        )}

                        {/* Availability */}
                        <section className="bg-slate-50 rounded-2xl px-5 py-4 border border-slate-100">
                            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">
                                Availability
                            </h2>
                            <p className="text-slate-600 text-[14px] leading-6">
                                Available from Super Handlers — 11 Holland Dr, Unit 9, Bolton ON.
                                Serving <strong className="font-semibold text-slate-700">Brampton, Mississauga, Toronto, Vaughan</strong>, and the Greater Toronto Area.
                                {' '}Call <a href={`tel:${PHONE}`} className="text-[#5ba3b5] font-bold hover:underline">{PHONE_DISPLAY}</a> to confirm.
                            </p>
                        </section>

                    </div>
                </article>

                {/* Related products */}
                {related.length > 0 && (
                    <section className="mt-20">
                        <h2 className="text-xl font-black text-slate-900 mb-6">
                            More {categoryLabel}
                        </h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {related.map((rel) => {
                                const relTitle = rel.metadata?.title || 'Forklift'
                                const relPrice = rel.metadata?.price
                                const relIsRental = rel.metadata?.selected === 'Rental ForkLift'
                                return (
                                    <li key={rel.filename}>
                                        <article
                                            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                                            itemScope
                                            itemType="https://schema.org/Product"
                                        >
                                            <link itemProp="image" href={`${SITE_URL}/api/uploads/${rel.filename}`} />
                                            <div itemProp="brand" itemScope itemType="https://schema.org/Brand">
                                                <meta itemProp="name" content="Super Handlers" />
                                            </div>
                                            <Link href={rel.href} className="block relative h-48 overflow-hidden bg-slate-100">
                                                <Image
                                                    src={`/api/uploads/${rel.filename}`}
                                                    alt={`${relTitle} at Super Handlers`}
                                                    fill
                                                    unoptimized
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    itemProp="image"
                                                />
                                            </Link>
                                            <div className="p-4">
                                                <p className="text-[10px] font-bold text-[#5ba3b5] uppercase tracking-wider mb-1">
                                                    {rel.metadata?.selected || 'Forklift'}
                                                </p>
                                                <h3 className="text-sm font-bold text-slate-900 mb-2 truncate" itemProp="name">
                                                    <Link href={rel.href} className="hover:text-[#5ba3b5] transition-colors">
                                                        {relTitle}
                                                    </Link>
                                                </h3>
                                                <div
                                                    className="flex items-center justify-between"
                                                    itemProp="offers"
                                                    itemScope
                                                    itemType="https://schema.org/Offer"
                                                >
                                                    <span className="text-base font-black text-[#5ba3b5]">
                                                        {relPrice ? (
                                                            <>
                                                                <span itemProp="price" content={relPrice}>
                                                                    ${new Intl.NumberFormat('en-US').format(relPrice)}
                                                                </span>
                                                                <meta itemProp="priceCurrency" content="CAD" />
                                                                {relIsRental && <span className="text-xs text-slate-400 ml-0.5">/mo</span>}
                                                            </>
                                                        ) : (
                                                            <span className="text-xs text-slate-400">Contact for pricing</span>
                                                        )}
                                                        <meta itemProp="availability" content="https://schema.org/InStock" />
                                                        <div itemProp="shippingDetails" itemScope itemType="https://schema.org/OfferShippingDetails">
                                                            <div itemProp="shippingRate" itemScope itemType="https://schema.org/MonetaryAmount">
                                                                <meta itemProp="value" content="0" />
                                                                <meta itemProp="currency" content="CAD" />
                                                            </div>
                                                            <div itemProp="shippingDestination" itemScope itemType="https://schema.org/DefinedRegion">
                                                                <meta itemProp="addressCountry" content="CA" />
                                                                <meta itemProp="addressRegion" content="ON" />
                                                            </div>
                                                        </div>
                                                        <div itemProp="hasMerchantReturnPolicy" itemScope itemType="https://schema.org/MerchantReturnPolicy">
                                                            <meta itemProp="applicableCountry" content="CA" />
                                                            <link itemProp="returnPolicyCategory" href="https://schema.org/MerchantReturnNotPermitted" />
                                                        </div>
                                                    </span>
                                                    <Link href={rel.href} className="text-xs font-semibold text-[#5ba3b5] hover:text-[#4a92a4] transition-colors">
                                                        View →
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

                {/* SEO content block */}
                <section className="mt-16 bg-white rounded-[32px] border border-slate-200 p-10 md:p-14">
                    <h2 className="text-2xl font-black text-slate-900 mb-4">
                        {brandLabel
                            ? `${brandLabel} Forklifts in Brampton & the GTA`
                            : 'Forklifts in Brampton & the GTA'}
                    </h2>
                    <p className="text-slate-500 font-medium leading-relaxed mb-4">
                        Super Handlers is the GTA&apos;s trusted forklift dealer, based in Bolton, Ontario.
                        {brandLabel && ` We stock ${brandLabel} forklifts and all major brands including Toyota, Hyster, Yale, Crown, Raymond, and Nissan.`}
                        {' '}Whether you&apos;re buying new, renting, or looking for a certified pre-owned unit — our team is ready to help.
                    </p>
                    <p className="text-slate-500 font-medium leading-relaxed mb-8">
                        Every unit is inspected by certified technicians. We offer flexible financing,
                        same-week delivery, and 24/7 emergency repair across Brampton, Mississauga, Toronto, Vaughan, and Etobicoke.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href={`tel:${PHONE}`}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#5ba3b5] hover:bg-[#4a92a4] transition-all duration-300 shadow-md shadow-[#5ba3b5]/25"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
                                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                            </svg>
                            Call {PHONE_DISPLAY}
                        </a>
                        <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all duration-300">
                            View All Inventory
                        </Link>
                    </div>
                </section>

            </div>
        </main>
    )
}
