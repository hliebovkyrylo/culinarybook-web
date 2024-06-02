import { LockIcon } from "@/icons"
import { cn } from "@/lib/utils"
import Link         from "next/link"

export const Private = ({ className, type }: { className?: string, type: string }) => {
  return (
    <div className={cn('w-full h-full main-background flex justify-center flex-col items-center', className)}>
      <LockIcon className="w-12 h-12" />
      <p className="my-2">{`This ${type} is private!`}</p>
      <Link href={'/'} className=" w-48 h-10 flex justify-center items-center follower-card-bg rounded-md">Back home</Link>
    </div>
  )
}