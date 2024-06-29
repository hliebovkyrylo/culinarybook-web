import { RecipeCard, RecipeCardSkeleton } from "@/components/recipes";
import { IRecipePreview } from "@/typings/recipe";
import { useTranslation } from "next-i18next";
import { Swiper, SwiperSlide } from "swiper/react";

interface IRecipesContent {
  isLoading: boolean;
  data: IRecipePreview[] | undefined;
}

export const RecipesContent = ({
  isLoading,
  data
}: IRecipesContent) => {
  const { t } = useTranslation('common');
  return (
    <Swiper spaceBetween={18} slidesPerView={"auto"} freeMode={true} centeredSlides={false} className="!m-0">
      {isLoading ? (
        <>
          {[...Array(6)].map((_, index) => (
            <SwiperSlide style={{ width: '230px' }} key={index}>
              <RecipeCardSkeleton key={index} />
            </SwiperSlide>
          ))}
        </>
      ) : (
        <>
          {data && data.length > 0 ? data.map((recipe) => (
            <SwiperSlide style={{ width: '230px' }} key={recipe.id}>
              <RecipeCard
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
  )
}