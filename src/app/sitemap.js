import { getInventory } from '@/lib/inventory'
import { SITE_URL } from '@/lib/shopSeo'

export const dynamic = 'force-dynamic'

const staticPages = [
  { url: SITE_URL,                                    priority: 1.0,  changeFrequency: 'weekly'  },
  { url: `${SITE_URL}/shop`,                          priority: 0.9,  changeFrequency: 'daily'   },
  { url: `${SITE_URL}/shop/new-forklifts`,            priority: 0.85, changeFrequency: 'daily'   },
  { url: `${SITE_URL}/shop/rental-forklifts`,         priority: 0.85, changeFrequency: 'daily'   },
  { url: `${SITE_URL}/shop/pre-owned-forklifts`,      priority: 0.85, changeFrequency: 'daily'   },
  { url: `${SITE_URL}/services`,                      priority: 0.9,  changeFrequency: 'monthly' },
  { url: `${SITE_URL}/service-areas`,                 priority: 0.85, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/service-areas/brampton`,        priority: 0.9,  changeFrequency: 'monthly' },
  { url: `${SITE_URL}/service-areas/toronto`,         priority: 0.9,  changeFrequency: 'monthly' },
  { url: `${SITE_URL}/service-areas/mississauga`,     priority: 0.9,  changeFrequency: 'monthly' },
  { url: `${SITE_URL}/service-areas/vaughan`,         priority: 0.85, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/about`,                         priority: 0.8,  changeFrequency: 'monthly' },
  { url: `${SITE_URL}/contact`,                       priority: 0.8,  changeFrequency: 'monthly' },
]

export default async function sitemap() {
  let inventory = []
  try {
    inventory = await getInventory()
  } catch {
    // DB unavailable — sitemap still returns static pages
  }

  return [
    ...staticPages.map(({ url, priority, changeFrequency }) => ({
      url,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })),
    ...inventory.map((item) => ({
      url: item.absoluteUrl,
      lastModified: item.uploadDate ? new Date(item.uploadDate) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
  ]
}
