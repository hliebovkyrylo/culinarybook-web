import { ClockIcon, MedalIcon } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface IRecipeCard {
  id: string;
  recipeName: string;
  recipeImage: string;
  foodType: string;
  cookingTime: string;
  complexity: string;
  authorImage: string;
  authorName: string;
  className?: string;
}

export const RecipeCard = ({
  id,
  recipeName,
  recipeImage,
  foodType,
  cookingTime,
  complexity,
  authorImage,
  authorName,
  className,
}: IRecipeCard) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const foodTypeImages: { [key: string]: string } = {
    Meat: "/assets/meat.jpg",
    Мясо: "/assets/meat.jpg",
    "М'ясо": "/assets/meat.jpg",
    Dessert: "/assets/dessert.jpg",
    Десерт: "/assets/dessert.jpg",
    "Fast food": "/assets/fastfood.jpg",
    Фастфуд: "/assets/fastfood.jpg",
    "Soft drink": "/assets/drink.jpg",
    "Безалкогольний напій": "/assets/drink.jpg",
    "Безалкогольный напиток": "/assets/drink.jpg",
    "Alcohol drink": "/assets/alcohol.jpg",
    "Алкогольний напій": "/assets/alcohol.jpg",
    "Акогольный напиток": "/assets/alcohol.jpg",
    Soup: "/assets/soup.jpg",
    Суп: "/assets/soup.jpg",
    Porridge: "/assets/porridge.jpg",
    Каша: "/assets/porridge.jpg",
    Salad: "/assets/salad.jpg",
    Салат: "/assets/salad.jpg",
    "National dish": "/assets/national.jpg",
    "Національна страва": "/assets/national.jpg",
    "Нацыональное блюдо": "/assets/national.jpg",
    Pasta: "/assets/pasta.jpg",
    Макаронні: "/assets/pasta.jpg",
    Макаронные: "/assets/pasta.jpg",
    Fish: "/assets/fish.jpg",
    Рыба: "/assets/fish.jpg",
    Риба: "/assets/fish.jpg",
  };

  let defaultBgImage = foodTypeImages[foodType] || "/assets/meat.jpg";

  return (
    <article
      className={`recipecard overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/recipe/${id}`}>
        <div className="overflow-hidden">
          <Image
            className={`rounded-tl-xl w-full h-[125px] object-cover rounded-tr-xl transition-all ${
              isHovered && "scale-110"
            }`}
            src={recipeImage === "" ? defaultBgImage : recipeImage}
            alt="Recipe photo"
            width={230}
            height={125}
            priority
          />
        </div>
        <div className="flex flex-col px-4 pt-3 pb-6">
          <span className="card__name w-full text-ellipsis whitespace-nowrap overflow-hidden">
            {recipeName}
          </span>
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
            <Image
              priority
              src={
                authorImage === "" ? "/assets/defaultAvatar.svg" : authorImage
              }
              className="object-cover w-5 h-5 rounded-full mr-2"
              alt="User photo"
              width={20}
              height={20}
            />
            <span className="text-color-666 text-sm">{authorName}</span>
          </div>
        </div>
      </Link>
    </article>
  );
};
