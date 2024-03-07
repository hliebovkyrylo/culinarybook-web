import { 
  ClipboardIcon, 
  UsersIcon 
}            from "@/icons";
import Image from "next/image";
import Link  from "next/link";

interface ICreatorCard {
  id       : string;
  userImage: string;
  name     : string;
  followers: number;
  recipes  : number;
}

const CreatorCard = ({
  id,
  userImage,
  name,
  followers,
  recipes
}: ICreatorCard) => {
  return (
    <article className="bg-white dark:bg-bg-c-2 w-width-160 py-3 px-4 rounded-xl">
      <Link href={`/profile/${id}`}>
        <Image className="rounded-full h-8 object-cover" src={userImage} alt="User image" width={32} height={32} />
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

export default CreatorCard;