import { useSendCodeMutation, useSignUpMutation } from "@/lib/api/authApi";
import { useRouter }                              from "next/router";
import { useForm }                                from "react-hook-form";
import { SignUpFormData, signUpSchema }           from "./schemas/signUpSchema";
import { zodResolver }                            from "@hookform/resolvers/zod";
import { useCallback }                            from "react";
import { RtkError }                               from "@/typings/error";
import { useTranslation }                         from "next-i18next";
import { Button, Input }                          from "@/components/ui";
import { AuthGoogleButton, AuthIconButton }       from "../common";
import { EyeIcon, SlashEyeIcon }                  from "@/icons";
import Link                                       from "next/link";
import { baseUrl }                                from "@/lib/api";
import { usePasswordVisibility }                  from "../common/hooks/usePasswordVisibility";
import Cookies                                    from "js-cookie";

export const SignUpForm = () => {
  const { t }  = useTranslation("common");
  const router = useRouter();

  const [signUp, { isLoading: isSignUpLoading, isSuccess }]                        = useSignUpMutation();
  const [sendCode, { isLoading: isSendCodeLoading, isSuccess: isSuccessCodeSent }] = useSendCodeMutation();

  const { handleSubmit, setError, formState: { errors, isValid }, register } = useForm<SignUpFormData>({
    defaultValues: {
      email          : '',
      username       : '',
      name           : '',
      password       : '',
      image          : '',
      confirmPassword: ''
    },
    resolver: zodResolver(signUpSchema)
  });

  const { passwordInputType, confirmPasswordInputType, togglePasswordVisibility, toggleConfirmPasswordVisibility } = usePasswordVisibility();

  const onSubmit = useCallback(async (values: Omit<SignUpFormData, "confirmPassword">) => {
    signUp(values).unwrap()
      .then((res) => {
        Cookies.set('access_token', res.access_token)
        sendCode().unwrap().then(() => {
          router.push("/verify-account")
        })
      })
      .catch((error: RtkError) => {
        if (error.data.code === 'email-already-exist') {
          setError('email', { message: t('email-exist-error') });
        }

        if (error.data.code === 'username-already-exist') {
          setError('username', { message: t('username-exist-error') });
        }
      })
  }, [signUp, sendCode, setError]);

  const handleLogin = () => {
    router.push(`${baseUrl}/auth/google`)
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <label className="text-red-500 text-sm">{errors.email?.message}</label>
      <Input
        type="email"
        color={errors.email ? "danger" : "default"}
        placeholder={t('email-placeholder')}
        {...register('email')}
        disabled={isSignUpLoading || isSendCodeLoading || isSuccess || isSuccessCodeSent}
      />
      <label className={`text-red-500 text-sm ${!errors.name?.message && "hidden"}`}>{errors.username?.message}</label>
      <Input
        type="text"
        color={errors.username ? "danger" : "default"}
        placeholder={t('username-placeholder-signup')}
        {...register('username')}
        disabled={isSignUpLoading || isSendCodeLoading || isSuccess || isSuccessCodeSent}
      />
      <label className={`text-red-500 text-sm ${!errors.name?.message && "hidden"}`}>{errors.name?.message}</label>
      <Input
        type="text"
        color={errors.name ? "danger" : "default"}
        placeholder={t('name-placeholder-signup')}
        {...register('name')}
        disabled={isSignUpLoading || isSendCodeLoading || isSuccess || isSuccessCodeSent}
      />
      <div className="relative">
        <label className="text-red-500 text-sm">{errors.password?.message}</label>
        <Input
          type={passwordInputType}
          color={errors.password ? "danger" : "default"}
          placeholder={t('password-placeholder')}
          {...register('password')}
          disabled={isSignUpLoading || isSendCodeLoading || isSuccess || isSuccessCodeSent}
        />
        <AuthIconButton
          firstIcon={<EyeIcon className="icon-eye" />}
          secondIcon={<SlashEyeIcon className="icon-eye" />}
          onClick={togglePasswordVisibility}
          inputType={passwordInputType}
        />
      </div>
      <div className="relative">
        <label className="text-red-500 text-sm">{errors.confirmPassword?.message}</label>
        <Input
          type={confirmPasswordInputType}
          color={errors.confirmPassword ? "danger" : "default"}
          placeholder={t('confirm-password-placeholder')}
          {...register('confirmPassword')}
          disabled={isSignUpLoading || isSendCodeLoading || isSuccess || isSuccessCodeSent}
        />
        <AuthIconButton
          firstIcon={<EyeIcon className="icon-eye" />}
          secondIcon={<SlashEyeIcon className="icon-eye" />}
          onClick={toggleConfirmPasswordVisibility}
          inputType={confirmPasswordInputType}
        />
      </div>
      <div className="flex my-2">
        <p className="mr-1">{t('have-account')}</p>
        <Link className="link-text" href={"/sign-in"}>{t('signUp-link')}</Link>
      </div>
      <Button
        type="submit"
        state={isSignUpLoading || isSendCodeLoading || isSuccess || isSuccessCodeSent ? "loading" : isValid ? "default" : "disabled"}
        text={t('signUp-button')}
      />
      <p className="flex justify-center text-[#949494]">{t('or')}</p>
      <AuthGoogleButton onClick={handleLogin} disabled={isSignUpLoading || isSendCodeLoading || isSuccess || isSuccessCodeSent} />
    </form>
  )
}