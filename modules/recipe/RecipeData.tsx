import Image              from "next/image";
import { foodTypeImages } from "./constants";
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
}                         from "@/icons";
import Link               from "next/link";
import { IRecipe }        from "@/typings/recipe";
import { useTranslation } from "next-i18next";

interface IRecipeData {
  data           : IRecipe | undefined;
  numbersOfLikes : number;
  averageGrade   : number;
  isLiked        : boolean;
  isSaved        : boolean;
  likeButtonClick: () => void;
  saveButtonClick: () => void;
  isOwner        : boolean;
}

export const RecipeData = ({
  data,
  numbersOfLikes,
  averageGrade,
  isLiked,
  isSaved,
  likeButtonClick,
  saveButtonClick,
  isOwner
}: IRecipeData) => {
  const { t } = useTranslation("common");
  let defaultBgImage = foodTypeImages[data?.typeOfFood || ''] || '/assets/meat.jpg'; 
  return (
    <>
      <div className="flex max-xl:flex-col">
        <Image src={data?.image || defaultBgImage} alt="Recipe photo" width={608} height={330} className="object-cover w-full max-w-[608px] max-h-[330px] rounded-xl max-md:max-w-[100%]" />
        <div className="ml-12 w-full max-md:ml-0 max-md:mt-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center max-md:justify-between">
              <h1 className="text-3xl font-semibold text-ellipsis overflow-hidden whitespace-nowrap max-w-[680px] max-2xl:max-w-[60vw]">{data?.title}</h1>
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
              <Link href={`/update-recipe/${data?.id}`}>
                <PenToSquare className="w-8 h-8 max-md:h-6 fill-[#666] hover:fill-[#818181] transition-all" />
              </Link>
            )}
          </div>
          <ul className="mt-6">
            <li className="flex items-center text-[#666] mb-2"><ClockIcon className="fill-[#666] w-5 mr-2" />{data?.coockingTime}</li>
            <li className="flex items-center text-[#666] mb-2"><MedalIcon className="fill-[#666] w-5 mr-2" />{data?.complexity}</li>
            <li className="flex items-center text-[#666] mb-2"><UntesilsIcon className="fill-[#666] w-5 mr-2" />{data?.typeOfFood}</li>
            <li className="flex items-center text-[#666] mb-2"><HeartSolidIcon className="fill-[#666] w-5 mr-2" />{numbersOfLikes}</li>
            <li className="flex items-center text-[#666] mb-2"><StarIcon className="fill-[#666] w-5 mr-2" />{averageGrade}</li>
          </ul>
        </div>
      </div>
      <h3 className="link-text font-semibold my-5">{t('title-ingradients')}</h3>
      <pre className="font-montserrat text-base bg-[#cccccc4b] dark:bg-[#41414159] break-words p-3 rounded-xl max-w-[364px] min-h-[170px]">{data?.ingradients}</pre>
    </>
  )
};