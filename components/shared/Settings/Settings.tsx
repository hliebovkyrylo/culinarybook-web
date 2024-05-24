import { SettingsPanel }                        from "./SettingsPanel"
import { useCallback, useState }                from "react";
import Link                                     from "next/link";
import { ArrowRightSquare, LockIcon }           from "@/icons";
import { useTranslation }                       from "react-i18next";
import { useGetMeQuery, useUpdateUserMutation } from "@/lib/api/userApi";
import { z }                                    from "zod";
import { useForm }                              from "react-hook-form";
import { zodResolver }                          from "@hookform/resolvers/zod";
import { useImageUpload }                       from "@/hooks/useUploadImage";
import { RtkError }                             from "@/typings/error";
import { Loader }                               from "../Loader";
import { Button, Input }                        from "@/components/ui";
import { Checkbox }                             from "@/components/ui/checkbox";

const changeUserDataSchema = z.object({
  name           : z.string().min(2),
  username       : z.string().min(6).refine(value => !/\s/.test(value), {
    message: "The username must not contain spaces"
  }),
  isPrivate      : z.boolean(),
  image          : z.string(),
  backgroundImage: z.string(),
});

export type ChangeUserDataFormData = z.infer<typeof changeUserDataSchema>;

export const Settings = ({ closeSettings }: { closeSettings: () => void }) => {
  const { t } = useTranslation();

  const { data: user, refetch: refetchUser }               = useGetMeQuery();
  const [ updateUser, { isLoading: isLoadingUpdateUser } ] = useUpdateUserMutation();

  const { image: selectedUserImage, handleImageChange }                                    = useImageUpload();
  const { image: selectedBackgroundImage, handleImageChange: handleBackgroundImageChange } = useImageUpload();
  const [checked, setChecked]                                                              = useState<boolean>(!!user?.isPrivate);

  const { handleSubmit, register, formState: { errors, isValid }, setError } = useForm<ChangeUserDataFormData>({
    defaultValues: {
      username       : user?.username,
      name           : user?.name,
      isPrivate      : user?.isPrivate,
      image          : user?.image,
      backgroundImage: user?.backgroundImage,
    },
    resolver: zodResolver(changeUserDataSchema)
  });

  const onSubmit = useCallback(async (values: ChangeUserDataFormData) => {
    updateUser({ 
      ...values, 
      image          : selectedUserImage || user?.image as string, 
      backgroundImage: selectedBackgroundImage || user?.backgroundImage as string, 
      isPrivate      : checked 
    }).unwrap().then(() => {
      refetchUser();
      closeSettings();
    }).catch((error: RtkError) => {
      if (error.data.code === 'such-username-exist') {
        setError('username', { message: "" });
      }
    })
  }, [updateUser, selectedUserImage, selectedBackgroundImage, checked])

  const handleCheck = () => {
    setChecked(!checked);
  }

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    closeSettings();
  };

  const handleInsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  if (isLoadingUpdateUser) {
    return <Loader className="absolute top-0 left-0 z-[1000]" />
  }
  
  return (
    <div className="flex px-2 justify-center items-center fixed top-0 left-0 w-full h-screen settings-background z-[60]" onClick={handleOutsideClick}>
      <section className="w-full max-w-[600px] h-[635px] p-6 rounded-xl main-background" onClick={handleInsideClick}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between h-full">
          <div>
            <SettingsPanel 
              selectedUserImage={selectedUserImage}
              selectedBackgroundImage={selectedBackgroundImage}
              handleUserImageChange={handleImageChange}
              handleBackgroundImageChange={handleBackgroundImageChange}
              userImage={user?.image || ''}
              userBackgroundImage={user?.backgroundImage || ''}
            />
            <p className="my-2 text-color-666">{t('settings-personal')}</p>
            <label>{t('username-label')}</label>
            <Input color="default" {...register('username')} type="text" placeholder={t('username-placeholder')} className="border-[1px] border-[#313131] mb-2" />
            <label>{t('name-label')}</label>
            <Input color="default" {...register('name')} type="text" placeholder={t('name-placeholder')} className="border-[1px] border-[#313131] mb-2" />
            <p className="my-2 text-color-666">{t('settings-confidentiality')}</p>
            <div className="py-6 border-y-[1px] border-[#313131]">
              <div className="flex justify-between">
              <span>{t('account-type-closed')}</span>
                <Checkbox 
                  isChecked={checked}
                  onClick={handleCheck}
                />
              </div>
              <p className="text-xs text-[#727272] mt-4">{t('account-type-text')}</p>
            </div>
            <button onClick={closeSettings} className="w-full max-w-[220px] mt-2 h-8 rounded-md dark:bg-bg-c-3 bg-bg-c-8 hover:opacity-90 transition-all">
              <Link href={'/change-password'} className="flex items-center justify-center text-[#727272]">
                {t('title-change')}
                <LockIcon className="ml-2 w-4 h-4" />
              </Link>
            </button>
            <br />
            <button onClick={closeSettings} className="w-full max-w-[220px] mt-2 h-8 rounded-md dark:bg-bg-c-3 bg-bg-c-8 hover:opacity-90 transition-all">
              <Link href={'/history'} className="flex items-center justify-center text-[#727272]">
                {t('history-button')}
                <ArrowRightSquare className="ml-2" />
              </Link>
            </button>
          </div>
          <div className="flex">
            <button className="mr-3" onClick={closeSettings}>{t('canclel-button')}</button>
            <Button text={t('save-button')} isActive={isValid} className="!w-32" />
          </div>
        </form>
      </section>
    </div>
  )
}