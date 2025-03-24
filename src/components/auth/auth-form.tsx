"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import PhoneInput from "../PhoneInput";

interface RegistrationFormProps {
  dict: any;
}

export function AuthForm({ dict }: RegistrationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  // const [dict, setDict] = useState<any>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+380");
  // const [phoneNumber, setPhoneNumber] = useState("+380");
  const [comment, setComment] = useState("");
  const [phoneError, setError] = useState("");

  


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
            <Label htmlFor="name">{dict.authForm.label}</Label>
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
            <Label htmlFor="phone">{dict.authForm.telephone}</Label>
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
            <Label htmlFor="comment">{dict.authForm.comment}</Label>
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
            {dict.authForm.send}
          </Button>
        </div>
      </form>
    </div>
  );
}
