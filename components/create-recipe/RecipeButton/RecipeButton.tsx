import { AddIcon } from "@/icons";

interface RecipeButtonProps {
  buttonClick: () => void;
};

export const RecipeButton = ({
  buttonClick,
}: RecipeButtonProps) => {
  return (
    <button type="button" onClick={buttonClick} className="flex items-center flex-col">
      <div className=" text-color-666">Add step</div>
      <AddIcon className="w-8 h-9 fill-color-666" />
    </button>
  )
};