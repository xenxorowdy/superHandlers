import { getInventory } from '@/lib/inventory'
import { SITE_URL } from '@/lib/shopSeo'

export const dynamic = 'force-dynamic'

export default async function sitemap() {
    let inventory = []

    try {
        inventory = await getInventory()
    } catch (error) {
        console.error('Failed to build sitemap inventory:', error)
    }

    const staticPages = [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${SITE_URL}/shop`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]

    const inventoryPages = inventory.map((item) => ({
        url: item.absoluteUrl,
        lastModified: item.uploadDate || new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
    }))

    return [...staticPages, ...inventoryPages]
}
