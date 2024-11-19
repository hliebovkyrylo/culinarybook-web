import { LockIcon } from "@/icons";
import { useTranslation } from "next-i18next";

export const PrivateRecipe = () => {
  const { t } = useTranslation("common");
  return (
    <section className="w-full h-full flex justify-center items-center">
      <LockIcon />
      <div className="text-2xl ">{t("private-recipe")}</div>
    </section>
  );
};
