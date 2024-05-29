import { Button }         from "@/components/ui"
import { GoogleIcon }     from "@/icons";
import { useTranslation } from "next-i18next";
import React              from "react";

interface IAuthGoogleButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void,
}

export const AuthGoogleButton = ({
  onClick,
  ...props
}: IAuthGoogleButton) => {
  const { t } = useTranslation("common");
  return (
    <Button 
      onClick={onClick}
      leftIcon={<GoogleIcon className="w-10 icon-color px-2" />}
      className="dark:!bg-[#222] bg-white !text-[#9D9D9D] !justify-start dark:hover:!bg-[#2e2e2e] hover:!bg-slate-100"
      text={t('continue-google-button')}
      state="default"
      type="button"
      {...props}
    />
  )
}