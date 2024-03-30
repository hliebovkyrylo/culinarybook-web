import { AddIcon } from "@/icons";
import { useTranslation } from "react-i18next";

interface RecipeButtonProps {
  buttonClick: () => void;
};

export const RecipeButton = ({
  buttonClick,
}: RecipeButtonProps) => {
  const { t } = useTranslation();
  return (
    <button type="button" onClick={buttonClick} className="flex items-center flex-col">
      <div className=" text-color-666">{t('step-button')}</div>
      <AddIcon className="w-8 h-9 fill-color-666" />
    </button>
  )
};