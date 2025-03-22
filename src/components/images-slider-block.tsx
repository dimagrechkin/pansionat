import { getDictionary } from "@/i18n/get-dictionary";

import ImageSlider from './ImageSlider'


export default async function SliderBlock({ lang, sliderType  }): JSX.Element {
  const dict = await getDictionary(lang)

  return (
    <section className="w-full xs:max-w-screen-xl mx-auto overflow-hidden">
      <div className="container px-4 sm:px-6 md:px-8 mx-auto max-w-7xl">
        <div className="flex flex-col items-center space-y-4 text-center">
          { sliderType ==='reviews' && <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
           {lang === "ru"? "Отзывы. Что о нас говорят:": "Відгуки: що про нас говорять?"}
          </h2>}
          <ImageSlider sliderType={sliderType} dict={dict} />
        </div>
      </div>
    </section>
  )
}
