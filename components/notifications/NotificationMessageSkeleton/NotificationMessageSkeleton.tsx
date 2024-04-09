export const NotificationMessageSkeleton = () => {
  return (
    <article className="w-full min-h-[64px] second-background flex items-center py-2 px-3 rounded-lg mb-2 animate-pulse">
      <div className="flex justify-between w-full">
        <div className="flex justify-between">
          <div className="w-12 h-12 bg-[#00000041] rounded-full mr-2" />
          <div>
            <div>
              <div className="w-80 h-4 bg-[#00000041] mt-1 rounded-md" />
              <div className="w-36 h-4 bg-[#00000041] mt-1 rounded-md" />
            </div>
            <div className="flex items-center">
              <p className="text-[#959595] text-sm" />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}