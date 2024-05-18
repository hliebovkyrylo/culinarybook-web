import { AuthNumberInput, FormLayout }  from "@/components/auth";
import { Button }                       from "@/components/ui";
import { useTranslation }               from "react-i18next";
import { useDigitInput }                from "@/hooks/useDigitInput";
import { useCallback }                  from "react";
import { 
  useCanResetPasswordMutation,
  useForgotPasswordMutation
}                                       from "@/lib/api/authApi";
import { RtkError }                     from "@/typings/error";
import { useForm }                      from "react-hook-form";
import { Loader }                       from "@/components/shared";
import { useRouter }                    from "next/navigation";
import { renderMetaTags }               from "@/pages/meta";
import { GetStaticPropsContext }        from "next";
import { serverSideTranslations }       from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const VerifyAccount = () => {
  const { t } = useTranslation('common');

  const router = useRouter();

  const [ forgotPassword, { isLoading: isCodeLoading, isSuccess: isSent } ] = useForgotPasswordMutation();
  const [ canResetPassword, { isLoading: isCanResetPasswordLoading, isSuccess } ]      = useCanResetPasswordMutation();

  const { handleSubmit, formState: { errors }, setError } = useForm();

  const { digits, inputRefs, handleChange, handleKeyDown } = useDigitInput();
  const allDigits = digits.concat().toString().replace(/,/g, '');

  const userEmail = localStorage.getItem('userEmail');

  const onClickSendCode = () => {
    forgotPassword({ email: userEmail as string }).unwrap().catch((error) => {
      console.log(error);
    });
  };

  const onSubmit = useCallback(() => {
    canResetPassword({ email: userEmail ? userEmail : '', code: allDigits }).unwrap().then(() => {
      router.push('/reset-password')
    }).catch((error: RtkError) => {
      if (error.data?.code === 'code-mismatch') {
        setError('root', { message: t('invalid-code-error') });
      }

      if (error.data?.code === 'code-expired') {
        setError('root', { message: t('expired-code') })
      }

      if (error.data?.code === 'code-not-found') {
        setError('root', { message: t('send-new-code') })
      }
    });
  }, [canResetPassword, allDigits])

  if (isCanResetPasswordLoading || isCodeLoading || isSuccess) {
    return <Loader />;
  }

  if (userEmail === null) {
    router.push('/forgot-password');
  }

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)} title={t('title-confirm')} className="w-full max-w-[394px]">
      {renderMetaTags({ title: `${t('title-confirm')} | Culinarybook` })}
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
  )
};

export default VerifyAccount;
