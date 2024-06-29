import { StarIcon } from "@/icons";
import { useState } from "react";

interface ICommentRating {
  averageRating: number;
  rating: number;
  onClick: (value: number) => void;
}

export const CommentRating = ({
  averageRating,
  rating,
  onClick,
}: ICommentRating) => {
  const [hover, setHover] = useState<number>(averageRating);

  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <label className="cursor-pointer" key={ratingValue}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => onClick(ratingValue)}
              hidden
            />
            <StarIcon
              className={`w-10 h-10 transition-all ${ratingValue <= (hover || rating) ? "star-icon" : "star-icon-active"}`}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};
