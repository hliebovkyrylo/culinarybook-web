import { ReactNode } from "react";

interface RecipeInputProps {
  placeholder: string;
  type       : string;
  image      : ReactNode;
}

export const RecipeInput = ({
  placeholder,
  type,
  image
}: RecipeInputProps) => {
  return (
    <div className="flex mb-3 items-center">
      {image}
      <input className="recipe-input ml-3" type={type} placeholder={placeholder} />
    </div>
  )
};