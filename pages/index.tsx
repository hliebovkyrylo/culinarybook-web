import { 
  RecipesContent, 
  UsersContent, 
  useRecipes, 
  useUsers 
}                                 from "@/modules/home";
import { useTranslation }         from 'next-i18next'
import { GetStaticPropsContext }  from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MainLayout }             from "@/modules/layouts";
import { useGetMeQuery }          from "@/lib/api/userApi";
import Link                       from "next/link";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const Home = () => {
  const { t }  = useTranslation('common');
  
  const { data: me, isLoading: isMeLoading } = useGetMeQuery();

  const { recipes, isLoadingRecipes } = useRecipes(!!me);
  const { users, isLoadingUsers }     = useUsers(!!me);

  const isLoading = isLoadingRecipes || isLoadingUsers || isMeLoading;

  return (
    <MainLayout
      pageTitle={t('title')}
      pageDescription={t('app-description')}
      isLoading={isLoading}
      backgroundImage={(recipes && recipes[0]?.image !== '') ? recipes[0]?.image : ''}
      containerSize="full"
      metaTitle={`${t('title')} | Culinarybook`}
    >
      <div className="mb-28 w-full">
        <div className="flex items-center justify-between mt-6 mb-3">
          <span>{me ? t('recipes-headText') : t('second-recipes-headText')}</span>
          <Link href={'/search/recipes'} className="link-text">{t('link')}</Link>
        </div>
        <RecipesContent
          data={recipes}
          isLoading={isLoading} 
        />
        <div className="flex items-center justify-between mt-6 mb-3">
          <span>{me ? t('users-headText') : t('second-users-headText')}</span>
        </div>
        <UsersContent
          data={users}
          isLoading={isLoading}
        />
      </div>
    </MainLayout>
  )
}

export default Home;