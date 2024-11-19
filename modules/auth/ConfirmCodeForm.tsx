import {
  useCanResetPasswordMutation,
  useForgotPasswordMutation,
} from "@/lib/api/authApi";
import { Button, InputOTP } from "@/components/ui";
import { RtkError } from "@/typings/error";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import cookie from "js-cookie";
import { Loader } from "@/components/Loader";

export const ConfirmCodeForm = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [forgotPassword, { isLoading: isCodeLoading, isSuccess: isSent }] =
    useForgotPasswordMutation();
  const [
    canResetPassword,
    { isLoading: isCanResetPasswordLoading, isSuccess },
  ] = useCanResetPasswordMutation();

  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [otp, setOtp] = useState("");

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const userEmail = cookie.get("userEmail");

  const onClickSendCode = () => {
    forgotPassword({ email: userEmail as string })
      .unwrap()
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = useCallback(() => {
    canResetPassword({ email: userEmail ? userEmail : "", code: otp })
      .unwrap()
      .then(() => {
        router.push("/reset-password");
      })
      .catch((error: RtkError) => {
        if (error.data?.code === "code-mismatch") {
          setError("root", { message: t("invalid-code-error") });
        }

        if (error.data?.code === "code-expired") {
          setError("root", { message: t("expired-code") });
        }

        if (error.data?.code === "code-not-found") {
          setError("root", { message: t("send-new-code") });
        }
      });
  }, [canResetPassword, otp]);

  if (isCanResetPasswordLoading || isCodeLoading || isSuccess) {
    return <Loader className="absolute top-0 left-0" />;
  }

  if (userEmail === null) {
    router.push("/forgot-password");
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {isSent && <p className="text-green-500 text-sm">{t("code-sent")}</p>}
      <p className="text-red-500 text-sm">{errors.root?.message}</p>
      <InputOTP length={6} onChange={handleOtpChange} />
      <Button
        type="submit"
        text={t("verify-button")}
        state={otp.length === 6 ? "default" : "disabled"}
      />
      <div className="flex text-sm">
        <p className="mr-1">{t("resent-text-confirm")}</p>
        <button onClick={onClickSendCode} type="button" className="link-text">
          {t("resent-button-confirm")}
        </button>
      </div>
    </form>
  );
};
