import Link from "next/link"
import Image from 'next/image'
import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/config"
import { NavbarActions } from "./navbar-actions"
import { MobileNav } from "./mobile-nav"
// import logo_green from "..//../public/images/log_green1.png";
import blue_logo from "..//../public/images/blue_logo.png";

export default async function Navbar({
  lang
}: {
  lang: Locale
}) {
  const dict = await getDictionary(lang)

  return (
    <header className="sticky top-0 z-50 w-full glass-nav">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center space-x-2">
          <Link href={`/${lang}`} className="flex items-center space-x-2">
            <Image className="h-6 w-6" src={blue_logo} alt={"Sion Pansionat Logo"} width={30} height={30} />
            {/* <Chrome className="h-6 w-6" /> */}
            <span className="font-bold text-sm">{dict.common.brand}</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex-1 md:flex-none">
            <div className="hidden items-center space-x-4 md:flex">
              <Link href={`/${lang}/blog`} className="text-sm font-medium transition-colors hover:text-primary">
                {dict.nav.blog}
              </Link>
              <Link href={`/${lang}/pricing`} className="text-sm font-medium transition-colors hover:text-primary">
                {dict.nav.pricing}
              </Link>
              <Link href={`/${lang}/partners`} className="text-sm font-medium transition-colors hover:text-primary">
                {dict.nav.partners}
              </Link>
            </div>
          </div>
          <NavbarActions lang={lang} dict={dict} />
          <MobileNav lang={lang} dict={dict} />
        </nav>
      </div>
    </header>
  )
}
