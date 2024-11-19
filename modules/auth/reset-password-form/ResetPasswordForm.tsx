import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "./schemas/resetPasswordSchema";
import { useResetPasswordMutation } from "@/lib/api/authApi";
import { useGetMeQuery } from "@/lib/api/userApi";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { RtkError } from "@/typings/error";
import { useTranslation } from "next-i18next";
import { usePasswordVisibility } from "../common/hooks";
import { Button, Input } from "@/components/ui";
import { AuthIconButton } from "../common";
import { EyeIcon, SlashEyeIcon } from "@/icons";
import cookie from "js-cookie";
import { Loader } from "@/components/Loader";

export const ResetPasswordForm = () => {
  const { t } = useTranslation("common");
  const { data: user, isLoading } = useGetMeQuery();

  const router = useRouter();

  const [resetPassword, { isLoading: isResetPasswordLoading, isSuccess }] =
    useResetPasswordMutation();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const userEmail = cookie.get("userEmail");

  const onSubmit = useCallback(
    async (values: ResetPasswordFormData) => {
      resetPassword({ ...values, email: userEmail as string })
        .unwrap()
        .then(() => {
          router.push("/sign-in");
          cookie.remove("userEmail");
        })
        .catch((error: RtkError) => {
          if (error.data.code === "Forbidden") {
            setError("password", { message: t("no-update-access-error") });
          }

          if (error.data.code === "password-mismatch") {
            setError("root", { message: "Passwords missmatch" });
          }
        });
    },
    [resetPassword]
  );

  const {
    passwordInputType,
    confirmPasswordInputType,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = usePasswordVisibility();

  if (isResetPasswordLoading || isLoading || isSuccess) {
    return <Loader className="absolute top-0 left-0" />;
  }

  if (user && user.canResetPassword === false) {
    router.push("/");
    return null;
  } else if (userEmail === null) {
    router.push("/sign-in");
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <p className="text-red-500 text-sm">{errors.password?.message}</p>
      <div className="relative">
        <Input
          type={passwordInputType}
          color={errors.root ? "danger" : "default"}
          placeholder={t("new-password-placeholder")}
          {...register("password")}
        />
        <AuthIconButton
          firstIcon={<EyeIcon className="icon-eye" />}
          secondIcon={<SlashEyeIcon className="icon-eye" />}
          onClick={togglePasswordVisibility}
          inputType={passwordInputType}
        />
      </div>
      <div className="relative">
        <Input
          type={confirmPasswordInputType}
          color={errors.root ? "danger" : "default"}
          placeholder={t("confirm-new-password-placeholder")}
          {...register("confirmPassword")}
        />
        <AuthIconButton
          firstIcon={<EyeIcon className="icon-eye" />}
          secondIcon={<SlashEyeIcon className="icon-eye" />}
          onClick={toggleConfirmPasswordVisibility}
          inputType={confirmPasswordInputType}
        />
      </div>
      <Button
        state={isValid ? "default" : "disabled"}
        text={t("title-change")}
        className="mt-3"
      />
    </form>
  );
};
