import { Button, Input } from "@/components/ui"
import { useTranslation } from "next-i18next"
import { AuthGoogleButton, AuthIconButton } from "../common";
import { EyeIcon, SlashEyeIcon } from "@/icons";
import Link from "next/link";
import { useSignInMutation } from "@/lib/api/authApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormData, signInSchema } from "./schemas/signInSchema";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { RtkError } from "@/typings/error";
import { baseUrl } from "@/lib/api";
import { usePasswordVisibility } from "../common/hooks/usePasswordVisibility";
import Cookies from "js-cookie";

export const SignInForm = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [signIn, { isLoading: isSignInLoading, isSuccess }] = useSignInMutation();

  const handleLogin = () => {
    router.push(`${baseUrl}/auth/google`)
  };

  const { passwordInputType, togglePasswordVisibility } = usePasswordVisibility();

  const { handleSubmit, setError, formState: { errors, isValid }, register } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInSchema)
  });

  const onSubmit = useCallback(async (values: SignInFormData) => {
    signIn(values).unwrap().then((res) => {
      Cookies.set('access_token', res.access_token)
      router.push('/');
    }).catch((error: RtkError) => {
      if (error.data.code === 'wrong-data') {
        setError('email', { message: t('wrong-data-error') })
      }

      if (error.data.code === 'user-not-found') {
        setError('email', { message: t('user-not-found-error') })
      }
    })
  }, [signIn]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <label className="text-red-500 text-sm">{errors.email?.message}</label>
      <Input
        color="default"
        placeholder={t('email-placeholder')}
        {...register('email')}
        disabled={isSignInLoading || isSuccess}
      />
      <div className="relative">
        <label className="text-red-500 text-sm">{errors.password?.message}</label>
        <Input
          type={passwordInputType}
          color="default"
          placeholder={t('password-placeholder')}
          {...register('password')}
          disabled={isSignInLoading || isSuccess}
        />
        <AuthIconButton
          firstIcon={<EyeIcon className="icon-eye" />}
          secondIcon={<SlashEyeIcon className="icon-eye" />}
          onClick={togglePasswordVisibility}
          inputType={passwordInputType}
        />
      </div>
      <div>
        <Link className="link-text text-sm" href={"/forgot-password"}>{t('forgot-password')}</Link>
      </div>
      <Button
        text={t('signIn-button')}
        state={isSignInLoading || isSuccess ? "loading" : isValid ? "default" : "disabled"}
        type="submit"
      />
      <p className="flex justify-center text-[#949494]">{t('or')}</p>
      <AuthGoogleButton onClick={handleLogin} />
      <div className="flex my-2">
        <p className="mr-1">{t('dont-have-account')}</p>
        <Link className="link-text" href={"/sign-up"}>{t('signIn-link')}</Link>
      </div>
    </form>
  )
}