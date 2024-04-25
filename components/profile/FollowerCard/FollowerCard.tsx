import { useGetMeQuery }  from "@/lib/api/userApi";
import { Button }         from "@/ui";
import Image              from "next/image";
import Link               from "next/link";
import { useTranslation } from "react-i18next";

interface IFollowerCard {
  username  : string;
  userId    : string;
  name      : string;
  userImage : string;
  isFollowed: boolean;
  className?: string;
  onClick  ?: () => void;
}

export const FollowerCard = ({
  username,
  name,
  isFollowed,
  userImage,
  onClick,
  className,
  userId
}: IFollowerCard) => {
  const { t } = useTranslation();
  const { data: user } = useGetMeQuery();
  return (
    <article className={`flex justify-between items-center rounded-md px-3 py-2 follower-card-bg ${className}`}>
      <div className="flex">
        <Link href={`/profile/${userId}`}>
          <Image src={userImage === '' ? '/assets/testuserimage.jpg'  : userImage} alt="User image" width={48} height={48} className="w-12 h-12 object-cover rounded-full mr-2" />
        </Link>
        <div>
          <Link href={`/profile/${userId}`}>{username}</Link>
          <p>{name}</p>
        </div>
      </div>
      {userId !== user?.id && (
        <Button text={!isFollowed ? t('follow-button') : t('follow-button-already')} isActive={true} onClick={onClick} className={`!w-36 h-8 flex opacity-70 items-center justify-center ml-4 ${isFollowed && "dark:!bg-[#363638] !bg-[#939396] !text-white font-normal"}`} />
      )}
    </article>
  )
}