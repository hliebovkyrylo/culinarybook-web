import { Button }         from "@/ui";
import Image              from "next/image";
import Link               from "next/link";
import { useTranslation } from "react-i18next";

interface IProfileUserInfo {
  username           : string;
  userId             : string;
  recipesNumber      : number;
  followersNumber    : number;
  followingsNumber   : number;
  name               : string;
  image             ?: string;
  isFollowed         : boolean;
  isFollowRequestSent: boolean;
  myId               : string;
  backgroundImage    : string
  followActions      : () => void;
}

export const ProfileUserInfo = ({
  username,
  recipesNumber, 
  followersNumber, 
  followingsNumber,
  name,
  userId,
  image,
  isFollowed,
  isFollowRequestSent,
  myId,
  followActions,
  backgroundImage
}: IProfileUserInfo) => {
  const { t } = useTranslation();

  return (
    <section className="flex relative py-3 px-2">
      {backgroundImage && (
        <Image className=" absolute -z-50 top-0 left-0 w-full h-full object-cover opacity-20 rounded-t-lg" src={backgroundImage} alt="User banner" width={500} height={500} />
      )}
      <Image src={image || "/assets/user_placeholder.jpg"} alt="User image" className="object-cover rounded-full w-40 h-40 max-[537px]:w-20 max-[537px]:h-20" width={160} height={160} />
      <div className="w-full max-w-[390px] h-36 flex flex-col justify-around ml-14 max-[537px]:ml-4">
        <div className="flex items-center flex-wrap max-[609px]:items-start max-[609px]:flex-col">
          <p className="default-text text-left flex justify-start max-[409px]:w-full">@{username}</p> 
          {(userId !== myId) && (
            <Button text={isFollowRequestSent ? t('follow-request') : !isFollowed ? t('follow-button') : t('follow-button-already')} isActive={true} onClick={followActions} className={`!w-48 h-8 flex opacity-70 items-center justify-center ml-4 max-[609px]:ml-0 max-[609px]:mt-1 ${(isFollowed || isFollowRequestSent) && "!bg-[#29292b] !text-white font-normal"}`} />
          )}
        </div>
        <div className="flex justify-between">
          <p className="default-text text-center"><span className="link-text max-[537px]:!text-sm max-[537px]:block">{recipesNumber}</span> {recipesNumber > 1 || recipesNumber === 0 ? t('recipes') : t('recipe')}</p>
          <Link href={`/profile/${userId}/followers`} className="default-text max-[537px]:!text-sm text-center"><span className="link-text max-[537px]:block">{followersNumber}</span> {followersNumber > 1 || followersNumber === 0 ? t('followers') : t('follower')}</Link>
          <Link href={`/profile/${userId}/followings`} className="default-text max-[537px]:!text-sm text-center"><span className="link-text max-[537px]:block">{followingsNumber}</span> {followingsNumber > 1 || followingsNumber === 0 ? t('followings') : t('following')}</Link>
        </div>
        <p className="default-text">{name}</p>
      </div>
    </section>
  )
}