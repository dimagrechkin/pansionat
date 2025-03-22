import { Button } from "@/components/ui/button";
import { Megaphone, Phone, Mail, MapPin, Clock } from "lucide-react";
import Features from "@/components/features";
import Hero from "@/components/hero";
import About from "@/components/about";
import Slider from "@/components/images-slider-block";
import Reason from "@/components/reason";
import RecentPosts from "@/components/recent-post";
import FAQ from "@/components/faq";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { AuthForm } from "@/components/auth/auth-form";
import { CallAction } from "@/components/call-action";
// import blue_logo from "..//../public/images/blue_logo.png";

import MapClient from "@/components/MapClient";

export default async function Home({ params }: { params: { lang: Locale } }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="flex flex-col items-center w-full ">
      <Hero lang={lang} />
      <section className="w-full py-12 md:py-24 bg-gradient-to-r from-primary/20 to-transparent">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="text-2xl font-bold flex justify-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              <Megaphone className="h-16 w-16" />
            </div>
            <div className="text-2xl font-bold flex justify-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              {dict.home.promo.price}
            </div>
            <div className="text-2xl font-bold flex justify-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              {dict.home.promo.offer}
            </div>
            <div className="text-2xl font-bold flex justify-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              {dict.home.promo.deadline}
            </div>
          </div>
        </div>
      </section>
      <About lang={lang} />
      <Slider lang={lang} />
      <Reason lang={lang} />
      <CallAction dict={dict} />
      <Features lang={lang} />
      <Slider lang={lang} sliderType="reviews" />
      <FAQ lang={lang} />

      <section
        className="w-full max-w-md mx-auto p-6"
        id="contact-form"
        style={{ scrollMarginTop: "70px" }}
      >
        <h2 className="text-2xl font-bold text-center mb-8">
          {dict.home.contact.consultation.title}
        </h2>
        <p className="text-center text-gray-500 mb-6">
          {dict.home.contact.consultation.description}
        </p>
        <AuthForm lang={lang} />
      </section>

      <RecentPosts lang={lang} />

      <div className="w-full max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-8">
          {dict.home.contact.details.title}
        </h2>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary rounded-full">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <span>{dict.home.contact.details.branches}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary rounded-full">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div className="space-y-2">
              {dict.home.contact.details.phones.map((phone, idx) => (
                <a
                  key={idx}
                  href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                  className="block hover:text-primary transition-colors"
                >
                  {phone}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary rounded-full">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <a
              href={`mailto:${dict.home.contact.details.email}`}
              className="hover:text-primary transition-colors"
            >
              {dict.home.contact.details.email}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary rounded-full">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <span>{dict.home.contact.details.workingHours}</span>
          </div>
        </div>
      </div>

      <div className="bg-white-700 mx-auto my-5 w-[98%] h-[480px]">
        <MapClient />
      </div>

      <section className="w-full py-12 md:py-24 lg:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {dict.home.cta.title}
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {dict.home.cta.description}
            </p>
            <Button variant={"default"} size="lg" className="mt-4">
              
            {/* <Image className="h-6 w-6" src={blue_logo} alt={"Sion Pansionat Logo"} width={30} height={30} /> */}

              {dict.home.cta.button}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
