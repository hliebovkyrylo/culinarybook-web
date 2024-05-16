import { 
  ContentHeader, 
  ContentMain 
}                                 from "@/components/home";
import Recipecard                 from "@/components/cards/RecipeCard/RecipeCard";
import CreatorCard                from "@/components/cards/CreatorCard/CreatorCard";
import Image                      from "next/image";
import { Loader }                 from "@/components/shared";
import { useTranslation }         from "react-i18next";
import { 
  CreatorCardSkeleton, 
  RecipeCardSkeleton 
}                                 from "@/components/cards";
import { 
  useGetPopularRecipesQuery, 
  useGetRecommendedRecipesQuery } from "@/lib/api/recipeApi";
import { useSelector }            from "react-redux";
import { IAppState }              from "@/lib/store";
import { 
  useGetPopularUsersQuery, 
  useGetRecommendedUsersQuery 
}                                 from "@/lib/api/userApi";
import { Swiper, SwiperSlide }    from "swiper/react";
import { renderMetaTags }         from "./meta";

const Home = () => {
  const { t }       = useTranslation();
  const accessToken = useSelector((state: IAppState) => state.auth.accessToken);

  const { data: recommendedRecipes, isLoading: isLoadingRecommendedRecipes } = useGetRecommendedRecipesQuery({ page: 1, limit: 6 });
  const { data: popularRecipes, isLoading: isLoadingPopularRecipes }         = useGetPopularRecipesQuery({ page: 1, limit: 6 });

  const { data: recommendedUsers, isLoading: isLoadingRecommendedUsers } = useGetRecommendedUsersQuery({ page: 1, limit: 8 });
  const { data: popularUsers, isLoading: isLoadingPopularUsers }         = useGetPopularUsersQuery({ page: 1, limit: 8 });

  const recipes = accessToken ? recommendedRecipes : popularRecipes;
  const users   = accessToken ? recommendedUsers : popularUsers;

  const isLoadingRecipes = accessToken ? isLoadingRecommendedRecipes : isLoadingPopularRecipes;
  const isLoadingUsers   = accessToken ? isLoadingRecommendedUsers : isLoadingPopularUsers;

  const isLoading = isLoadingRecipes || isLoadingUsers;

  return (
    <>
      {renderMetaTags({ title: `${t('title')} | Culinarybook`, description: t('app-description') })}
      {isLoading ? (
        <Loader className="!-z-10 absolute top-0 left-0 blur-[2px]" />
      ) : (
        <Image className="absolute w-full h-screen top-0 left-0 object-cover z-[-1] blur-sm opacity-10" src={(recipes && recipes[0].image !== '') ? recipes[0].image : ''} alt="" width={500} height={500} />
      )}
      <h1 className='head-text'>{t('title')}</h1>
      <ContentHeader
        title={accessToken ? t('recipes-headText') : t('second-recipes-headText')}
        linkText={t('link')}
        linkHref={`/search/recipes`}
        className="mt-6"
      />
      <div className="mt-3 mb-28">
        <ContentMain>
          <Swiper spaceBetween={18} slidesPerView={"auto"} freeMode={true} centeredSlides={false} className="!m-0">
            {isLoading ? (
              <>
                {[...Array(6)].map((_, index) => (
                  <SwiperSlide style={{ width: '230px' }} key={index}>
                    <RecipeCardSkeleton />
                  </SwiperSlide>
                ))}
              </>
            ) : (
              <>
                {recipes && recipes.length > 0 ? recipes.map((recipe) => (
                  <SwiperSlide style={{ width: '230px' }} key={recipe.id}>
                    <Recipecard
                      id={recipe.id}
                      recipeName={recipe.title}
                      recipeImage={recipe.image}
                      foodType={recipe.typeOfFood}
                      cookingTime={recipe.coockingTime}
                      complexity={recipe.complexity}
                      authorImage={recipe.owner.image}
                      authorName={recipe.owner.name}
                    />
                  </SwiperSlide>
                )) : (
                  <p className="h-[297px] flex opacity-50 w-full justify-center items-center">{t('nothing-found')}</p>
                )}
              </>
            )}
          </Swiper>
        </ContentMain>
        <ContentHeader
          title={accessToken ? t('users-headText') : t('second-users-headText')}
          className="mt-9 mb-3"
        />
        <ContentMain>
        <Swiper spaceBetween={8} slidesPerView={"auto"} freeMode={true} centeredSlides={false} className="!m-0">
            {isLoading ? (
              <>
                {[...Array(8)].map((_, index) => (
                  <SwiperSlide style={{ width: '178px' }} key={index}>
                    <CreatorCardSkeleton />
                  </SwiperSlide>
                ))}
              </>
            ) : (
              <>  
                {users && users.length > 0 ? users.map((user) => (
                  <SwiperSlide style={{ width: '178px' }} key={user.id}>
                    <CreatorCard
                      id={user.id}
                      userImage={user.image}
                      name={user.name}
                      followers={user.followerCount}
                      recipes={user.recipeCount}
                      userBanner={user.backgroundImage}
                    />
                  </SwiperSlide>
                )) : (
                  <p className="flex h-40 opacity-50 w-full justify-center items-center">{t('nothing-found')}</p>
                )}
              </>
            )}
          </Swiper>
        </ContentMain>
      </div>
    </>
  )
}

export default Home;