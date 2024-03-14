import Image from "next/image";

interface IProfileUserInfo {
  username        : string;
  recipesNumber   : number;
  followersNumber : number;
  followingsNumber: number;
  name            : string;
  image          ?: string;
}

export const ProfileUserInfo = ({
  username,
  recipesNumber, 
  followersNumber, 
  followingsNumber,
  name,
  image
}: IProfileUserInfo) => {
  return (
    <section className="flex">
      <Image src={image || "/assets/testuserimage.jpg"} alt="User image" className="object-cover rounded-full w-40 h-40 max-[537px]:w-20 max-[537px]:h-20" width={160} height={160} />
      <div className="w-80 h-36 flex flex-col justify-around ml-14 max-[537px]:ml-4">
        <div>
          <p className="default-text">@{username}</p>
        </div>
        <div className="flex justify-between">
          <p className="default-text text-center"><span className="link-text">{recipesNumber}</span> {recipesNumber > 1 ? "recipes" : "recipe"}</p>
          <p className="default-text text-center"><span className="link-text">{followersNumber}</span> {followersNumber > 1 ? "followers" : "follower"}</p>
          <p className="default-text text-center"><span className="link-text">{followingsNumber}</span> {followingsNumber > 1 ? "followings" : "following"}</p>
        </div>
        <p className="default-text">{name}</p>
      </div>
    </section>
  )
}