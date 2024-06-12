import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
}                              from "@/components/ui/select"
import { useTranslation }      from "next-i18next"
import { Control, Controller } from "react-hook-form";

type RecipeAccessSelectProps = {
  control: Control<any>;
};

export const RecipeAccessSelect = ({ control }: RecipeAccessSelectProps) => {
  const { t } = useTranslation("common");
  return (
    <Controller
      control={control}
      name="isPublic"
      render={({ field: { onChange, value, ...field } }) => (
        <Select {...field} value={String(value)} onValueChange={(val) => onChange(val === 'true')}>
          <SelectTrigger>
            <SelectValue placeholder={t('recipe-access')} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={String(true)}>🌐{t('avaible-everyone')}</SelectItem>
              <SelectItem value={String(false)}>🔒{t('avaible-me')}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  )
}