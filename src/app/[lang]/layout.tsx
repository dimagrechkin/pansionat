import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { locales } from '@/i18n/config'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import { Toaster } from "react-hot-toast"
import { Analytics } from "@vercel/analytics/react"
import { BreadcrumbWrapper } from "@/components/breadcrumb-wrapper"
import { PhoneNumberLine } from "@/components/PhoneNumberLine";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const url = process.env.NEXT_PUBLIC_APP_URL || 'http://pansionat-sion.com.ua'

  return {
    title: {
      default: dict.metadata.title,
      template: `%s | ${dict.metadata.title}`
    },
    description: dict.metadata.description,
    keywords: dict.metadata.keywords,
    authors: [{ name: 'sion' }],
    metadataBase: new URL(url),
    alternates: {
      canonical: `${url}/${lang}`,
      languages: {
        'ru': `${url}/ru`,
        'uk': `${url}/uk`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang,
      url: `${url}/${lang}`,
      title: dict.metadata.title,
      description: dict.metadata.description,
      siteName: dict.common.brand
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.metadata.title,
      description: dict.metadata.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
 

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={inter.className}>
        <Analytics/>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          // enableSystem
          disableTransitionOnChange
        >
          <Toaster position="top-center" />
          <div className="relative flex min-h-screen flex-col ">
            <div className="glass rounded-t-3xl z-50 ">
              <PhoneNumberLine dict={dict}/>
              {/* <div className="text-sm flex justify-center text-gray-500 font-bold ">
                <MapPinHouse className="h-5 w-5 pr-1" />
                <div className="tracking-wider font-medium">{dict.contactBar.branches}</div>
              </div>
              <div className="text-sm flex justify-center text-gray-500 font-bold ">
                <Clock className="h-5 w-5 pr-1" />
                <div className="tracking-wider font-medium">{dict.contactBar.workingHours}</div>
              </div> */}
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-transparent pointer-events-none rounded-3xl" />
            <div className="absolute inset-0 bg-gradient-radial-t from-primary/20 to-transparent pointer-events-none rounded-3xl" />
            <div className="absolute inset-0 bg-gradient-radial-b from-primary/20 to-transparent pointer-events-none rounded-3xl" />

            <Navbar lang={lang} />
            <main className="relative flex-1 ">
              <BreadcrumbWrapper lang={lang} dict={dict} />
              {children}
            </main>
            {/* <Footer lang={lang} /> */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
