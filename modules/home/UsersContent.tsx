import { CreatorCard, CreatorCardSkeleton } from "@/components/users";
import { IUser }                            from "@/typings/user"
import { useTranslation }                   from "next-i18next";
import { Swiper, SwiperSlide }              from "swiper/react";

interface IUserContent {
  data     : IUser[] | undefined;
  isLoading: boolean;
};

export const UsersContent = ({
  data,
  isLoading
}: IUserContent) => {
  const { t } = useTranslation('common');
  return (
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
          {data && data.length > 0 ? data.map((user) => (
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
  )
}