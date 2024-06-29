export const Loader = ({ className }: { className?: string }) => {
  return (
    <div className={`w-full h-full flex justify-center items-center z-50 dark:bg-bg-c bg-bg-c-7 ${className}`}>
      <div className="dark:border-[#222222] border-neutral-300 h-14 w-14 animate-spin rounded-full border-8 dark:border-t-[#DDDF72] border-t-[#C77D0A]" />
    </div>
  )
}