import { 
  Bookmark,
  BookmarkSolidicon,
  ClockIcon, 
  HeartRegularIcon, 
  HeartSolidIcon, 
  MedalIcon, 
  PenToSquare, 
  StarIcon, 
  UntesilsIcon 
}            from "@/icons";
import Image from "next/image"
import Link  from "next/link";

interface IRecipeInfo {
  recipeId       : string;
  recipeImage    : string;
  title          : string;
  coockingTime   : string;
  complexity     : string;
  typeOfFood     : string;
  numbersOfLikes : number;
  averageGrade   : number;
  isLiked        : boolean;
  isSaved        : boolean;
  likeButtonClick: () => void;
  saveButtonClick: () => void;
  isOwner        : boolean;
}

export const RecipeInfo = ({
  recipeId,
  recipeImage,
  title,
  coockingTime,
  complexity,
  typeOfFood,
  numbersOfLikes,
  averageGrade,
  isLiked,
  isSaved,
  likeButtonClick,
  saveButtonClick,
  isOwner
}: IRecipeInfo) => {
  const foodTypeImages: {[ key: string ]: string} = {
    "Meat": '/assets/meat.jpg',
    "Мясо": '/assets/meat.jpg',
    "М'ясо": '/assets/meat.jpg',
    'Dessert': '/assets/dessert.jpg',
    'Десерт': '/assets/dessert.jpg',
    'Fast food': '/assets/fastfood.jpg',
    'Фастфуд': '/assets/fastfood.jpg',
    'Soft drink': '/assets/drink.jpg',
    'Безалкогольний напій': '/assets/drink.jpg',
    'Безалкогольный напиток': '/assets/drink.jpg',
    'Alcohol drink': '/assets/alcohol.jpg',
    'Алкогольний напій': '/assets/alcohol.jpg',
    'Акогольный напиток': '/assets/alcohol.jpg',
    'Soup': '/assets/soup.jpg',
    'Суп': '/assets/soup.jpg',
    'Porridge': '/assets/porridge.jpg',
    'Каша': '/assets/porridge.jpg',
    'Salad': '/assets/salad.jpg',
    'Салат': '/assets/salad.jpg',
    'National dish': '/assets/national.jpg',
    'Національна страва': '/assets/national.jpg',
    'Нацыональное блюдо': '/assets/national.jpg',
    'Pasta': '/assets/pasta.jpg',
    'Макаронні': '/assets/pasta.jpg',
    'Макаронные': '/assets/pasta.jpg',
    'Fish': '/assets/fish.jpg',
    'Рыба': '/assets/fish.jpg',
    'Риба': '/assets/fish.jpg',
  };

  let defaultBgImage = foodTypeImages[typeOfFood] || '/assets/meat.jpg';  
  return (
    <div className="flex max-md:flex-col">
      <Image src={recipeImage || defaultBgImage} alt="Recipe photo" width={608} height={330} className="object-cover w-full max-w-[608px] max-h-[330px] rounded-xl max-md:max-w-[100%]" />
      <div className="ml-12 w-full max-md:ml-0 max-md:mt-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center max-md:justify-between">
            <h1 className="text-3xl font-semibold">{title}</h1>
            <div className="flex items-center">
              <button onClick={likeButtonClick} className="ml-7 mr-3 max-md:mr-1 max-md:ml-4">{
                isLiked 
                ? <HeartSolidIcon className="fill-red-600 h-8 w-8 hover:fill-red-500 transition-all" /> 
                : <HeartRegularIcon className="h-8 w-8 max-md:h-6 fill-[#666] hover:fill-[#818181] transition-all" />
              }</button>
              <button onClick={saveButtonClick}>{
                isSaved 
                ? <BookmarkSolidicon className=" fill-amber-400 h-8 w-6 hover:fill-amber-300 transition-all" /> 
                : <Bookmark className="h-8 w-6 max-md:h-6 fill-[#666] hover:fill-[#818181] transition-all" />
              }</button>
            </div>
          </div>
          {isOwner && (
            <Link href={`/update-recipe/${recipeId}`}>
              <PenToSquare className="w-8 h-8 max-md:h-6 fill-[#666] hover:fill-[#818181] transition-all" />
            </Link>
          )}
        </div>
        <ul className="mt-6">
          <li className="flex items-center text-[#666] mb-2"><ClockIcon className="fill-[#666] w-5 mr-2" />{coockingTime}</li>
          <li className="flex items-center text-[#666] mb-2"><MedalIcon className="fill-[#666] w-5 mr-2" />{complexity}</li>
          <li className="flex items-center text-[#666] mb-2"><UntesilsIcon className="fill-[#666] w-5 mr-2" />{typeOfFood}</li>
          <li className="flex items-center text-[#666] mb-2"><HeartSolidIcon className="fill-[#666] w-5 mr-2" />{numbersOfLikes}</li>
          <li className="flex items-center text-[#666] mb-2"><StarIcon className="fill-[#666] w-5 mr-2" />{averageGrade}</li>
        </ul>
      </div>
    </div>
  )
}