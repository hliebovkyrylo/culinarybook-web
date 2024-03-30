import { ReactNode } from "react";

interface RecipeInputProps {
  placeholder: string;
  type       : string;
  image      : ReactNode;
  className ?: string;
}

export const RecipeInput = ({
  placeholder,
  type,
  image,
  className
}: RecipeInputProps) => {
  return (
    <div className={`flex mb-3 items-center ${className}`}>
      {image}
      <input className="recipe-input ml-3" type={type} placeholder={placeholder} />
    </div>
  )
};