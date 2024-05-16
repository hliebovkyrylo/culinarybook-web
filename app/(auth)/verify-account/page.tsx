"use client"

import { AuthNumberInput, FormLayout }  from "@/components/auth";
import { Button }                       from "@/ui";
import { ArrowRightSquare }             from "@/icons";
import { useTranslation }               from "react-i18next";
import { useDigitInput }                from "@/hooks/useDigitInput";
import { useCallback }                  from "react";
import { 
  useSendCodeMutation, 
  useSignOutMutation, 
  useVerifyAccountMutation 
}                                       from "@/lib/api/authApi";
import { RtkError }                     from "@/typings/error";
import { useForm }                      from "react-hook-form";
import { useGetMeQuery }                from "@/lib/api/userApi";
import { useRouter }                    from "next/navigation";
import { Loader }                       from "@/components/shared";
import { renderMetaTags }               from "@/app/meta";

const VerifyAccount = () => {
  const { t } = useTranslation();

  const { data: user, isLoading } = useGetMeQuery();

  const router = useRouter();

  const [ sendCode, { isSuccess: isSent } ]          = useSendCodeMutation();
  const [ signOut, { isLoading: isLoadingSignOut } ] = useSignOutMutation();

  const { digits, inputRefs, handleChange, handleKeyDown } = useDigitInput();
  const allDigits = digits.concat().toString().replace(/,/g, '');

  const [ verifyAccount, { isLoading: IsLoadingVerify, isSuccess } ] = useVerifyAccountMutation();

  const { handleSubmit, formState: { errors }, setError } = useForm();

  const onClickSendCode = () => {
    sendCode().unwrap().catch((error) => {
      console.log(error);
    });
  };

  const onClickSignOut = () => {
    signOut().unwrap().then(() => {
      router.push('/');
    }).catch((error) => {
      console.log(error);
    });
  };

  const onSubmit = useCallback(() => {
    verifyAccount({ code: allDigits }).unwrap().then(() => {
      router.push('/');
    }).catch((error: RtkError) => {
      if (error.data?.code === 'wrong-entered-code') {
        setError('root', { message: t('invalid-code-error') });
      }

      if (error.data?.code === 'code-expired') {
        setError('root', { message: t('expired-code') })
      }

      if (error.data?.code === 'code-not-found') {
        setError('root', { message: t('send-new-code') })
      }
    });
  }, [verifyAccount, allDigits])

  if (isLoading || IsLoadingVerify || isLoadingSignOut || isSuccess || isLoadingSignOut) {
    return <Loader />
  }

  if (!user) {
    router.push('/sign-in')
  }

  if (user && user.isVerified) {
    router.push('/');
    return null;
  }

  return (
    <>
      {renderMetaTags({ title: `${t('title-verify')} | Culinarybook` })}
      <FormLayout onSubmit={handleSubmit(onSubmit)} title={t('title-verify')} className="w-full max-w-[394px]">
        {isSent && (
          <p className="text-green-500 text-sm">{t('code-sent')}</p>
        )}
        <p className="text-red-500 text-sm">{errors.root?.message}</p>
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
          type="submit"
          text={t('verify-button')}
          isActive={digits.every(digit => digit !== '')}
        />
        <div className="flex mt-4">
          <p className="mr-1">{t('resent-text-confirm')}</p>
          <button onClick={onClickSendCode} type="button" className="link-text">{t('resent-button-confirm')}</button>
        </div>
      </FormLayout>
      <button type="button" onClick={onClickSignOut} className="absolute left-6 bottom-6 flex items-center text-[#727272]">{t('logout-button-confirm')} <ArrowRightSquare className=" ml-3" /></button>
    </>
  )
};

export default VerifyAccount;