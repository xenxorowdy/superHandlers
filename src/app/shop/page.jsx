import Link from "next/link";
import ShopContent from "./ShopContent";
import { getInventory } from "@/lib/inventory";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Forklift Inventory — Sales, Rentals & Pre-Owned",
  description:
    "Browse new, pre-owned & rental forklifts in Brampton & the GTA. Toyota, Hyster, Yale, Crown & more. Certified quality, competitive pricing.",
  keywords: [
    "forklift for sale",
    "forklift rental",
    "used forklift",
    "forklift Brampton",
    "forklift Toronto",
    "forklift GTA",
    "Toyota forklift",
    "Hyster forklift",
    "warehouse equipment",
    "forklift repair",
    "forklift maintenance",
  ],
  openGraph: {
    title: "Forklift Inventory | Super Handlers",
    description:
      "New, pre-owned, and rental forklifts across the Greater Toronto Area. All major brands, certified quality.",
    type: "website",
    url: "https://www.superhandlerslift.com/shop",
    siteName: "Super Handlers",
  },
  alternates: {
    canonical: "https://www.superhandlerslift.com/shop",
  },
};

export default async function Shop() {
  let inventory = [];

  try {
    inventory = await getInventory();
  } catch (error) {
    console.error("Failed to fetch inventory:", error);
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Super Handlers Forklift Inventory",
    description:
      "Forklifts for sale, rent, and pre-owned in Brampton and the Greater Toronto Area.",
    url: "https://www.superhandlerslift.com/shop",
    numberOfItems: inventory.length,
    itemListElement: inventory.slice(0, 50).map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: item.metadata?.title || "Forklift",
        description:
          item.metadata?.description ||
          "Quality forklift available at Super Handlers, Brampton ON.",
        image: [
          `https://www.superhandlerslift.com/api/uploads/${item.filename}`,
        ],
        url: item.absoluteUrl,
        mpn: (item.metadata?.title || "Forklift")
          .replace(/\s+/g, "-")
          .toUpperCase(),
        brand: { "@type": "Brand", name: "Super Handlers" },
        offers: {
          "@type": "Offer",
          url: item.absoluteUrl,
          ...(item.metadata?.price && {
            price: item.metadata.price,
            priceCurrency: "CAD",
          }),
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "Super Handlers",
            url: "https://www.superhandlerslift.com",
          },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
              "@type": "MonetaryAmount",
              value: "0",
              currency: "CAD",
            },
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "CA",
              addressRegion: "ON",
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 3, unitCode: "DAY" },
              transitTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 5, unitCode: "DAY" },
            },
          },
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: "CA",
            returnPolicyCategory:
              "https://schema.org/MerchantReturnNotPermitted",
          },
        },
      },
    })),
  };

  const orgData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Super Handlers",
    url: "https://www.superhandlerslift.com",
    telephone: "+1-647-573-0160",
    email: "superhandlers1@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "11 Holland Dr, Unit 9",
      addressLocality: "Bolton",
      addressRegion: "ON",
      postalCode: "L7E 1G7",
      addressCountry: "CA",
    },
    description:
      "Premier forklift maintenance, repairs, sales and rentals in the Greater Toronto Area.",
    openingHours: "Mo-Fr 08:00-18:00",
    priceRange: "$$",
  };

  const categories = {
    new: inventory.filter((i) => i.metadata?.selected === "New ForkLift"),
    rental: inventory.filter((i) => i.metadata?.selected === "Rental ForkLift"),
    preowned: inventory.filter(
      (i) => i.metadata?.selected === "Pre Owned ForkLift",
    ),
  };

  return (
    <main className="relative min-h-screen pt-[120px] pb-24 overflow-hidden bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgData) }}
      />

      <div className="bg-orb orb-1 opacity-10"></div>
      <div className="bg-orb orb-2 opacity-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* SEO heading */}
        <header className="mb-16 text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-[#5ba3b5]/10 text-[#5ba3b5] text-[10px] font-black tracking-[0.2em] uppercase mb-6 border border-[#5ba3b5]/20">
            Browse Equipment
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight text-slate-900">
            Forklift Inventory — Brampton &amp; GTA
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-3xl mx-auto">
            High-quality forklifts for every requirement — new units, certified
            pre-owned, and flexible rentals. Serving Brampton, Mississauga,
            Toronto, Vaughan, and the Greater Toronto Area.
          </p>
        </header>

        {/* Server-rendered category summary for SEO */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="glass-strong p-6 rounded-2xl text-center">
            <p className="text-3xl font-black text-[#5ba3b5] tracking-tight">
              {categories.new.length}
            </p>
            <h2 className="text-sm font-bold text-slate-700 mt-1">
              New Forklifts
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Brand new units ready for delivery
            </p>
          </div>
          <div className="glass-strong p-6 rounded-2xl text-center">
            <p className="text-3xl font-black text-[#5ba3b5] tracking-tight">
              {categories.rental.length}
            </p>
            <h2 className="text-sm font-bold text-slate-700 mt-1">
              Rental Forklifts
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Short &amp; long-term rentals available
            </p>
          </div>
          <div className="glass-strong p-6 rounded-2xl text-center">
            <p className="text-3xl font-black text-[#5ba3b5] tracking-tight">
              {categories.preowned.length}
            </p>
            <h2 className="text-sm font-bold text-slate-700 mt-1">
              Pre-Owned Forklifts
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Inspected &amp; certified quality
            </p>
          </div>
        </section>

        {/* Interactive client-side grid */}
        <ShopContent initialData={inventory} />

        {/* Server-rendered product listing for crawlers */}
        <section className="sr-only" aria-label="Complete product listing">
          <h2>All Forklifts Available at Super Handlers</h2>
          <ul>
            {inventory.map((item) => (
              <li key={item.filename}>
                <article>
                  <h3>
                    <Link href={item.href}>
                      {item.metadata?.title || "Forklift"}
                    </Link>
                  </h3>
                  <p>Category: {item.metadata?.selected || "Forklift"}</p>
                  {item.metadata?.price && (
                    <p>
                      Price: ${item.metadata.price} CAD
                      {item.metadata?.selected === "Rental ForkLift"
                        ? " per month"
                        : ""}
                    </p>
                  )}
                  {item.metadata?.description && (
                    <p>{item.metadata.description}</p>
                  )}
                  <p>
                    Available at Super Handlers, 11 Holland Dr, Unit 9, Bolton
                    ON. Call +1 647-573-0160.
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* SEO bottom content */}
        <section className="mt-20 glass-strong p-10 md:p-14 rounded-[32px]">
          <h2 className="text-2xl font-black text-slate-900 mb-4">
            Forklift Sales, Rentals &amp; Service in the GTA
          </h2>
          <p className="text-slate-500 font-medium leading-relaxed mb-4">
            Super Handlers is your trusted source for forklift equipment in
            Brampton, Mississauga, Toronto, Vaughan, and Etobicoke. We carry all
            major brands including Toyota, Hyster, Yale, Crown, Raymond, and
            Nissan. Whether you need a new forklift for your warehouse, a
            short-term rental for a seasonal project, or a certified pre-owned
            unit at a competitive price — we have you covered.
          </p>
          <p className="text-slate-500 font-medium leading-relaxed mb-6">
            Every unit in our inventory is inspected by certified technicians
            and comes with our quality guarantee. We also offer 24/7 emergency
            repair services, planned maintenance programs, and genuine OEM
            parts.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#5ba3b5] hover:bg-[#7ab8c7] transition-all duration-300 shadow-lg shadow-[#5ba3b5]/20"
            >
              Request a Quote
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all duration-300"
            >
              About Super Handlers
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
