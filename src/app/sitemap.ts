import { locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://pansionat-sion.com.ua'
  const sitemapEntries = []

  for (const locale of locales) {
    const dict = await getDictionary(locale)
    const posts = dict.blog.posts
    const partners = dict.partners.partnersList

    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    })

    const staticPages = ['blog', 'pricing', 'partners']
    for (const page of staticPages) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }

    for (const post of posts) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }

    for (const partner of partners) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/partners/${partner.slug}`,
        lastModified: new Date(partner.date),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  }

  return sitemapEntries
}
