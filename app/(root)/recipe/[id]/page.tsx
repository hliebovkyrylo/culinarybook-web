"use client"

import { 
  RecipeComment, 
  RecipeCommentContent, 
  RecipeContentCard, 
  RecipeInfo, 
  RecipeRating 
}                   from "@/components/recipe";
import Button       from "@/ui/button/Button";
import { Input }    from "@/ui/input/Input";
import Image        from "next/image";
import { useEffect, useRef, useState } from "react";

const Recipe = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
  };

  const isBackgroundApplied = true;
  
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  
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
      <div className="flex overflow-x-auto">
        {[...Array(12)].map(() => (
          <div className="relative">
            <span className="absolute left-3 top-2 link-text font-semibold z-50">Step 1</span>
            <RecipeContentCard text="dfgasf" className="w-[300px] !pt-10 min-h-[128px] mr-3" />
          </div>
        ))}
      </div>
      <div className="mt-12">
        <h3 className="link-text font-semibold my-5">Reviews and ratings</h3>
        <div className="flex">
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <RecipeRating
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
          {[...Array(4)].map(() => (
            <RecipeComment 
              username="jhondoe"
              commentText="Awesome recipe."
              rating={4}
            />
          ))}
        </RecipeCommentContent>
      </div>
    </>
  )
}

export default Recipe;