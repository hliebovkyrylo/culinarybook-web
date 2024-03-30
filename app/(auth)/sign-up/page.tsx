"use client"

import { useState }              from "react";
import { z }                     from "zod";
import Link                      from "next/link";
import { 
  AuthIconButton, 
  AuthInput, 
  FormLayout
}                                from "@/components/auth";
import { EyeIcon, SlashEyeIcon } from "@/icons";
import { Button }                from "@/ui";
import { useTranslation }        from "react-i18next";
import { usePasswordVisibility } from "@/hooks/usePasswordVisibility";

const signUpSchema = z.object({
  email   : z.string().email(),
  username: z.string().min(2),
  name    : z.string(),
  password: z.string().min(8),
  image   : z.string(),
});

export type FormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const { t } = useTranslation();

  const [emailInput, setEmailInput]                     = useState<string>("");
  const [usernameInput, setUsernameInput]               = useState<string>("");
  const [nameInput, setNameInput]                       = useState<string>("");
  const [passwordInput, setPasswordInput]               = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");

  const isFieldsEmpty = emailInput !== "" && passwordInput !== "" && usernameInput !== "" && nameInput !== "" && confirmPasswordInput !== "";

  const { passwordInputType, confirmPasswordInputType, togglePasswordVisibility, toggleConfirmPasswordVisibility } = usePasswordVisibility();

  return (
    <FormLayout title={t('title-signup')}>
      <div className="my-8 max-w-xs">
        <AuthInput
          type="email"
          errorMessage=""
          color="default"
          placeholder={t('email-placeholder')}
          className="mb-2 max-w-xs"
          onChangeValue={(event) => setEmailInput(event.target.value)}
        />
        <AuthInput
          type="text"
          errorMessage=""
          color="default"
          placeholder={t('username-placeholder-signup')}
          className="mb-2 max-w-xs"
          onChangeValue={(event) => setUsernameInput(event.target.value)}
        />
        <AuthInput
          type="text"
          errorMessage=""
          color="default"
          placeholder={t('name-placeholder-signup')}
          className="mb-2 max-w-xs"
          onChangeValue={(event) => setNameInput(event.target.value)}
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
        <div className="relative max-w-xs">
          <AuthInput
            type={confirmPasswordInputType}
            errorMessage=""
            color="default"
            placeholder={t('confirm-password-placeholder')}
            className="mb-2 max-w-xs"
            onChangeValue={(event) => setConfirmPasswordInput(event.target.value)}
          />
          <AuthIconButton 
            firstIcon={<EyeIcon className="icon-eye" />}
            secondIcon={<SlashEyeIcon className="icon-eye" />}
            onClick={toggleConfirmPasswordVisibility}
            inputType={confirmPasswordInputType}
          />
        </div>
        <Button
          isActive={isFieldsEmpty}
          text={t('signUp-button')}
          className={"max-w-xs mt-3"}
        />
      </div>
      <div className="flex">
        <p className="mr-1">{t('have-account')}</p>
        <Link className="link-text" href={"/sign-in"}>{t('signUp-link')}</Link>
      </div>
    </FormLayout>
  )
};

export default SignUp;