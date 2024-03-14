import { StarIcon } from "@/icons";
import Image        from "next/image";

interface IRecipeComment {
  username   : string;
  rating     : number;
  commentText: string;
}

export const RecipeComment = ({
  username,
  rating,
  commentText
}: IRecipeComment) => {
  return (
    <article className="flex items-center mb-6">
      <Image src={"/assets/testuserimage.jpg"} alt="User photo" className=" w-12 h-12 object-cover rounded-full mr-2" width={38} height={38} />
      <div className="flex flex-col justify-around">
        <div className="flex">
          <span>{username}</span>
          <div className="flex ml-2">
            {[...Array(rating)].map(() => (
              <StarIcon className="w-3 star-icon-active" />
            ))}
          </div>
        </div>
        <p>{commentText}</p>
      </div>
    </article>
  )
}