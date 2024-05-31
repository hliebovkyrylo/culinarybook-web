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

type RecipeBgImageApplySelectProps = {
  control: Control<any>;
};

export const RecipeBgImageApplySelect = ({ control }: RecipeBgImageApplySelectProps) => {
  const { t } = useTranslation("common");
  return (
    <Controller
      control={control}
      name="applyBackground"
      render={({ field: { onChange, value, ...field } }) => (
        <Select {...field} value={String(value)} onValueChange={(val) => onChange(val === 'true')}>
          <SelectTrigger>
            <SelectValue placeholder={t('background-visibility')} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={String(true)}>✅{t('photo-apply')}</SelectItem>
              <SelectItem value={String(false)}>❎{t('photo-apply-do-not')}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  )
}