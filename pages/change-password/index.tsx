"use client"

import { renderMetaTags }            from "@/pages/meta";
import { 
  AuthIconButton, 
  AuthInput, 
  FormLayout
}                                    from "@/components/auth";
import { Loader }                    from "@/components/shared";
import { usePasswordVisibility }     from "@/hooks/usePasswordVisibility";
import { 
  EyeIcon, 
  SlashEyeIcon 
}                                    from "@/icons";
import { useChangePasswordMutation } from "@/lib/api/authApi";
import { IAppState }                 from "@/lib/store";
import { RtkError }                  from "@/typings/error";
import { Button }                    from "@/ui";
import { zodResolver }               from "@hookform/resolvers/zod";
import Link                          from "next/link";
import { useRouter }                 from "next/navigation";
import { useCallback }               from "react";
import { useForm }                   from "react-hook-form";
import { useTranslation }            from "react-i18next";
import { useSelector }               from "react-redux";
import { z }                         from "zod";

const changePasswordSchema = z.object({
  oldPassword       : z.string().min(8),
  newPassword       : z.string().min(8),
  confirmNewPassword: z.string().min(8),
}).superRefine((schema, ctx) => {
  if (schema.confirmNewPassword !== schema.newPassword) {
    ctx.addIssue({
      path   : ['confirmPassword'],
      code   : 'custom',
      message: `Passwords don't match`
    });
  }
});

export type FormData = z.infer<typeof changePasswordSchema>;

const ChangePassword = () => {
  const { t }  = useTranslation();
  const router = useRouter();

  const accessToken = useSelector((state: IAppState) => state.auth.accessToken);

  const [ changePassword, { isLoading: isLoadingChangingPassword, isSuccess } ] = useChangePasswordMutation();

  const { passwordInputType, confirmPasswordInputType, togglePasswordVisibility, toggleConfirmPasswordVisibility } = usePasswordVisibility();

  const { handleSubmit, register, setError, formState: { errors, isValid } } = useForm<FormData>({
    defaultValues: {
      oldPassword       : '',
      newPassword       : '',
      confirmNewPassword: '',
    },
    resolver: zodResolver(changePasswordSchema)
  });

  const onSubmit = useCallback((values: FormData) => {
    changePassword(values).unwrap().then(() => {
      router.push('/');
    }).catch((error: RtkError) => {
      if (error.data.code === 'old-password-mismatch') {
        setError('oldPassword', { message: t('incorrect-old-password') });
      }

      if (error.data.code === 'passwords-missmatch') {
        setError('confirmNewPassword', { message: t('passwords-missmatch') });
      }
    })
  }, []);

  if (!accessToken) {
    router.push('/sign-in');
    return null; 
  }

  if (isLoadingChangingPassword || isSuccess) {
    return <Loader />;
  }

  return (
    <>
      {renderMetaTags({ title: `${t('title-change')} | Culinarybook` })}
      <FormLayout
        title={t('title-change')}
        className="w-full max-w-[384px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="my-6">
          <p className="text-red-500 text-sm">{errors.oldPassword?.message}</p>
          <AuthInput
            type={"text"}
            color={errors.oldPassword ? "danger" : "default"}
            placeholder={t('old-password-placeholder')}
            {...register('oldPassword')}
          />
          <p className="text-red-500 text-sm">{errors.newPassword?.message}</p>
          <div className="relative mt-2">
            <AuthInput
              type={passwordInputType}
              color={errors.newPassword ? "danger" : "default"}
              placeholder={t('new-password-placeholder')}
              {...register('newPassword')}
            />
            <AuthIconButton
              firstIcon={<EyeIcon className="icon-eye" />}
              secondIcon={<SlashEyeIcon className="icon-eye" />}
              onClick={togglePasswordVisibility}
              inputType={passwordInputType}
            />
          </div>
          <p className="text-red-500 text-sm">{errors.confirmNewPassword?.message}</p>
          <div className="relative mt-2">
            <AuthInput
              type={confirmPasswordInputType}
              color={errors.confirmNewPassword ? "danger" : "default"}
              placeholder={t('confirm-new-password-placeholder')}
              {...register('confirmNewPassword')}
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
          text={t('change-button')}
        />
      </FormLayout>
      <Link href="/" className="absolute left-6 bottom-6 flex items-center text-[#727272]">{t('back-home')}</Link>
    </>
  )
};

export default ChangePassword;