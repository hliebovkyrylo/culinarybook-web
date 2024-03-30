import { Button } from "@/ui";
import Image      from "next/image";
import Link       from "next/link";
import { useTranslation } from "react-i18next";

interface IProfileUserInfo {
  username        : string;
  userId          : string;
  recipesNumber   : number;
  followersNumber : number;
  followingsNumber: number;
  name            : string;
  image          ?: string;
  isFollowed      : boolean;
  followActions   : () => void;
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
  followActions,
}: IProfileUserInfo) => {
  const { t } = useTranslation();
  const userid = '3489hg33934hujgg1';

  return (
    <section className="flex relative py-3 px-2">
      <Image className=" absolute -z-50 top-0 left-0 w-full h-full object-cover opacity-20 rounded-t-lg" src={'/assets/testbanner.jpg'} alt="User banner" width={500} height={500} />
      <Image src={image || "/assets/testuserimage.jpg"} alt="User image" className="object-cover rounded-full w-40 h-40 max-[537px]:w-20 max-[537px]:h-20" width={160} height={160} />
      <div className="w-[340px] h-36 flex flex-col justify-around ml-14 max-[537px]:ml-4">
        <div className="flex items-center">
          <p className="default-text">@{username}</p> 
          {(userId !== userid) && (
            <Button text={!isFollowed ? t('follow-button') : t('follow-button-already')} isActive={true} onClick={followActions} className={`!w-40 h-8 flex opacity-70 items-center justify-center ml-4 ${isFollowed && "!bg-[#29292b] !text-white font-normal"}`} />
          )}
        </div>
        <div className="flex justify-between">
          <p className="default-text text-center"><span className="link-text max-[537px]:!text-sm max-[537px]:block">{recipesNumber}</span> {recipesNumber > 1 ? "recipes" : "recipe"}</p>
          <Link href={`/profile/${userId}/followers`} className="default-text max-[537px]:!text-sm text-center"><span className="link-text max-[537px]:block">{followersNumber}</span> {followersNumber > 1 ? t('followers') : t('follower')}</Link>
          <Link href={`/profile/${userId}/followings`} className="default-text max-[537px]:!text-sm text-center"><span className="link-text max-[537px]:block">{followingsNumber}</span> {followingsNumber > 1 ? t('followings') : "following"}</Link>
        </div>
        <p className="default-text">{name}</p>
      </div>
    </section>
  )
}