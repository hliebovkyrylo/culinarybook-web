import { useTranslation }         from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MainLayout }             from "@/modules/layouts";
import { CreateRecipeForm }       from "@/modules/create-recipe";
import { RequireAuth }            from "@/hocs/requireAuth";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const CreateRecipe = () => {
  const { t } = useTranslation('common');

  return (
    <MainLayout
      pageTitle={t('create-recipe')}
      pageDescription={t('meta-create-recipe-description')}
      metaTitle={`${t('create-recipe')} | Culinarybook`}
      containerSize="full"
    >
      <CreateRecipeForm />
    </MainLayout>
  )
};

export default RequireAuth(CreateRecipe);