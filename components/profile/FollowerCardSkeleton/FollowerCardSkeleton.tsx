export const FollowerCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <article className={`flex justify-between items-center rounded-md px-3 py-2 follower-card-bg animate-pulse ${className}`}>
      <div className="flex">
        <div className="w-12 h-12 rounded-full bg-[#3d3d3d5b] mr-2" />
        <div className="flex flex-col justify-around">
          <div className="w-20 h-4 bg-[#3d3d3d5b] rounded-md" />
          <div className="w-20 h-5 bg-[#3d3d3d5b] rounded-md" />
        </div>
      </div>
    </article>
  )
};