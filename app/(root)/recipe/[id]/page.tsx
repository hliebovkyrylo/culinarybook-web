"use client"

import { renderMetaTags }      from "@/app/meta";
import { 
  PrivateRecipe,
  RecipeComment, 
  RecipeCommentContent, 
  RecipeCommentSkeleton, 
  RecipeContentCard, 
  RecipeContentCardSkeleton, 
  RecipeInfo, 
  RecipeRating 
}                              from "@/components/recipe";
import { Loader }              from "@/components/shared";
import { useToggleState }      from "@/hooks/useToggleState";
import { Button }              from "@/ui";
import { Input }               from "@/ui/input/Input";
import Head from "next/head";
import Image                   from "next/image";
import { useState }            from "react";
import { useTranslation }      from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import                              'swiper/swiper-bundle.css';

const Recipe = () => {
  const { t } = useTranslation();

  const isPublicRecipe = true;

  const isLoadingRecipe         = false;
  const isLoadingSteps          = false;
  const isLoadingComments       = false;
  const isLoadingCommentReplies = false;

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleLikeClick = () => setIsLiked(!isLiked);
  const handleSaveClick = () => setIsSaved(!isSaved);

  const isBackgroundApplied = true;
  
  const [rating, setRating] = useState(0);
  const [hover, setHover]   = useState(0);

  const [openReplies, toggleOpenReplies]                     = useToggleState({});
  const [openReplyInput, toggleOpenReplyInput]               = useToggleState({});
  const [openReplyAnswearInput, toggleOpenReplyAnswearInput] = useToggleState({});

  if (isLoadingRecipe) {
    return <Loader />
  }

  if (!isPublicRecipe) {
    return <PrivateRecipe />
  }
  
  return (
    <>
      {renderMetaTags({ title: "Tasty burger", description: "It's very tasty burger" })}
      <Head>
        <title>Burger</title>
      </Head>
      {isBackgroundApplied && (
        <Image src={'/assets/burger.jpg'} alt="Background image" width={1000} height={1000} className=" absolute top-0 left-0 w-full h-full object-cover -z-10 blur-sm opacity-10" />
      )}
      <RecipeInfo 
        title="Burger"
        coockingTime="20 minutes"
        complexity="Easy"
        typeOfFood="Fast food"
        numbersOfLikes={34}
        averageGrade={4}
        isLiked={isLiked}
        isSaved={isSaved}
        likeButtonClick={handleLikeClick}
        saveButtonClick={handleSaveClick}
      />
      <h3 className="link-text font-semibold my-5">{t('title-ingradients')}</h3>
      <RecipeContentCard className="w-full max-w-[364px]" text={
        <>
          130 g flour, <br/> 340 ml milk, <br/> 2 eggs, <br/> 2 tbsp. <br/> l. sunflower oil (and additional for frying), <br/> 2 tbsp. <br/> l. sugar, <br/> 1 pinch of salt
        </>
      } />
      <h3 className="link-text font-semibold my-5">{t('title-instructions')}</h3>
      <div className="flex justify-start">
        <Swiper spaceBetween={70} slidesPerView={"auto"} freeMode={true} centeredSlides={false} className="!m-0">
          {isLoadingSteps ? (
            <>
              {[...Array(5)].map(() => (
                <SwiperSlide style={{ width: '240px' }} key={'26g432g2354g34'}>
                  <RecipeContentCardSkeleton />
                </SwiperSlide>
              ))}
            </>
          ) : (
            <>
              {[...Array(7)].map((_, index) => (
                <SwiperSlide style={{ width: '240px' }} key={'26g432g2354g34'}>
                  <div className="relative">
                    <span className="absolute left-3 top-2 link-text font-semibold z-50">{t('step')} {index + 1}</span>
                    <RecipeContentCard text="dfgasf" className="w-[300px] !pt-10 min-h-[128px]" />
                  </div>
                </SwiperSlide>
              ))}
            </>
          )}
          
        </Swiper>
      </div>
      <div className="mt-12">
        <h3 className="link-text font-semibold my-5">{t('title-comment')}</h3>
        <div className="flex">
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <RecipeRating
                key={'12455234'}
                averageRating={4}
                ratingValue={ratingValue}
                hover={hover}
                rating={rating}
                setHoverOnEnter={() => setHover(ratingValue)}
                setHoverOnLeave={() => setHover(0)}
                onClick={() => setRating(ratingValue)}
              />
            )
          })}
        </div>
        <Input type="text" className="max-w-[615px] block mt-8" placeholder={t('comment-placeholder')} />
        <Button className="max-w-[234px] cursor-pointer my-8" text={t('create-comment-button')} isActive={true} />
        <RecipeCommentContent>
          {isLoadingComments ? (
            <>
              {[...Array(5)].map(() => (
                <RecipeCommentSkeleton className="mb-6" />
              ))}
            </> 
          ) : (
            <>
              {[...Array(4)].map((_, index) => (
                <div className="mb-6" key={index}>
                  <RecipeComment 
                    key={index}
                    username="jhondoe"
                    commentText="Awesome recipe."
                    rating={4}
                    userId="3489hg33934hujgg"
                    numbersOfReplies={1}
                    onClickOpenReplies={() => toggleOpenReplies(`3489hg33934hujgg${index}`)}
                    isOpenReplies={openReplies[`3489hg33934hujgg${index}`]}
                    onClickReply={() => toggleOpenReplyInput(`3489hg33934hujgg${index}`)}
                  />
                  <div className="ml-14">
                    {openReplyInput[`3489hg33934hujgg${index}`] && (
                      <>
                        <Input type="text" placeholder={t('comment-placeholder')} />
                        <div className="flex justify-end mt-3">
                          <button onClick={() => toggleOpenReplyInput(`3489hg33934hujgg${index}`)} className=" mr-4">{t('canclel-button')}</button>
                          <Button text={t('reply-button')} isActive={true} className="max-w-[128px] h-8 flex justify-center items-center" />
                        </div>
                      </>
                    )}
                    {openReplies[`3489hg33934hujgg${index}`] && (
                      <div className=" my-4">
                        {isLoadingCommentReplies ? (
                          <>
                            <RecipeCommentSkeleton className="mb-6" />
                          </>
                        ) : (
                          <>
                            {[...Array(1)].map(() => (
                              <div>
                                <RecipeComment 
                                  key={index}
                                  username="jhondoe"
                                  commentText="how did you do it?"
                                  userId="3489hg33934hujgg1" 
                                  onClickReply={() => toggleOpenReplyAnswearInput(`3489hg33934hujgg1${index}`)}
                                />
                                {openReplyAnswearInput[`3489hg33934hujgg1${index}`] && (
                                  <div className="ml-14">
                                    <Input type="text" placeholder={t('comment-placeholder')} defaultValue={`@jhondoe `} />
                                    <div className="flex justify-end mt-3">
                                      <button onClick={() => toggleOpenReplyAnswearInput(`3489hg33934hujgg1${index}`)} className=" mr-4">{t('canclel-button')}</button>
                                      <Button text={t('reply-button')} isActive={true} className="max-w-[128px] h-8 flex justify-center items-center" />
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </RecipeCommentContent>
      </div>
    </>
  )
}

export default Recipe;