"use client"

import { 
  AuthIconButton, 
  AuthInput, 
  FormLayout
}                                   from "@/components/auth";
import { EyeIcon, SlashEyeIcon }    from "@/icons";
import { Button }                   from "@/ui";
import { useTranslation }           from "react-i18next";
import { usePasswordVisibility }    from "@/hooks/usePasswordVisibility";
import { z }                        from "zod";
import { useResetPasswordMutation } from "@/lib/api/authApi";
import { useForm }                  from "react-hook-form";
import { zodResolver }              from "@hookform/resolvers/zod";
import { useCallback }              from "react";
import { RtkError }                 from "@/typings/error";
import { Loader }                   from "@/components/shared";
import { useRouter }                from "next/navigation";

const resetPasswordSchema = z.object({
  password       : z.string().min(8),
  confirmPassword: z.string()
}).superRefine((schema, ctx) => {
  if (schema.confirmPassword !== schema.password) {
    ctx.addIssue({
      path   : ['confirmPassword'],
      code   : 'custom',
      message: `Passwords don't match`
    });
  }
});

export type FormData = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const [ resetPassword, { isLoading: isResetPasswordLoading } ] = useResetPasswordMutation();

  const { handleSubmit, register, setError, formState: { errors, isValid } } = useForm<FormData>({
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(resetPasswordSchema)
  });

  const userEmail = localStorage.getItem('userEmail');

  const onSubmit = useCallback((async (values: FormData) => {
    resetPassword({...values, email: userEmail as string}).unwrap().then(() => {
      router.push('/sign-in');
      localStorage.removeItem('userEmail');
    }).catch((error: RtkError) => {
      if (error.data.code === 'Forbidden') {
        setError('password', { message: t('no-update-access-error') });
      }

      if (error.data.code === 'password-mismatch') {
        setError('root', { message: 'Passwords missmatch' });
      }
    })
  }), [resetPassword])

  const { passwordInputType, confirmPasswordInputType, togglePasswordVisibility, toggleConfirmPasswordVisibility } = usePasswordVisibility();

  if (isResetPasswordLoading) {
    return <Loader />
  }

  if (userEmail === null) {
    router.push('/forgot-password');
  }

  return (
    <FormLayout
      title={t('title-new-password')}
      className="min-w-[243px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="my-6 min-w-[283px]">
        <p className="text-red-500 text-sm">{errors.password?.message}</p>
        <div className="relative">
          <AuthInput
            type={passwordInputType}
            color={errors.root ? 'danger': 'default'}
            placeholder={t('new-password-placeholder')}
            {...register('password')}
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
            color={errors.root ? 'danger': 'default'}
            placeholder={t('confirm-new-password-placeholder')}
            {...register('confirmPassword')}
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
        isActive={isValid}
        text={t('title-change')}
      />
    </FormLayout>
  )
};

export default ResetPassword;