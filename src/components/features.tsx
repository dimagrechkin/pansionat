import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/config"
import Image from "next/image"

export default async function Features({
  lang
}: {
  lang: Locale
}) {
  const dict = await getDictionary(lang)

  const features = [
    {
      img: "/images/features-1.jpeg",
      title: dict.features.tabs.title,
      description: dict.features.tabs.description
    },
    {
      img: "/images/features-2.jpeg",
      title: dict.features.bookmarks.title,
      description: dict.features.bookmarks.description
    },
    {
      img: "/images/features-3.jpeg",
      title: dict.features.share.title,
      description: dict.features.share.description
    },
    {
      img: "/images/features-4.jpeg",
      title: dict.features.security.title,
      description: dict.features.security.description
    },
    {
      img: "/images/features-5.jpeg",
      title: dict.features.sport.title,
      description: dict.features.sport.description
    },
    {
      img: "/images/features-6.jpeg",
      title: dict.features.food.title,
      description: dict.features.food.description
    }
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            {dict.features.title}
          </h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {dict.features.description}
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 mt-8">
          {features.map((feature, index) => (
            <Card key={`feature-${index}`} className="flex flex-col items-center text-center">
              <CardHeader className="flex flex-col items-center">
                <div className="mb-2 w-[250px] h-[250px] flex items-center justify-center">
                  <Image
                    src={feature.img}
                    key={`image-${index}`}
                    alt="A responsive, SEO-optimized image of Tailwind CSS design in action"
                    width={400}
                    height={400}
                    className="rounded-full shadow-lg w-full h-full object-cover"
                    sizes="(min-width: 1024px) 250px, (min-width: 768px) 300px, 400px"
                  />
                </div>                <CardTitle className="text-2xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  {feature.description}
                </p>
              </CardContent>
            </Card>))}
        </div>
      </div>
    </section>
  )
}
