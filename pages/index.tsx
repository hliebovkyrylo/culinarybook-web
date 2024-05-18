import { 
  RecipesContent, 
  UsersContent, 
  useRecipes, 
  useUsers 
}                                 from "@/modules/home";
import { ContentHeader }          from "@/components/home";
import { useSelector }            from "react-redux";
import { IAppState }              from "@/lib/store";
import { useTranslation }         from 'next-i18next'
import { GetStaticPropsContext }  from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MainLayout }             from "@/modules/layouts";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const Home = () => {
  const { t }       = useTranslation('common');
  const accessToken = useSelector((state: IAppState) => state.auth.accessToken);

  const { recipes, isLoadingRecipes } = useRecipes(accessToken);
  const { users, isLoadingUsers }     = useUsers(accessToken);

  const isLoading = isLoadingRecipes || isLoadingUsers;

  return (
    <MainLayout
      pageTitle={`${t('title')} | Culinarybook`}
      pageDescription={t('app-description')}
      isLoading={isLoading}
      backgroundImage={(recipes && recipes[0].image !== '') ? recipes[0].image : ''}
    >
      <div className="mb-28 w-full">
        <h1 className='text-black dark:text-neutral-50 font-semibold text-2xl'>{t('title')}</h1>
        <ContentHeader
          title={accessToken ? t('recipes-headText') : t('second-recipes-headText')}
          linkText={t('link')}
          linkHref={`/search/recipes`}
          className="mt-6"
        />
        <RecipesContent
          data={recipes}
          isLoading={isLoading} 
        />
        <ContentHeader
          title={accessToken ? t('users-headText') : t('second-users-headText')}
          className="mt-9 mb-3"
        />
        <UsersContent
          data={users}
          isLoading={isLoading}
        />
      </div>
    </MainLayout>
  )
}

export default Home;