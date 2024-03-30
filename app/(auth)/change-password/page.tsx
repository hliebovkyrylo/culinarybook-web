"use client"

import { 
  AuthIconButton, 
  AuthInput, 
  FormLayout
}                                from "@/components/auth";
import { usePasswordVisibility } from "@/hooks/usePasswordVisibility";
import { 
  EyeIcon, 
  SlashEyeIcon 
}                                from "@/icons";
import { Button }                from "@/ui";
import Link                      from "next/link";
import { useTranslation }        from "react-i18next";

const ChangePassword = () => {
  const { t } = useTranslation();

  const { passwordInputType, confirmPasswordInputType, togglePasswordVisibility, toggleConfirmPasswordVisibility } = usePasswordVisibility();

  return (
    <>
      <FormLayout
        title={t('title-change')}
        className="w-full max-w-[384px]"
      >
        <div className="my-6">
          <AuthInput
            type={"text"}
            errorMessage=""
            color="default"
            placeholder={t('old-password-placeholder')}
          />
          <div className="relative mt-2">
            <AuthInput
              type={passwordInputType}
              errorMessage=""
              color="default"
              placeholder={t('new-password-placeholder')}
            />
            <AuthIconButton
              firstIcon={<EyeIcon className="icon-eye" />}
              secondIcon={<SlashEyeIcon className="icon-eye" />}
              onClick={togglePasswordVisibility}
              inputType={passwordInputType}
            />
          </div>
          <div className="relative mt-2">
            <AuthInput
              type={confirmPasswordInputType}
              errorMessage=""
              color="default"
              placeholder={t('confirm-new-password-placeholder')}
            />
            <AuthIconButton
              firstIcon={<EyeIcon className="icon-eye" />}
              secondIcon={<SlashEyeIcon className="icon-eye" />}
              onClick={toggleConfirmPasswordVisibility}
              inputType={confirmPasswordInputType}
            />
          </div>
        </div>
        <Button
          isActive={true}
          text={t('change-button')}
        />
      </FormLayout>
      <Link href="/" className="absolute left-6 bottom-6 flex items-center text-[#727272]">{t('back-home')}</Link>
    </>
  )
};

export default ChangePassword;