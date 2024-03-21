"use client"

import { AuthNumberInput, FormLayout }  from "@/components/auth";
import { useEffect, useRef, useState }  from "react";
import Link                             from "next/link";
import { Button }                       from "@/ui";

const VerifyAccount = () => {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const inputRefs           = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) {
      return;
    }
  
    const newDigits  = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
  
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && index > 0 && digits[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <FormLayout title="Verify account">
      <div>
        {digits.map((digit, index) => (
          <AuthNumberInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref as HTMLInputElement)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            digit={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            className=" mt-6 mr-2 mb-12"
          />
        ))}
      </div>
      <Button
        text="Check code"
        className="!w-[300px]"
        isActive={digits.every(digit => digit !== '')}
      />
      <div className="flex mt-4">
        <p className="mr-1">Didn't receive the code?</p>
        <Link className="link-text" href={"/sign-in"}>Resent it</Link>
      </div>
    </FormLayout>
  )
};

export default VerifyAccount;
