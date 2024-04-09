"use client"

import { 
  ContentHeader, 
  ContentMain 
}                          from "@/components/home";
import Recipecard          from "@/components/cards/RecipeCard/RecipeCard";
import CreatorCard         from "@/components/cards/CreatorCard/CreatorCard";
import Image               from "next/image";
import { Loader }          from "@/components/shared";
import { useTranslation }  from "react-i18next";
import { 
  CreatorCardSkeleton, 
  RecipeCardSkeleton 
}                          from "@/components/cards";

const Home = () => {
  const isLoading = false;
  const { t }     = useTranslation();

  return (
    <>
      {isLoading ? (
        <Loader className="!-z-10 absolute top-0 left-0 blur-[2px]" />
      ) : (
        <Image className="absolute w-full h-screen top-0 left-0 object-cover z-[-1] blur-sm opacity-10" src={"/assets/testrecipephoto.jpg"} alt="" width={500} height={500} />
      )}
      <h1 className='head-text'>{t('title')}</h1>
      <ContentHeader
        title={t('recipes-headText')}
        linkText={t('link')}
        linkHref={`/search/recipes`}
        className="mt-6"
      />
      <div className="mt-3 mb-28">
        <ContentMain>
          {isLoading ? (
            <>
              {[...Array(6)].map(() => (
                <RecipeCardSkeleton />
              ))}
            </>
          ) : (
            <>
              {[...Array(6)].map(() => (
                <Recipecard
                  key={'ssgsg'}
                  id="dgfg9034hg348yfg3j0s94"
                  recipeName="Meat pie"
                  recipeImage=""
                  foodType="Meat"
                  cookingTime="10-15 minutes"
                  complexity="Middle"
                  author="Jhon Doe"
                />
              ))}
            </>
          )}
        </ContentMain>
        <ContentHeader
          title={t('users-headText')}
          className="mt-9 mb-3"
        />
        <ContentMain>
          {isLoading ? (
            <>
              {[...Array(8)].map(() => (
                <CreatorCardSkeleton />
              ))}
            </>
          ) : (
            <>  
              {[...Array(8)].map(() => (
                <CreatorCard
                  key={'ssgs' + 1}
                  id="fgsdfgheth53"
                  userImage="/assets/testuserimage.jpg"
                  name="Jhon Doe"
                  followers={100}
                  recipes={17}
                  userBanner={"/assets/testbanner.jpg"}
                />
              ))}
            </>
          )}
        </ContentMain>
      </div>
    </>
  )
}

export default Home;