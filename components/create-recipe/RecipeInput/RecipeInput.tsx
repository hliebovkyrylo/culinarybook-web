import { ReactNode } from "react";

interface RecipeInputProps {
  placeholder: string;
  type: string;
  image: ReactNode;
}

const RecipeInput = ({
  placeholder,
  type,
  image
}: RecipeInputProps) => {
  return (
    <div className="flex mb-3 items-center">
      {image}
      <input className=" bg-bg-c-2 pl-3 rounded-md outline-none ml-3" type={type} placeholder={placeholder} />
    </div>
  )
};

export default RecipeInput;