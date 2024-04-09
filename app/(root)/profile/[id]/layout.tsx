"use client"

import { 
  PrivateAccount, 
  ProfilePanel, 
  ProfileUserInfo 
}                 from "@/components/profile";
import { Loader } from "@/components/shared";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const isLoading        = false;
  const isPrivateAccount = false;

  if (isLoading) {
    return <Loader />
  }
  return (
    <div className="w-full z-50 flex flex-col h-full">
      <ProfileUserInfo
        username="jhondoe"
        userId="3489hg33934hujgg"
        name="Jhon Doe"
        followersNumber={54}
        followingsNumber={13}
        recipesNumber={1}
        isFollowed={false}
        followActions={() => {}}
      />
      <ProfilePanel
        userId="3489hg33934hujgg"
        className="my-2"
      />
      {isPrivateAccount ? (
          <div className=" flex flex-col flex-grow h-full">
            <PrivateAccount />
          </div>
        ) : (
          <div className="grid grid-cols-6 justify-items-center max-[1488px]:grid-cols-5 max-[1220px]:grid-cols-4 max-lg:grid-cols-3 max-[748px]:grid-cols-1">
            {children}
          </div>
        )}
    </div>
  )
}

export default ProfileLayout;