import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import type { Metadata } from 'next'

type PromisedParams = Promise<{ lang: Locale }>

export default async function BlogPage({ params}: { params: PromisedParams }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const posts = dict.blog.posts

  return (
    <main className="container py-12 md:py-24">
      <div className="flex flex-col items-center space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          {dict.blog.title}
        </h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
          {dict.blog.description}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <Link key={post.id} href={`/${lang}/blog/${post.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                  {post.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">{post.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* <div className="flex justify-center mt-12">
        <Button variant="outline">{dict.blog.loadMore}</Button>
      </div> */}
    </main>
  )
}

export async function generateMetadata({
  params
}: {
  params: PromisedParams
}): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const url = process.env.NEXT_PUBLIC_APP_URL || 'http://pansionat-sion.com.ua'

  return {
    title: dict.blog.title,
    description: dict.blog.description,
    alternates: {
      canonical: `${url}/${lang}/blog`,
      languages: {
        'ru': `${url}/ru/blog`,
        'uk': `${url}/uk/blog`,
      },
    },
    openGraph: {
      title: dict.blog.title,
      description: dict.blog.description,
      url: `${url}/${lang}/blog`,
    }
  }
}
