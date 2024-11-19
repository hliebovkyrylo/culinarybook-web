export const RecipeContentCardSkeleton = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div className="relative w-[300px]">
      <span className="absolute left-3 top-2 link-text font-semibold z-50 w-16 h-6 bg-[#0000001a] rounded-md" />
      <article
        className={`recipe-content-card h-[128px] !pt-10 animate-pulse ${className}`}
      >
        <div className="w-full h-4 bg-[#0000001a] rounded-md" />
        <div className=" w-3/4 mt-2 h-4 bg-[#0000001a] rounded-md" />
      </article>
    </div>
  );
};
