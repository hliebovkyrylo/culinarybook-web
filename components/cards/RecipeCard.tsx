"use client"

import { ClockIcon } from "@/icons";
import { Medalicon } from "@/icons/icons/MedalIcon/MedalIcon";
import Image         from "next/image";
import Link          from "next/link";

interface IRecipeCard {
  id         : string;
  recipeName : string;
  recipeImage: string;
  foodType   : string;
  cookingTime: string;
  complexity : string;
  author     : string;
}

const RecipeCard = ({
  id,
  recipeName,
  recipeImage,
  foodType,
  cookingTime,
  complexity,
  author,
}: IRecipeCard) => {
  return (
    <article className="recipecard">
      <Link href={`/recipe/${id}`}>
        <Image className="rounded-tl-xl rounded-tr-xl" src={recipeImage === "" ? "/assets/testrecipephoto.jpg" : recipeImage} alt="Recipe photo" width={230} height={125} />
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
          <span className="text-color-666 text-sm">{author}</span>
        </div>
      </Link>
    </article>
  )
}

export default RecipeCard;