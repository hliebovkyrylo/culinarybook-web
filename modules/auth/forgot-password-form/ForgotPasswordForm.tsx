import { useForgotPasswordMutation } from "@/lib/api/authApi";
import { useRouter }                 from "next/router";
import { useForm }                   from "react-hook-form";
import { 
  ForgotPasswordFormData, 
  forgotPasswordSchema 
}                                    from "./schemas/forgotPasswordSchema";
import { zodResolver }               from "@hookform/resolvers/zod";
import { useCallback }               from "react";
import { RtkError }                  from "@/typings/error";
import { useTranslation }            from "next-i18next";
import { Button, Input }             from "@/components/ui";
import cookie                        from "js-cookie";
import { Loader }                    from "@/components/Loader";

export const ForgotPasswordForm = () => {
  const { t }  = useTranslation('common');
  const router = useRouter();

  const [forgotPassword, { isLoading: isSendCodeLoading, isSuccess }] = useForgotPasswordMutation();

  const { handleSubmit, setError, formState: { errors, isValid }, register } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = useCallback(async (values: ForgotPasswordFormData) => {
    forgotPassword(values).unwrap().then(() => {
      cookie.set('userEmail', values.email);
      router.push('/confirm-code');
    }).catch((error: RtkError) => {
      if (error.data.code === 'user-not-found') {
        setError('email', { message: t('user-not-found-error') });
      }
    })
  }, [forgotPassword]);

  if (isSendCodeLoading || isSuccess) {
    return <Loader className="absolute top-0 left-0" />
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-8 flex flex-col gap-2">
      <label className="text-red-500 text-sm">{errors.email?.message}</label>
      <Input
        type="email"
        color={errors.email ? "danger" : "default"}
        placeholder={t('email-placeholder')}
        {...register('email')}
      />
      <Button
        state={isValid ? "default" : "disabled"}
        text={t('next-button')}
        className={"max-w-xs min-w-[260px] mt-3"}
      />
    </form>
  )
}