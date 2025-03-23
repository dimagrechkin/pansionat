import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Image from 'next/image'
import Link from "next/link"
import Markdown from 'react-markdown'
import rehypeSlug from "rehype-slug"
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import { locales } from '@/i18n/config'
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

import { getPost, getAllPosts } from "@/lib/getPost"
import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import type { Metadata } from 'next'
import { ScrollToTop } from "@/components/scroll-to-top"
import { myRemarkPlugin } from "@/components/myRemarkPlugin"
import { PlanCards } from "@/components/PlanCards"

type PromisedParams = Promise<{ slug: string; lang: "uk" | "ru" }>

export default async function BlogPost({ params }: { params: PromisedParams }) {
  const { slug, lang } = await params
  const dict = await getDictionary(lang)
  const post = await getPost(slug, lang) as unknown as {
    title: string;
    date: string;
    author: string;
    contentHtml: string;
  }

  return (
    <main className="container py-12 md:py-24">
      <article className="prose prose-gray dark:prose-invert mx-auto">
        <h1 className="mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-500 mb-8">
          <span>{post.date}</span>
          <span className="mx-2">·</span>
          <span>{post.author}</span>
        </div>
        <div>
          <Markdown
            remarkPlugins={[remarkDirective, myRemarkPlugin]}
            rehypePlugins={[rehypeSlug, remarkDirectiveRehype]}
            components={{
              h1: (props) => (
                <h1 id={props.id} className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  {props.children}
                </h1>
              ),
              h2: (props) => (
                <h2 id={props.id} className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                  {props.children}
                </h2>
              ),
              ul: ({ children, ...props }) => (
                <ul className="my-6 ml-6 list-disc marker:text-black dark:marker:text-white [&>li]:mt-2" {...props}>{children}</ul>
              ),
              img: (props) => (
                <Image className="rounded-xl w-full h-auto" src={props.src} alt={props.alt} width={300} height={400} />
              ),
              blockquote: (props) => (
                <blockquote className="border-l-2 border-primary bg-primary/10 pl-4 py-2 my-4">
                  {props.children}
                </blockquote>
              ),
              a: (props) => (
                <a className="hover:text-primary" {...props}>
                  {props.children}
                </a>
              ),
              h3: (props) => (
                <h3 id={props.id} className="text-xl font-semibold mb-4">{props.children}</h3>
              ),
              hr: () => (
                <hr className="my-8 border-none h-px bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent shadow-sm" />
              ),
              plancards: (props) => {
                return <PlanCards {...props} />
              },
            }}
          >
            {post.content}
          </Markdown>
        </div>
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="font-bold">Звʼяжіться з нами</CardTitle>
            <div className="mt-4">
              <span className="text-4xl font-bold">+380997055969</span>
            </div>
          </CardHeader>
          <CardFooter className="flex flex-col gap-3">
            <Button
              className="w-full"
              variant="default"
            >
              Зателефонувати
            </Button>
          </CardFooter>          
        </Card>    
      </article>

      <Link href={`/${lang}/partners`}>
        <Button variant="ghost" className="mt-8 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {dict.partners.backToList}
        </Button>
      </Link>
      <ScrollToTop />
    </main>
  )
}
export async function generateStaticParams({
  params
}: {
  params: { slug: string, lang: Locale }
}) {
  // Array to hold all possible routes
  const paths = [];

  // Iterate over each locale
  for (const lang of locales) {
    // Fetch all posts for the current language
    const posts = await getAllPosts(params.lang); // This should return an array of posts with slugs

    for (const post of posts) {
      // Add each post slug to the paths
      paths.push({ lang, slug: post.slug });
    }
  }

  return paths; // Return an array like [{ lang: 'ru', slug: 'post-1' }, { lang: 'uk', slug: 'post-2' }]
}

export async function generateMetadata({
  params
}: {
  params: PromisedParams
}): Promise<Metadata> {
  const { lang, slug} = await params
  const dict = await getDictionary(lang)
  const post = await getPost(slug, lang) as unknown as {
    title: string
    description?: string
    author: string
    date: string
  }
  const url = process.env.NEXT_PUBLIC_APP_URL || 'http://pansionat-sion.com.ua'


  return {
    title: post.title,
    description: post.description || dict.blog.description,
    authors: [{ name: post.author }],
    openGraph: {
      type: 'article',
      locale: lang,
      url: `${url}/${lang}/blog/${slug}`,
      title: post.title,
      description: post.description || dict.blog.description,
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || dict.blog.description,
    },
    alternates: {
      canonical: `${url}/${lang}/blog/${slug}`,
      languages: {
        'ru': `${url}/ru/blog/${slug}`,
        'uk': `${url}/uk/blog/${slug}`,
      },
    },
  }
}
