import { CameraIcon } from "@/icons"
import Image          from "next/image";

interface IRecipeCreateCover {
  recipeImage: File | null;
  onClick    : () => void;
}

export const RecipeCreateCover = ({
  recipeImage,
  onClick,
}: IRecipeCreateCover) => {
  return (
    <button onClick={onClick} type="button" className="max-w-xl recipe-cover flex items-center justify-center rounded-xl overflow-hidden">
      {recipeImage ? (
        <Image src={URL.createObjectURL(recipeImage)} className="object-cover max-w-xl w-full h-80" alt="Camera" width={576} height={320} />
      ) : (
        <CameraIcon className="w-12 h-12" />
      )}
    </button>
  )
}