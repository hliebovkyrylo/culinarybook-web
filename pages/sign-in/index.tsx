import { z }                      from "zod";
import Link                       from "next/link";
import { 
  AuthIconButton, 
  AuthInput, 
  FormLayout}                     from "@/components/auth";
import { EyeIcon, SlashEyeIcon }  from "@/icons";
import { Button }                 from "@/ui";
import { useTranslation }         from "next-i18next";
import { usePasswordVisibility }  from "@/hooks/usePasswordVisibility";
import { useSignInMutation }      from "@/lib/api/authApi";
import { useForm }                from "react-hook-form";
import { zodResolver }            from "@hookform/resolvers/zod";
import { useCallback }            from "react";
import { RtkError }               from "@/typings/error";
import { Loader }                 from "@/components/shared";
import { useSelector }            from "react-redux";
import { IAppState }              from "@/lib/store";
import { useRouter }              from "next/navigation";
import { renderMetaTags }         from "@/pages/meta";
import { GetStaticPropsContext }  from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const signInSchema = z.object({
  email   : z.string().email(),
  password: z.string().min(8),
});

export type FormData = z.infer<typeof signInSchema>;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const SignUp = () => {
  const { t }       = useTranslation('common');
  const accessToken = useSelector((state: IAppState) => state.auth.accessToken);

  const router = useRouter();

  const [ signIn, { isLoading: isSignInLoading, isSuccess } ] = useSignInMutation();

  const { passwordInputType, togglePasswordVisibility } = usePasswordVisibility();
  
  const { handleSubmit, setError, formState: { errors, isValid }, register } = useForm<FormData>({
    defaultValues: {
      email   : '',
      password: '',
    },
    resolver: zodResolver(signInSchema)
  });

  const onSubmit = useCallback(async (values: FormData) => {
    signIn(values).unwrap().then(() => {
      router.push('/');
    }).catch((error: RtkError) => {
      if (error.data.code === 'wrong-data') {
        setError('email', { message: t('wrong-data-error') })
      }

      if (error.data.code === 'user-not-found') {
        setError('email', { message: t('user-not-found-error') })
      }
    })
  }, [signIn]);

  if (isSignInLoading || isSuccess) {
    return <Loader />
  }

  if (accessToken) {
    router.push('/')
  }

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)} title={t('signUp-link')}>
      {renderMetaTags({ title: `${t('signUp-link')} | Culinarybook`, description: t('meta-sign-in-description') })}
      <div className="my-8 max-w-xs">
        <label className="text-red-500 text-sm">{errors.email?.message}</label>
        <AuthInput
          type="email"
          color="default"
          placeholder={t('email-placeholder')}
          className="mb-2 max-w-xs"
          {...register('email')}
        />
        <div className="relative max-w-xs">
          <label className="text-red-500 text-sm">{errors.password?.message}</label>
          <AuthInput
            type={passwordInputType}
            color="default"
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
        <div>
          <Link className="link-text text-sm" href={"/forgot-password"}>{t('forgot-password')}</Link>
        </div>
        <Button
          isActive={isValid}
          text={t('signIn-button')}
          className={"max-w-xs min-w-[260px] mt-3"}
        />
      </div>
      <div className="flex">
        <p className="mr-1">{t('dont-have-account')}</p>
        <Link className="link-text" href={"/sign-up"}>{t('signIn-link')}</Link>
      </div>
    </FormLayout>
  )
};

export default SignUp;