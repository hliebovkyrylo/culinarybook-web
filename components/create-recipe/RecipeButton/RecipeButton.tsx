import Image from "next/image";

interface RecipeButtonProps {
  buttonClick: () => void;
};

const RecipeButton = ({
  buttonClick,
}: RecipeButtonProps) => {
  return (
    <button type="button" onClick={buttonClick} className="flex items-center flex-col">
      <div className=" text-color-666">Add step</div>
      <Image src={'/assets/icons/plus.svg'} alt="Plus" width={32} height={36} />
    </button>
  )
};

export default RecipeButton;