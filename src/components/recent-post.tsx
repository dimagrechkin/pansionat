import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/config"
import Image from "next/image"
import Link from "next/link"

export default async function RecentPosts({
    lang
}: {
    lang: Locale
}) {
    const dict = await getDictionary(lang)

    const posts = [
        {
            img: "/images/features-1.jpeg",
            title: dict.posts.khmelnytskyi.title,
            description: dict.posts.khmelnytskyi.description,
            slug: dict.posts.khmelnytskyi.slug
        },
        {
            img: "/images/features-2.jpeg",
            title: dict.posts.lviv.title,
            description: dict.posts.lviv.description,
            slug: dict.posts.lviv.slug
        },
        {
            slug: dict.posts.zhitomir.slug,
            img: "/images/features-3.jpeg",
            title: dict.posts.zhitomir.title,
            description: dict.posts.zhitomir.description
        },
        {
            img: "/images/features-4.jpeg",
            title: dict.posts.kiev.title,
            description: dict.posts.kiev.description,
            slug: dict.posts.kiev.slug
        },
        {
            img: "/images/features-5.jpeg",
            title: dict.posts.ternopil.title,
            description: dict.posts.ternopil.description,
            slug: dict.posts.ternopil.slug
        },
        {
            img: "/images/features-6.jpeg",
            title: dict.posts.martusivka.title,
            description: dict.posts.martusivka.description,
            slug: dict.posts.martusivka.slug
        }
    ]

    return (
        <section className="w-full py-12 md:py-24 lg:py-24">
            <div className="container px-4 md:px-6">

                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
                    {posts.map((post, index) => (
                        <Link href={`/${lang}/blog/${post.slug}`} key={`post-${index}`}>
                        <Card key={`post-${index}`} className="flex flex-col items-center text-center">
                            <div className="w-full h-[300px]">
                                <Image
                                    src={post.img}
                                    key={`image-${index}`}
                                    alt="A responsive, SEO-optimized image of Tailwind CSS design in action"
                                    width={400}
                                    height={400}
                                    className="rounded-xl shadow-xl object-cover w-full h-full"
                                    priority
                                />
                            </div>
                            <CardHeader className="flex flex-col items-center">



                                <CardTitle className="text-2xl">{post.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-500">
                                    {post.description}
                                </p>
                            </CardContent>
                        </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
