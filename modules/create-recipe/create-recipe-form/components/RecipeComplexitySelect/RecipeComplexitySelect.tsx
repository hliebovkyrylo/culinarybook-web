import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "next-i18next";
import { Control, Controller } from "react-hook-form";

type RecipeComplexitySelectProps = {
  control: Control<any>;
};

export const RecipeComplexitySelect = ({
  control,
}: RecipeComplexitySelectProps) => {
  const { t } = useTranslation("common");

  return (
    <Controller
      control={control}
      name="complexity"
      render={({ field: { onChange, value, ...field } }) => (
        <Select {...field} value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder={t("complexity")} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={t("complexity-choose-easy")}>
                {t("complexity-choose-easy")}
              </SelectItem>
              <SelectItem value={t("complexity-choose-middle")}>
                {t("complexity-choose-middle")}
              </SelectItem>
              <SelectItem value={t("complexity-choose-hard")}>
                {t("complexity-choose-hard")}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
};
