import { ChevronDownIcon, ChevronUpIcon, StarIcon } from "@/icons";
import Image                         from "next/image";
import Link                          from "next/link";

interface IRecipeComment {
  username           : string;
  userId             : string;
  numbersOfReplies  ?: number;
  rating            ?: number;
  commentText        : string;
  onClickOpenReplies?: () => void;
  isOpenReplies     ?: boolean;
  onClickReply       : () => void;
}

export const RecipeComment = ({
  username,
  rating,
  userId,
  commentText,
  numbersOfReplies,
  isOpenReplies,
  onClickOpenReplies,
  onClickReply
}: IRecipeComment) => {
  return (
    <article className="flex">
      <Link href={`/profile/${userId}`} className="w-12 h-12 mr-2"><Image src={"/assets/testuserimage.jpg"} alt="User photo" className="w-full h-full object-cover rounded-full" width={38} height={38} /></Link>
      <div className="flex flex-col justify-around">
        <div className="flex">
          <Link href={`/profile/${userId}`}>@{username}</Link>
          {rating && (
            <div className="flex ml-2">
              {[...Array(rating)].map(() => (
                <StarIcon className="w-3 star-icon-active" key={'154rf334'} />
              ))}
            </div>
          )}
        </div>
        <p>{commentText}</p>
        <div className="flex items-center">
          {numbersOfReplies && numbersOfReplies >= 1 && (
            <button onClick={onClickOpenReplies} className="flex items-center leftsidebar__text !text-base !p-0 mr-6">{isOpenReplies 
            ? (
              <ChevronUpIcon className="w-4 icon-color mr-1" />
            ) 
            : (
              <ChevronDownIcon className="w-4 icon-color mr-1" />
            )
          }{numbersOfReplies} replies</button>
          )}
          <button onClick={onClickReply} className="my-2 rounded-xl text-left text-color-666">Reply</button>
        </div>
      </div>
    </article>
  )
}