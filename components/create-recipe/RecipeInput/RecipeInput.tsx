import { forwardRef } from "react";

interface RecipeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type       : string;
};

export const RecipeInput = forwardRef<HTMLInputElement, RecipeInputProps>(
  ({ placeholder, type, ...props }, ref) => {
  return (
    <input {...props} ref={ref} className="recipe-input ml-3" type={type} placeholder={placeholder} />
  )
});