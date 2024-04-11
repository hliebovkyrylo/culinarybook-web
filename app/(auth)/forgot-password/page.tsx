"use client"

import { AuthInput, FormLayout }     from "@/components/auth";
import { Loader }                    from "@/components/shared";
import { useForgotPasswordMutation } from "@/lib/api/authApi";
import { RtkError }                  from "@/typings/error";
import { Button }                    from "@/ui";
import { zodResolver }               from "@hookform/resolvers/zod";
import { useRouter }                 from "next/navigation";
import { useCallback }               from "react";
import { useForm }                   from "react-hook-form";
import { useTranslation }            from "react-i18next";
import { z }                         from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email()
});

export type FormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const { t }  = useTranslation();
  const router = useRouter();

  const [ forgotPassword, { isLoading: isSendCodeLoading } ] = useForgotPasswordMutation();

  const { handleSubmit, setError, formState: { errors, isValid }, register } = useForm<FormData>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = useCallback(async (values: FormData) => {
    forgotPassword(values).unwrap().then(() => {
      router.push('/confirm-code');
    }).catch((error: RtkError) => {
      if (error.data.code === 'user-not-found') {
        setError('email', { message: t('user-not-found-error') });
      }
    })
  }, [forgotPassword]);

  if (isSendCodeLoading) {
    return <Loader />
  }

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)} title={t('email-title')}>
      <div className="my-8 max-w-xs">
        <label className="text-red-500 text-sm">{errors.email?.message}</label>
        <AuthInput
          type="email"
          color={errors.email ? "danger" : "default"}
          placeholder={t('email-placeholder')}
          className="mb-2 max-w-xs"
          {...register('email')}
        />
        <Button
          isActive={isValid}
          text={t('next-button')}
          className={"max-w-xs min-w-[260px] mt-3"}
        />
      </div>
    </FormLayout>
  )
}

export default ForgotPassword;