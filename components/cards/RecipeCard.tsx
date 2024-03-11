"use client"

import { ClockIcon } from "@/icons";
import { Medalicon } from "@/icons/icons/MedalIcon/MedalIcon";
import Image         from "next/image";
import Link          from "next/link";
import { useState }  from "react";

interface IRecipeCard {
  id         : string;
  recipeName : string;
  recipeImage: string;
  foodType   : string;
  cookingTime: string;
  complexity : string;
  author     : string;
  className ?: string;
}

const RecipeCard = ({
  id,
  recipeName,
  recipeImage,
  foodType,
  cookingTime,
  complexity,
  author,
  className
}: IRecipeCard) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <article className={`recipecard overflow-hidden ${className}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Link href={`/recipe/${id}`}>
        <div className="overflow-hidden">
          <Image 
            className={`rounded-tl-xl rounded-tr-xl transition-all ${isHovered && "scale-110"}`}
            src={recipeImage === "" ? "/assets/testrecipephoto.jpg" : recipeImage} 
            alt="Recipe photo" 
            width={230} 
            height={125} 
          />
        </div>
        <div className="flex flex-col px-4 pt-3 pb-6">
          <span className="card__name">{recipeName}</span>
          <span className="text-color-666 text-sm my-2">{foodType}</span>
          <div className="flex">
            <ClockIcon className="mr-2" />
            <span className="text-color-666 text-sm">{cookingTime}</span>
          </div>
          <div className="flex my-2">
            <Medalicon className="mr-2" />
            <span className="text-color-666 text-sm">{complexity}</span>
          </div>
          <div className="flex">
            <Image src={"/assets/testuserimage.jpg"} className="object-cover w-5 h-5 rounded-full mr-2" alt="User photo" width={20} height={20} />
            <span className="text-color-666 text-sm">{author}</span>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default RecipeCard;