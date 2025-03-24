"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { useState, useEffect } from "react";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import PhoneInput from "../PhoneInput";

interface RegistrationFormProps {
  lang: Locale;
}

export function AuthForm({ lang }: RegistrationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [dict, setDict] = useState<any>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+380");
  // const [phoneNumber, setPhoneNumber] = useState("+380");
  const [comment, setComment] = useState("");
  const [phoneError, setError] = useState("");

  // Load your i18n dictionary
  useEffect(() => {
    getDictionary(lang).then(setDict);
  }, [lang]);

  if (!dict) return null;


  // A simple regex that checks:
  // - Must start with +380
  // - Then contain exactly 9 more digits => total length of 13 characters
  const phoneRegex = /^\+380\d{9}$/;

    const handlePhoneBlur = () => {
      if (!phoneRegex.test(phone)) {
        setError("Невірний формат номеру телефону. Має бути +380XXXXXXXXX (всього 13 символів).");
      } else {
        setError("");
      }
      
      // // If you want to pass the valid phone number up to parent
      // if (onChange) {
      //   onChange(phoneNumber);
      // }
    };

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (!name.trim()) {
        throw new Error("Введіть ім'я");
      }
      if (!phone.trim() || phoneError) {
        throw new Error("Введіть номер телефону");
      }

      // Insert the data into your Supabase table (example: "registrations")
      const { error } = await supabase
        .from("registrations")
        .insert([{ name, phone, comment }]);

      if (error) throw error;

      toast.success("Реєстрація успішна!");
      // Optionally clear inputs or navigate somewhere
      setName("");
      setPhone("");
      setComment("");
      // router.push(`/${lang}`) // if you want to redirect
    } catch (error: any) {
      toast.error(error.message || "Помилка реєстрації");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Имя</Label>
            <Input
              id="name"
              type="text"
              disabled={isLoading}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-[0.75rem]"
            />
          </div>

          {/* Phone */}
          <div className="grid gap-2">
            <Label htmlFor="phone">Телефон</Label>
            <PhoneInput
              id="phone"
              type="text"
              disabled={isLoading}
              phoneNumber={phone}
              setPhoneNumber={setPhone}
              handlePhoneBlur={handlePhoneBlur}
              error={phoneError}
            />
            {/* <Input /> */}
          </div>

          {/* Comment */}
          <div className="grid gap-2">
            <Label htmlFor="comment">Коментар</Label>
            <Input
              id="comment"
              type="text"
              disabled={isLoading}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="rounded-[0.75rem]"
            />
          </div>

          {/* Submit Button */}
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Відправити
          </Button>
        </div>
      </form>
    </div>
  );
}
