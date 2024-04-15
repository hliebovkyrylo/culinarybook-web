"use client"

import { ClockIcon, MedalIcon } from "@/icons";
import Image                    from "next/image";
import Link                     from "next/link";
import { useState }             from "react";
import { useTranslation }       from "react-i18next";

interface IRecipeCard {
  id         : string;
  recipeName : string;
  recipeImage: string;
  foodType   : string;
  cookingTime: string;
  complexity : string;
  authorImage: string;
  authorName : string;
  className ?: string;
}

const RecipeCard = ({
  id,
  recipeName,
  recipeImage,
  foodType,
  cookingTime,
  complexity,
  authorImage,
  authorName,
  className
}: IRecipeCard) => {
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const foodTypeImages = {
    [t('type-food-meat')]: '/assets/meat.jpg',
    [t('type-food-desert')]: '/assets/dessert.jpg',
    [t('type-food-fastfood')]: '/assets/fastfood.jpg',
    [t('type-food-softdrink')]: '/assets/drink.jpg',
    [t('type-food-alcoholdrink')]: '/assets/alcohol.jpg',
    [t('type-food-soup')]: '/assets/soup.jpg',
    [t('type-food-poridge')]: '/assets/porridge.jpg',
    [t('type-food-salad')]: '/assets/salad.jpg',
    [t('type-food-national')]: '/assets/salad.jpg',
    [t('type-food-pasta')]: '/assets/pasta.jpg',
    [t('type-food-fish')]: '/assets/fish.jpg',
  };
  
  let defaultBgImage = foodTypeImages[foodType] || '/assets/meat.jpg';  

  return (
    <article className={`recipecard overflow-hidden ${className}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Link href={`/recipe/${id}`}>
        <div className="overflow-hidden">
          <Image 
            className={`rounded-tl-xl w-full h-[125px] object-cover rounded-tr-xl transition-all ${isHovered && "scale-110"}`}
            src={recipeImage === "" ? defaultBgImage : recipeImage} 
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
            <MedalIcon className="mr-2" />
            <span className="text-color-666 text-sm">{complexity}</span>
          </div>
          <div className="flex">
            <Image src={authorImage === "" ? '/assets/defaultAvatar.svg' : authorImage} className="object-cover w-5 h-5 rounded-full mr-2" alt="User photo" width={20} height={20} />
            <span className="text-color-666 text-sm">{authorName}</span>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default RecipeCard;