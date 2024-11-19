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

type RecipeTypeSelectProps = {
  control: Control<any>;
};

export const RecipeTypeSelect = ({ control }: RecipeTypeSelectProps) => {
  const { t } = useTranslation("common");
  return (
    <Controller
      control={control}
      name="typeOfFood"
      render={({ field: { onChange, value, ...field } }) => (
        <Select {...field} value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder={t("type-food")} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={t("type-food-meat")}>
                🍖{t("type-food-meat")}
              </SelectItem>
              <SelectItem value={t("type-food-desert")}>
                🍩{t("type-food-desert")}
              </SelectItem>
              <SelectItem value={t("type-food-fastfood")}>
                🍔{t("type-food-fastfood")}
              </SelectItem>
              <SelectItem value={t("type-food-softdrink")}>
                🍹{t("type-food-softdrink")}
              </SelectItem>
              <SelectItem value={t("type-food-alcoholdrink")}>
                🍸{t("type-food-alcoholdrink")}
              </SelectItem>
              <SelectItem value={t("type-food-soup")}>
                🍲{t("type-food-soup")}
              </SelectItem>
              <SelectItem value={t("type-food-poridge")}>
                🥘{t("type-food-poridge")}
              </SelectItem>
              <SelectItem value={t("type-food-salad")}>
                🥗{t("type-food-salad")}
              </SelectItem>
              <SelectItem value={t("type-food-national")}>
                🍝{t("type-food-national")}
              </SelectItem>
              <SelectItem value={t("type-food-pasta")}>
                🍜{t("type-food-pasta")}
              </SelectItem>
              <SelectItem value={t("type-food-fish")}>
                🐟{t("type-food-fish")}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
};
