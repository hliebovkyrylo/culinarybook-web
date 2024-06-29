import { RecipeContentCardSkeleton } from "@/components/recipes/RecipeContentCardSkeleton";
import { IStep } from "@/typings/recipe"
import { useTranslation } from "next-i18next";
import { Swiper, SwiperSlide } from "swiper/react"

interface IStepsData {
  data: IStep[] | undefined;
  isLoading: boolean;
}

export const StepsData = ({
  data,
  isLoading
}: IStepsData) => {
  const { t } = useTranslation("common");
  return (
    <>
      <h3 className="link-text font-semibold my-5">{t('title-instructions')}</h3>
      <Swiper spaceBetween={12} slidesPerView={"auto"} freeMode={true} centeredSlides={false} className="!m-0">
        {isLoading ? (
          <>
            {[...Array(5)].map((_, index) => (
              <SwiperSlide style={{ width: '300px' }} key={index}>
                <RecipeContentCardSkeleton />
              </SwiperSlide>
            ))}
          </>
        ) : (
          <>
            {data && data.map((step, index) => (
              <SwiperSlide style={{ width: '300px' }} key={index}>
                <div className="relative bg-[#cccccc4b] dark:bg-[#41414159] break-words p-3 rounded-xl min-h-[128px]">
                  <span className="left-3 top-2 link-text font-semibold z-50">{t('step')} {index + 1}</span>
                  <pre className="font-montserrat text-base">{step.stepDescription}</pre>
                </div>
              </SwiperSlide>
            ))}
          </>
        )}

      </Swiper>
    </>
  )
}