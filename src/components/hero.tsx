import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/config"
import Image from "next/image"
import HeroButtons from "./HeroButtons"

export default async function Hero({
  lang
}: {
  lang: Locale
}) {
  const dict = await getDictionary(lang)


  return (
    <section className="w-full py-12 md:pt-24 lg:pt-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            {dict.home.hero.title}
          </h1>
          <p className="pb-4 mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {dict.home.hero.description}
          </p>
          <Image
          className="rounded-xl"
            src="/images/pp2.jpg" // Replace with your image path
            alt="Responsive image"
            width={900} // Max width for desktop
            height={748} // Max height for desktop
            sizes="(max-width: 768px) 640px, (max-width: 1200px) 1024px, 1920px"
            priority // Optional: Load it eagerly
          />
          {/* <Image
            alt="A responsive, SEO-optimized image of Tailwind CSS design in action"
            width={400} // Adjust width as needed
            height={300} // Adjust height as needed
            className="rounded-lg shadow-lg w-full h-auto"
            priority // Ensures the image is loaded eagerly
          /> */}
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <HeroButtons
              learnMoreLabel={dict.home.hero.learnMore}
              watchDemoLabel={dict.home.hero.watchDemo}
            />
            {/* <Button size="lg">{dict.home.hero.learnMore}</Button>
            <Button size="lg" variant="outline">{dict.home.hero.watchDemo}</Button> */}
          </div>
        </div>
      </div>
    </section>
  )
}
