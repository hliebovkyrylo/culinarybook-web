"use client"

import { 
  AuthIconButton, 
  AuthInput, 
  FormLayout
}                                from "@/components/auth";
import { useState }              from "react";
import { EyeIcon, SlashEyeIcon } from "@/icons";
import { Button }                from "@/ui";
import { useTranslation }        from "react-i18next";
import { usePasswordVisibility } from "@/hooks/usePasswordVisibility";

const ResetPassword = () => {
  const { t } = useTranslation();

  const { passwordInputType, confirmPasswordInputType, togglePasswordVisibility, toggleConfirmPasswordVisibility } = usePasswordVisibility();

  return (
    <FormLayout
      title={t('title-new-password')}
      className="min-w-[243px]"
    >
      <div className="my-6 min-w-[283px]">
        <div className="relative">
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
        isActive = {true}
        text={t('title-change')}
      />
    </FormLayout>
  )
};

export default ResetPassword;