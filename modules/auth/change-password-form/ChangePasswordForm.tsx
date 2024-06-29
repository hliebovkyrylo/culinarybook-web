import {
  ChangePasswordFormData,
  changePasswordSchema
} from "./schemas/changePasswordSchema";
import {
  AuthIconButton,
  usePasswordVisibility
} from "../common";
import { useChangePasswordMutation } from "@/lib/api/authApi";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { RtkError } from "@/typings/error";
import { useTranslation } from "next-i18next";
import { Button, Input } from "@/components/ui";
import { EyeIcon, SlashEyeIcon } from "@/icons";
import { Loader } from "@/components/Loader";

export const ChangePasswordForm = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [changePassword, { isLoading: isLoadingChangingPassword, isSuccess }] = useChangePasswordMutation();

  const { passwordInputType, confirmPasswordInputType, togglePasswordVisibility, toggleConfirmPasswordVisibility } = usePasswordVisibility();

  const { handleSubmit, register, setError, formState: { errors, isValid } } = useForm<ChangePasswordFormData>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: zodResolver(changePasswordSchema)
  });

  const onSubmit = useCallback((values: ChangePasswordFormData) => {
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

  if (isLoadingChangingPassword || isSuccess) {
    return <Loader className="absolute top-0 left-0" />;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <p className="text-red-500 text-sm">{errors.oldPassword?.message}</p>
      <Input
        type={"text"}
        color={errors.oldPassword ? "danger" : "default"}
        placeholder={t('old-password-placeholder')}
        {...register('oldPassword')}
      />
      <p className={`text-red-500 text-sm ${!errors.newPassword && 'hidden'}`}>{errors.newPassword?.message}</p>
      <div className="relative">
        <Input
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
      <p className={`text-red-500 text-sm ${!errors.newPassword && 'hidden'}`}>{errors.confirmNewPassword?.message}</p>
      <div className="relative">
        <Input
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
      <Button
        state={isLoadingChangingPassword ? "loading" : isValid ? "default" : "disabled"}
        text={t('change-button')}
        className="mt-3"
      />
    </form>
  )
}