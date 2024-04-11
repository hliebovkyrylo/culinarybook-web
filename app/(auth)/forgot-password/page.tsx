"use client"

import { AuthInput, FormLayout } from "@/components/auth";
import { Button }                from "@/ui";
import { useTranslation }        from "react-i18next";

const ForgotPassword = () => {
  const { t } = useTranslation();
  return (
    <FormLayout title={t('email-title')}>
      <div className="my-8 max-w-xs">
        <AuthInput
          type="email"
          errorMessage=""
          color="default"
          placeholder={t('email-placeholder')}
          className="mb-2 max-w-xs"
          onChangeValue={(event) => {}}
        />
        <Button
          isActive={true}
          text={t('next-button')}
          className={"max-w-xs min-w-[260px] mt-3"}
        />
      </div>
    </FormLayout>
  )
}

export default ForgotPassword;