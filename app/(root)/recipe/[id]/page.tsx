"use client"

import { 
  RecipeComment, 
  RecipeCommentContent, 
  RecipeContentCard, 
  RecipeInfo, 
  RecipeRating 
}                              from "@/components/recipe";
import { useToggleState }      from "@/hooks/useToggleState";
import { Button }              from "@/ui";
import { Input }               from "@/ui/input/Input";
import Image                   from "next/image";
import { useState }            from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import                              'swiper/swiper-bundle.css';

const Recipe = () => {
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
  
  return (
    <>
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
      <h3 className="link-text font-semibold my-5">Ingredients</h3>
      <RecipeContentCard className="w-full max-w-[364px]" text={
        <>
          130 g flour, <br/> 340 ml milk, <br/> 2 eggs, <br/> 2 tbsp. <br/> l. sunflower oil (and additional for frying), <br/> 2 tbsp. <br/> l. sugar, <br/> 1 pinch of salt
        </>
      } />
      <h3 className="link-text font-semibold my-5">Instructions</h3>
      <div className="flex justify-start">
        <Swiper spaceBetween={70} slidesPerView={"auto"} freeMode={true} centeredSlides={false} className="!m-0">
          {[...Array(12)].map(() => (
            <SwiperSlide style={{ width: '240px' }} key={'26g432g2354g34'}>
              <div className="relative">
                <span className="absolute left-3 top-2 link-text font-semibold z-50">Step 1</span>
                <RecipeContentCard text="dfgasf" className="w-[300px] !pt-10 min-h-[128px]" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mt-12">
        <h3 className="link-text font-semibold my-5">Reviews and ratings</h3>
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
        <Input type="text" className="max-w-[615px] block mt-8" placeholder="Write your review..." />
        <Button className="max-w-[234px] cursor-pointer my-8" text="Send your review" isActive={true} />
        <RecipeCommentContent>
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
                    <Input type="text" placeholder="Write your comment" />
                    <div className="flex justify-end mt-3">
                      <button onClick={() => toggleOpenReplyInput(`3489hg33934hujgg${index}`)} className=" mr-4">Cancel</button>
                      <Button text="Reply" isActive={true} className="max-w-[128px] h-8 flex justify-center items-center" />
                    </div>
                  </>
                )}
                {openReplies[`3489hg33934hujgg${index}`] && (
                  <div className=" my-4">
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
                            <Input type="text" placeholder="Write your comment" defaultValue={`@jhondoe `} />
                            <div className="flex justify-end mt-3">
                              <button onClick={() => toggleOpenReplyAnswearInput(`3489hg33934hujgg1${index}`)} className=" mr-4">Cancel</button>
                              <Button text="Reply" isActive={true} className="max-w-[128px] h-8 flex justify-center items-center" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </RecipeCommentContent>
      </div>
    </>
  )
}

export default Recipe;