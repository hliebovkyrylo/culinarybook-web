import { Button } from "@/ui";
import Image      from "next/image";
import Link       from "next/link";

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
      {!isFollowed && (
        <Button text="Follow" className=" max-w-[64px] h-10" onClick={onClick} isActive={true} />
      )}
    </article>
  )
}