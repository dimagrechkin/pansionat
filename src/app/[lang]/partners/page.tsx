import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/config"
import type { Metadata } from "next"
import { Check } from "lucide-react"

type PromisedParams = Promise<{ lang: Locale }>


export default async function PartnersPage({
  params,
}: {
  params: PromisedParams
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const { partners } = dict

  return (
    <main className="container py-12 md:py-24">
      <div className="flex flex-col items-center space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          {partners.title}
        </h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
          {partners.description}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {partners.partnersList?.map(partner => (
          <Link key={partner.id} href={`/${lang}/partners/${partner.slug}`}>
            <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="font-bold">{partner.price}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{partner.name}</span>
                </div>
                {/* <p className="text-sm text-muted-foreground mt-2">{partner.description}</p> */}
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {partner.features?.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button
                  className="w-full"
                  variant="default"
                >
                  Зателефонувати
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                >
                  Дізнатись більше
                </Button>
              </CardFooter>          
              </Card>          
            </Link>
        ))}
      </div>

      {/* If you want a “Load More” button like in the blog page: */}
      <div className="flex justify-center mt-12">
        {/* <Button variant="outline">
          Завантажити більше
        </Button> */}
      </div>
    </main>
  )
}

export async function generateMetadata({
  params,
}: {
  params: PromisedParams
}): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const url = process.env.NEXT_PUBLIC_APP_URL || "http://pansionat-sion.com.ua"

  return {
    title: dict.partners.title,
    description: dict.partners.description,
    alternates: {
      canonical: `${url}/${lang}/partners`,
      languages: {
        ru: `${url}/ru/partners`,
        uk: `${url}/uk/partners`,
      },
    },
    openGraph: {
      title: dict.partners.title,
      description: dict.partners.description,
      url: `${url}/${lang}/partners`,
    },
  }
}
