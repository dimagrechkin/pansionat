"use client"

import { Phone } from "lucide-react";

interface PhoneNumberLineProps {
  dict: any
}

export function PhoneNumberLine({ dict }: PhoneNumberLineProps) {
  const handleLearnMoreClick = () => {
    window.location.href = `tel:+380997055969`;
  };

  return (
  <div className="text-sm flex justify-center text-gray-500 font-bold " onClick={handleLearnMoreClick}>
    <Phone className="h-5 w-5 pt-1 pr-1" />
    <div className=" tracking-wider font-medium">{dict.contactBar.phone}</div>
  </div>
  )
}
