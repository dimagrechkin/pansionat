"use client"

import { Phone } from "lucide-react";
import Link from "next/link";

interface CallActionProps {
  dict: any
}

export function CallAction({ dict }: CallActionProps) {

  return (
    
    <section className="w-full py-12 md:py-24 lg:py-24 bg-gradient-to-r from-primary/20 to-transparent">
        <Link href="#contact-form">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="text-2xl font-black flex justify-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              <Phone className="h-16 w-16" />
            </div>
            <div className="text-2xl font-black flex justify-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              {dict.home.contact.questions.title}
            </div>
            <div className="text-xl flex justify-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              {dict.home.contact.questions.contactNow}
            </div>
          </div>
        </div>
        </Link>
      </section>
  )
}
