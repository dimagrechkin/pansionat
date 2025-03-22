import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import Link from "next/link"
import type { Locale } from "@/i18n/config"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { getDictionary } from "@/i18n/get-dictionary"

interface MobileNavProps {
  lang: Locale
  dict: any
}

export async function MobileNav({ lang, dict }: MobileNavProps) {
  const getDict = await getDictionary(lang)
  const posts = getDict.blog.posts
  const filials = getDict.partners.partnersList

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          {/* <span className="sr-only">切换菜单</span> */}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[240px] sm:w-[300px] glass-nav border-0 bg-background/80 backdrop-blur-sm"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background/5 to-transparent pointer-events-none" />
        <nav className="relative flex flex-col space-y-4 mt-8">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem className="pb-4" value="item-1">
              <SheetClose asChild>
                <Link
                  href={`/${lang}`}
                  className=" transition-colors hover:text-primary"
                >
                  {dict.nav.home}
                </Link>
              </SheetClose>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>{lang === 'ru' ? "Услуги" : "Послуги"}</AccordionTrigger>
              <AccordionContent className="flex flex-col space-y-2">
                {posts.map(post => (
                  <SheetClose asChild key={post.id}>
                    <Link className="transition-colors hover:text-primary" key={post.id} href={`/${lang}/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </SheetClose>
                ))}

              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>{lang === 'ru' ? "Филиалы и партнеры" : "Філіали та партнери"}</AccordionTrigger>
              <AccordionContent className="flex flex-col space-y-2">
                {filials.map(filial => (
                  <SheetClose asChild key={filial.id}>
                    <Link className="transition-colors hover:text-primary font-xs" key={filial.id} href={`/${lang}/partners/${filial.slug}`}>
                      {filial.name}
                    </Link>
                  </SheetClose>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <SheetClose asChild>
            <Link
              href={`/${lang}/blog`}
              className=" transition-colors hover:text-primary"
            >
              {dict.nav.blog}
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href={`/${lang}/pricing`}
              className="transition-colors hover:text-primary"
            >
              {dict.nav.pricing}
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href={`/${lang}/partners`}
              className="transition-colors hover:text-primary"
            >
              {dict.nav.partners}
            </Link>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
