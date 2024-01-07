"use client";
import { useState } from "react";

export function PhoneNumberInput() {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, ""); // remove non-digit characters

    if (value.length > 3 && value.length <= 6)
      value = value.slice(0, 3) + "-" + value.slice(3);
    else if (value.length > 6)
      value =
        value.slice(0, 3) + "-" + value.slice(3, 6) + "-" + value.slice(6);

    setValue(value);
  };

  return (
    <input
      className="rounded-md px-4 py-2 bg-inherit border mb-6"
      name="phone"
      placeholder="Your Phone Number"
      value={value}
      onChange={handleChange}
      required
    />
  );
}
