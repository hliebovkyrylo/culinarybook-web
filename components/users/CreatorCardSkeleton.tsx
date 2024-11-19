export const CreatorCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <article
      className={`bg-[#cccccc4b] dark:bg-[#a5a5a518] w-[178px] h-[160px] py-3 px-4 rounded-xl animate-pulse ${className}`}
    >
      <div className={"rounded-full w-8 h-8 bg-[#a5a5a518] transition-all"} />
      <div className="my-4 w-20 h-4 bg-[#a5a5a518] rounded-md" />
      <div className="flex items-center mb-1">
        <div className="bg-[#a5a5a518] w-12 h-4 rounded-md" />
      </div>
      <div className="flex items-center">
        <div className="bg-[#a5a5a518] w-10 h-4 rounded-md" />
      </div>
    </article>
  );
};
