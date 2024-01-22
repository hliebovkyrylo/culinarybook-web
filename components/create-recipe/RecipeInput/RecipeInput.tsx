import Image from "next/image";

interface RecipeInputProps {
  placeholder: string;
  type: string;
  image: string;
}

const RecipeInput = ({
  placeholder,
  type,
  image
}: RecipeInputProps) => {
  return (
    <div className="flex mb-3">
      <Image src={image} alt="Name" width={20} height={18} />
      <input className=" bg-bg-c-2 pl-3 rounded-md outline-none ml-3" type={type} placeholder={placeholder} />
    </div>
  )
};

export default RecipeInput;