import {
  useSendCodeMutation,
  useSignOutMutation,
  useVerifyAccountMutation,
} from "@/lib/api/authApi";
import { Button, InputOTP } from "@/components/ui";
import { ArrowRightSquare } from "@/icons";
import { useGetMeQuery } from "@/lib/api/userApi";
import { RtkError } from "@/typings/error";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader } from "@/components/Loader";
import Cookies from "js-cookie";

export const VerifyAccountForm = () => {
  const { t } = useTranslation();
  const { data: user, isLoading } = useGetMeQuery();

  const router = useRouter();

  const [sendCode, { isSuccess: isSent }] = useSendCodeMutation();
  const [signOut, { isLoading: isLoadingSignOut }] = useSignOutMutation();

  const [verifyAccount, { isLoading: IsLoadingVerify, isSuccess }] =
    useVerifyAccountMutation();

  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [otp, setOtp] = useState("");

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const onClickSendCode = () => {
    sendCode()
      .unwrap()
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickSignOut = () => {
    signOut()
      .unwrap()
      .then(() => {
        Cookies.remove("access_token");
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = useCallback(() => {
    verifyAccount({ code: otp })
      .unwrap()
      .then(() => {
        router.push("/");
      })
      .catch((error: RtkError) => {
        if (error.data?.code === "wrong-entered-code") {
          setError("root", { message: t("invalid-code-error") });
        }

        if (error.data?.code === "code-expired") {
          setError("root", { message: t("expired-code") });
        }

        if (error.data?.code === "code-not-found") {
          setError("root", { message: t("send-new-code") });
        }
      });
  }, [verifyAccount, otp]);

  if (
    isLoading ||
    IsLoadingVerify ||
    isLoadingSignOut ||
    isSuccess ||
    isLoadingSignOut
  ) {
    return <Loader />;
  }

  if (user && user.isVerified) {
    router.push("/");
    return null;
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
      <button
        type="button"
        onClick={onClickSignOut}
        className="absolute left-6 bottom-6 flex items-center text-[#727272] hover:text-[#a3a3a3]"
      >
        {t("logout-button-confirm")} <ArrowRightSquare className=" ml-3" />
      </button>
    </form>
  );
};
