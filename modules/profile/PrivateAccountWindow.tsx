import { LockIcon }       from "@/icons"
import { useTranslation } from "next-i18next"

export const PrivateAccountWindow = () => {
  const { t } = useTranslation('common');
  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="flex gap-1">
        <LockIcon />
        <div className="text-[#666]">{t('private-account')}</div>
      </div>
    </section>
  )
}