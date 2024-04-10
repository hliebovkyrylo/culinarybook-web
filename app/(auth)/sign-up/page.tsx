"use client"

import { useCallback }           from "react";
import { z }                     from "zod";
import Link                      from "next/link";
import { 
  AuthIconButton, 
  AuthInput, 
  FormLayout
}                                from "@/components/auth";
import { 
  useSendCodeMutation, 
  useSignUpMutation 
}                                from "@/lib/api/authApi";
import { EyeIcon, SlashEyeIcon } from "@/icons";
import { Button }                from "@/ui";
import { useTranslation }        from "react-i18next";
import { usePasswordVisibility } from "@/hooks/usePasswordVisibility";
import { useForm }               from "react-hook-form";
import { zodResolver }           from "@hookform/resolvers/zod";
import { RtkError }              from "@/typings/error";
import { Loader }                from "@/components/shared";
import { useRouter }             from "next/navigation";

const signUpSchema = z.object({
  email          : z.string().email(),
  username       : z.string().min(2).refine(value => !/\s/.test(value), {
    message: "Имя пользователя не должно содержать пробелы"
  }),
  name           : z.string().min(2),
  password       : z.string().min(8),
  image          : z.string(),
  confirmPassword: z.string().default(''),
}).superRefine((schema, ctx) => {
  if (schema.confirmPassword !== schema.password) {
    ctx.addIssue({
      path   : ['confirmPassword'],
      code   : 'custom',
      message: `Passwords don't match`
    });
  }
});

export type FormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const [ signUp, { isLoading: isSignUpLoading } ]     = useSignUpMutation();
  const [ sendCode, { isLoading: isSendCodeLoading } ] = useSendCodeMutation();

  const { handleSubmit, setError, formState: { errors, isValid }, register } = useForm<FormData>({
    defaultValues: {
      email          : '',
      username       : '',
      name           : '',
      password       : '',
      image          : '',
      confirmPassword: ''
    },
    resolver: zodResolver(signUpSchema)
  })

  const { passwordInputType, confirmPasswordInputType, togglePasswordVisibility, toggleConfirmPasswordVisibility } = usePasswordVisibility();

  const onSubmit = useCallback(async (values: Omit<FormData, "confirmPassword">) => {
    signUp(values).unwrap()
      .then(() => {
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
  
  if (isSignUpLoading || isSendCodeLoading) {
    return <Loader />
  }

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)} title={t('title-signup')}>
      <div className="my-8 max-w-xs">
        <label className="text-red-500 text-sm">{errors.email?.message}</label>
        <AuthInput
          type="email"
          color={errors.email ? "danger" : "default"}
          placeholder={t('email-placeholder')}
          className="mb-2 max-w-xs"
          {...register('email')}
        />
        <label className="text-red-500 text-sm">{errors.username?.message}</label>
        <AuthInput
          type="text"
          color={errors.username ? "danger" : "default"}
          placeholder={t('username-placeholder-signup')}
          className="mb-2 max-w-xs"
          {...register('username')}
        />
        <label className="text-red-500 text-sm">{errors.name?.message}</label>
        <AuthInput
          type="text"
          color={errors.name ? "danger" : "default"}
          placeholder={t('name-placeholder-signup')}
          className="mb-2 max-w-xs"
          {...register('name')}
        />
        <div className="relative max-w-xs">
          <label className="text-red-500 text-sm">{errors.password?.message}</label>
          <AuthInput
            type={passwordInputType}
            color={errors.password ? "danger" : "default"}
            placeholder={t('password-placeholder')}
            className="mb-2 max-w-xs"
            {...register('password')}
          />
          <AuthIconButton 
            firstIcon={<EyeIcon className="icon-eye" />}
            secondIcon={<SlashEyeIcon className="icon-eye" />}
            onClick={togglePasswordVisibility}
            inputType={passwordInputType}
          />
        </div>
        <div className="relative max-w-xs">
          <label className="text-red-500 text-sm">{errors.confirmPassword?.message}</label>
          <AuthInput
            type={confirmPasswordInputType}
            color={errors.confirmPassword ? "danger" : "default"}
            placeholder={t('confirm-password-placeholder')}
            className="mb-2 max-w-xs"
            {...register('confirmPassword')}
          />
          <AuthIconButton 
            firstIcon={<EyeIcon className="icon-eye" />}
            secondIcon={<SlashEyeIcon className="icon-eye" />}
            onClick={toggleConfirmPasswordVisibility}
            inputType={confirmPasswordInputType}
          />
        </div>
        <Button
          type="submit"
          isActive={isValid}
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