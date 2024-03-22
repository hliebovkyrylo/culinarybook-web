"use client"

import { AuthNumberInput, FormLayout }  from "@/components/auth";
import { useEffect, useRef, useState }  from "react";
import Link                             from "next/link";
import { Button }                       from "@/ui";
import { ArrowRightSquare }             from "@/icons";

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
    <>
      <FormLayout title="Verify account" className="w-full max-w-[364px]">
        <div className="flex justify-between">
          {digits.map((digit, index) => (
            <AuthNumberInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref as HTMLInputElement)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              digit={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="mt-6 mb-12"
            />
          ))}
        </div>
        <Button
          text="Check code"
          isActive={digits.every(digit => digit !== '')}
        />
        <div className="flex mt-4">
          <p className="mr-1">Didn't receive the code?</p>
          <button className="link-text">Resent it</button>
        </div>
      </FormLayout>
      <button className="absolute left-6 bottom-6 flex items-center text-[#727272]">Sign out <ArrowRightSquare className=" ml-3" /></button>
    </>
  )
};

export default VerifyAccount;
