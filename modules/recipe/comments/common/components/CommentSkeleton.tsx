import { StarIcon } from "@/icons"

export const CommentSkeleton = ({ className }: { className?: string }) => {
  return (
    <article className={`flex animate-pulse ${className}`}>
      <div className="w-12 h-12 dark:bg-[#1d1d1d] bg-[#c9c9c9] mr-2 rounded-full"></div>
      <div className="flex flex-col justify-around">
        <div className="flex">
          <div className="w-24 h-4 dark:bg-[#1d1d1d] bg-[#c9c9c9] rounded-md" />
          <div className="flex ml-2">
            {[...Array(5)].map((_, index) => (
            <StarIcon className="w-3 dark:fill-[#1d1d1d] fill-[#c9c9c9]" key={index} />
            ))}
          </div>
        </div>
        <p className="w-36 h-4 dark:bg-[#1d1d1d] bg-[#c9c9c9] rounded-md" />
      </div>
    </article>
  )
}