import React from "react";
import { Input } from "./ui/input";

type PhoneInputProps = {
  onChange?: (value: string) => void;
};

const PhoneInput: React.FC<PhoneInputProps> = ({
  phoneNumber,
  setPhoneNumber,
  handlePhoneBlur,
  error
}) => {

  // A simple regex that checks:
  // - Must start with +380
  // - Then contain exactly 9 more digits => total length of 13 characters

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // If user tries to remove/alter "+380", re-insert it
    if (!newValue.startsWith("+380")) {
      setPhoneNumber("+380");
      return;
    }

    // Update local state
    setPhoneNumber(newValue);
  };

  return (
    <div>
      <Input
        id="phoneNumber"
        type="tel"
        value={phoneNumber}
        onChange={handleChange}
        onBlur={handlePhoneBlur}
        className="rounded-[0.75rem]"
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default PhoneInput;
