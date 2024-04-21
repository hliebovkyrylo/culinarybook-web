import { CameraIcon } from "@/icons"
import Image          from "next/image";

interface IRecipeCreateCover {
  recipeImage  : string | null;
  isError     ?: boolean;
  errorMessage?:string
  onClick      : () => void;
}

export const RecipeCreateCover = ({
  recipeImage,
  onClick,
  isError,
  errorMessage
}: IRecipeCreateCover) => {
  return (
    <div className="w-full max-w-xl relative">
      <p className="text-red-500 text-sm absolute -top-6">{errorMessage}</p>
      <button onClick={onClick} type="button" className="w-full recipe-cover flex items-center justify-center rounded-xl overflow-hidden">
        {recipeImage ? (
          <Image src={recipeImage} className={`object-cover max-w-xl w-full hover:opacity-70 transition-opacity h-80 ${isError && 'animate-pulse'}`} alt="Camera" width={576} height={320} />
        ) : (
          <CameraIcon className="w-12 h-12" />
        )}
      </button>
    </div>
  )
}