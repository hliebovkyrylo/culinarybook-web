"use client"

import { AuthNumberInput, FormLayout }  from "@/components/auth";
import { Button }                       from "@/ui";
import { ArrowRightSquare }             from "@/icons";
import { useTranslation }               from "react-i18next";
import { useDigitInput }                from "@/hooks/useDigitInput";

const VerifyAccount = () => {
  const { t } = useTranslation();

  const { digits, inputRefs, handleChange, handleKeyDown } = useDigitInput();

  return (
    <>
      <FormLayout title={t('title-confirm')} className="w-full max-w-[394px]">
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
          <p className="mr-1">{t('resent-text-confirm')}</p>
          <button className="link-text">{t('resent-button-confirm')}</button>
        </div>
      </FormLayout>
      <button className="absolute left-6 bottom-6 flex items-center text-[#727272]">{t('logout-button-confirm')}<ArrowRightSquare className=" ml-3" /></button>
    </>
  )
};

export default VerifyAccount;