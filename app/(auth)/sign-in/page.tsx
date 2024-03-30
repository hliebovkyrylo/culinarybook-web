"use client"

import { useState }              from "react";
import { z }                     from "zod";
import Link                      from "next/link";
import { 
  AuthIconButton, 
  AuthInput, 
  FormLayout}                    from "@/components/auth";
import { EyeIcon, SlashEyeIcon } from "@/icons";
import { Button }                from "@/ui";
import { useTranslation }        from "react-i18next";
import { usePasswordVisibility } from "@/hooks/usePasswordVisibility";

const signInSchema = z.object({
  email   : z.string().email(),
  password: z.string(),
});

export type FormData = z.infer<typeof signInSchema>;

const SignUp = () => {
  const { t } = useTranslation();

  const [emailInput, setEmailInput]       = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  const isFieldsEmpty = emailInput !== "" && passwordInput !== "";

  const { passwordInputType, togglePasswordVisibility } = usePasswordVisibility();

  return (
    <FormLayout title={t('signUp-link')}>
      <div className="my-8 max-w-xs">
        <AuthInput
          type="email"
          errorMessage=""
          color="default"
          placeholder={t('email-placeholder')}
          className="mb-2 max-w-xs"
          onChangeValue={(event) => setEmailInput(event.target.value)}
        />
        <div className="relative max-w-xs">
          <AuthInput
            type={passwordInputType}
            errorMessage=""
            color="default"
            placeholder={t('password-placeholder')}
            className="mb-2 max-w-xs"
            onChangeValue={(event) => setPasswordInput(event.target.value)}
          />
          <AuthIconButton 
            firstIcon={<EyeIcon className="icon-eye" />}
            secondIcon={<SlashEyeIcon className="icon-eye" />}
            onClick={togglePasswordVisibility}
            inputType={passwordInputType}
          />
        </div>
        <div>
          <Link className="link-text text-sm" href={"/#"}>{t('forgot-password')}</Link>
        </div>
        <Button
          isActive={isFieldsEmpty}
          text={t('signIn-button')}
          className={"max-w-xs min-w-[260px] mt-3"}
        />
      </div>
      <div className="flex">
        <p className="mr-1">{t('dont-have-account')}</p>
        <Link className="link-text" href={"/sign-up"}>{t('signIn-link')}</Link>
      </div>
    </FormLayout>
  )
};

export default SignUp;