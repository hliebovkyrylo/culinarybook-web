import { 
  ClipboardIcon, 
  UsersIcon 
}            from "@/icons";
import Image from "next/image";
import Link  from "next/link";

interface ICreatorCard {
  id         : string;
  userImage  : string;
  name       : string;
  followers  : number;
  recipes    : number;
  className ?: string;
  userBanner : string;
}

export const CreatorCard = ({
  id,
  userImage,
  name,
  followers,
  recipes,
  className,
  userBanner
}: ICreatorCard) => {
  return (
    <article className={`bg-[#cccccc4b] hover:bg-[#bbbbbb4b] overflow-hidden dark:bg-[#41414159] dark:hover:bg-[#41414170] w-[178px] py-3 px-4 rounded-xl relative ${className}`}>
      {(userBanner !== "") && (
        <Image className="absolute top-0 -z-10 opacity-10 left-0 w-full h-full object-cover" src={userBanner} alt="User background" width={160} height={160} />
      )}
      <Link href={`/profile/${id}`}>
        <Image className="rounded-full h-8 object-cover" src={userImage === '' ? '/assets/defaultAvatar.svg' : userImage} alt="User image" width={32} height={32} />
        <div className="my-4 card__name">{name}</div>
        <div className="flex items-center">
          <UsersIcon />
          <div className="ml-2 text-color-666">{followers}</div>
        </div>
        <div className="flex items-center">
          <ClipboardIcon />
          <div className="ml-2 text-color-666">{recipes}</div>
        </div>
      </Link>
    </article>
  )
};