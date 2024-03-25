"use client"

import { XMarkIcon } from "@/icons"
import Link          from "next/link"
import { useRouter } from "next/navigation";

export const FollowWindow = ({ children, title, userId }: { children: React.ReactNode, title: string, userId: string }) => {
  const router = useRouter();


  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    router.back();
  };

  const handleInsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };
  return (
    <div className="fixed w-full h-screen flex justify-center items-center top-0 left-0 settings-background z-[60]" onClick={handleOutsideClick}>
      <section className="w-full max-w-md h-[520px] main-background p-4 rounded-lg mx-4" onClick={handleInsideClick}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="second-head-text">{title}</h2>
          <Link href={`/profile/${userId}`}><XMarkIcon className="w-6 h-6 dark:fill-white fill-black dark:hover:bg-bg-c-5 hover:bg-bg-c-8 rounded-full" /></Link>
        </div>
        <div className="overflow-y-auto h-[432px]">
          {children}
        </div>
      </section>
    </div>
  )
}