import { StarIcon } from "@/icons"
import { MouseEventHandler, useState } from "react";

interface IRecipeRating {
  averageRating  : number;
  ratingValue    : number;
  onClick        : () => void;
  hover          : number;
  rating         : number;
  setHoverOnEnter: (value: number) => void;
  setHoverOnLeave: (value: number) => void;
}

export const RecipeRating = ({
  averageRating,
  ratingValue,
  onClick,
  hover,
  rating,
  setHoverOnEnter,
  setHoverOnLeave,
}: IRecipeRating) => {
  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        name="rating"
        value={ratingValue}
        onClick={onClick}
        hidden
      />
      <StarIcon
        className={`w-10 h-10 transition-all ${ratingValue <= (hover || rating) ? "star-icon" : " star-icon-active"}`}
        onMouseEnter={() => setHoverOnEnter(ratingValue)}
        onMouseLeave={() => setHoverOnLeave(0)}
      />
    </label>
  )
}