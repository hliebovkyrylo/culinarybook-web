import { 
  Bookmark,
  BookmarkSolidicon,
  ClockIcon, 
  HeartRegularIcon, 
  HeartSolidIcon, 
  MedalIcon, 
  StarIcon, 
  UntesilsIcon 
}            from "@/icons";
import Image from "next/image"

interface IRecipeInfo {
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
}

export const RecipeInfo = ({
  title,
  coockingTime,
  complexity,
  typeOfFood,
  numbersOfLikes,
  averageGrade,
  isLiked,
  isSaved,
  likeButtonClick,
  saveButtonClick
}: IRecipeInfo) => {
  return (
    <div className="flex max-md:flex-col">
      <Image src={'/assets/burger.jpg'} alt="Recipe photo" width={608} height={330} className="object-cover w-full max-w-[608px] max-h-[330px] rounded-xl max-md:max-w-[100%]" />
      <div className="ml-12 max-md:ml-0 max-md:mt-6">
        <div className="flex max-md:justify-between">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <div>
            <button onClick={likeButtonClick} className="ml-7 mr-3">{
              isLiked 
              ? <HeartSolidIcon className="fill-red-600 h-8 w-8 hover:fill-red-500 transition-all" /> 
              : <HeartRegularIcon className="h-8 w-8 fill-[#666] hover:fill-[#818181] transition-all" />
            }</button>
            <button onClick={saveButtonClick}>{
              isSaved 
              ? <BookmarkSolidicon className=" fill-amber-400 h-8 w-6 hover:fill-amber-300 transition-all" /> 
              : <Bookmark className="h-8 w-6 fill-[#666] hover:fill-[#818181] transition-all" />
            }</button>
          </div>
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