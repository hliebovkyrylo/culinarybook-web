export const RecipeCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <article className={`recipecard overflow-hidden h-[297px] animate-pulse ${className}`}>
      <div className="overflow-hidden">
        <div
          className={'rounded-tl-xl h-[125px] bg-[#a5a5a518] object-cover rounded-tr-xl transition-all w-[230px]'}
        />
      </div>
      <div className="flex flex-col px-4 pt-3 pb-6">
        <span className="w-44 h-4 bg-[#a5a5a518] rounded-md" />
        <span className="w-20 h-4 bg-[#a5a5a518] rounded-md my-2" />
        <div className="flex">
          <div className="w-5 h-5 bg-[#a5a5a518] rounded-full mr-2" />
          <span className="w-24 h-4 bg-[#a5a5a518] rounded-md" />
        </div>
      </div>
    </article>
  )
}