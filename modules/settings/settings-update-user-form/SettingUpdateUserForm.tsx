import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserFormData, updateUserSchema } from "./schemas";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "@/lib/api/userApi";
import { useCallback, useState } from "react";
import { useUploadImageMutation } from "@/lib/api/uploadImageApi";
import { RtkError } from "@/typings/error";
import { useTranslation } from "next-i18next";
import { Button, Checkbox, Input } from "@/components/ui";
import Link from "next/link";
import { ArrowRightSquare, LockIcon } from "@/icons";
import { SettingsUserPanel } from "./components";
import { IUserMe } from "@/typings/user";

const handleImageChange = (setImage: React.Dispatch<React.SetStateAction<File | null>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files?.length) {
    setImage(e.target.files[0]);
  }
};

export const SettingsUpdateUserForm = ({ user }: { user?: IUserMe }) => {
  const { t } = useTranslation('common');

  const [updateUser, { isLoading: isLoadingUpdateUser }] = useUpdateUserMutation();
  const [uploadImage, { isLoading: isLoadingUploadingImage }] = useUploadImageMutation();

  const [selectedUserImage, setSelectedUserImage] = useState<File | null>(null);
  const [selectedBackgroundImage, setSelectedBackgroundImage] = useState<File | null>(null);

  const [checked, setChecked] = useState<boolean>(!!user?.isPrivate);

  const { handleSubmit, register, formState: { errors, isValid }, setError } = useForm<UpdateUserFormData>({
    defaultValues: {
      username: user?.username,
      name: user?.name,
      isPrivate: user?.isPrivate,
      image: user?.image,
      backgroundImage: user?.backgroundImage,
    },
    resolver: zodResolver(updateUserSchema)
  });

  const onSubmit = useCallback(async (values: UpdateUserFormData) => {
    let userImageUrl = values.image;
    let backgroundImageUrl = values.backgroundImage;
    if (selectedUserImage) {
      const formData = new FormData();
      formData.append('image', selectedUserImage);
      const response = await uploadImage(formData).unwrap();
      userImageUrl = response.imageUrl;
    }

    if (selectedBackgroundImage) {
      const formData = new FormData();
      formData.append('image', selectedBackgroundImage);
      const response = await uploadImage(formData).unwrap();
      backgroundImageUrl = response.imageUrl;
    }

    values.image = userImageUrl;
    values.backgroundImage = backgroundImageUrl;
    updateUser({
      ...values,
      image: userImageUrl,
      backgroundImage: backgroundImageUrl,
      isPrivate: checked
    }).unwrap().catch((error: RtkError) => {
      if (error.data.code === 'such-username-exist') {
        setError('username', { message: t('username-exist-error') });
      }
    })
  }, [updateUser, selectedUserImage, selectedBackgroundImage, checked]);

  const handleUserImageChange = handleImageChange(setSelectedUserImage);
  const handleBackgroundImageChange = handleImageChange(setSelectedBackgroundImage);

  const handleCheck = () => {
    setChecked(!checked);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between h-[85%] my-4">
      <div>
        <SettingsUserPanel
          selectedUserImage={selectedUserImage}
          selectedBackgroundImage={selectedBackgroundImage}
          handleUserImageChange={handleUserImageChange}
          handleBackgroundImageChange={handleBackgroundImageChange}
          userImage={user?.image || ''}
          userBackgroundImage={user?.backgroundImage || ''}
        />
        <p className="my-2 text-color-666">{t('settings-personal')}</p>
        <label>{t('username-label')}</label>
        <p className={`text-red-500 text-sm ${!errors.username && 'hidden'}`}>{errors.username?.message}</p>
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
        <button className="w-full max-w-[220px] mt-2 h-8 rounded-md dark:bg-bg-c-3 bg-bg-c-8 hover:opacity-90 transition-all">
          <Link href={'/change-password'} className="flex items-center justify-center text-[#727272]">
            {t('title-change')}
            <LockIcon className="ml-2 w-4 h-4" />
          </Link>
        </button>
        <br />
        <button className="w-full max-w-[220px] mt-2 h-8 rounded-md dark:bg-bg-c-3 bg-bg-c-8 hover:opacity-90 transition-all">
          <Link href={'/history'} className="flex items-center justify-center text-[#727272]">
            {t('history-button')}
            <ArrowRightSquare className="ml-2" />
          </Link>
        </button>
      </div>
      <Button text={t('save-button')} state={(isLoadingUpdateUser || isLoadingUploadingImage) ? 'loading' : isValid ? 'default' : 'disabled'} className="!w-32" />
    </form>
  )
}