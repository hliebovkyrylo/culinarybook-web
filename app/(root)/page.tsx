"use client"

import { 
  ContentHeader, 
  ContentMain 
}                  from "@/components/home";
import Recipecard  from "@/components/cards/RecipeCard";
import CreatorCard from "@/components/cards/CreatorCard";
import Image       from "next/image";

const Home = () => {
  return (
    <>
      <Image className="absolute w-full h-screen top-0 left-0 object-cover z-[-1] blur-sm opacity-10" src={"/assets/testrecipephoto.jpg"} alt="" width={500} height={500} />
      <h1 className='head-text'>Home</h1>
      <ContentHeader
        title="Based on your interests"
        linkText="See all"
        linkHref="/search"
        className="mt-6"
      />
      <div className="mt-3 mb-28">
        <ContentMain>
          {[...Array(6)].map(() => (
            <Recipecard
              key={'ssgsg'}
              id="dgfg9034hg348yfg3j0s94"
              recipeName="Meat pie"
              recipeImage=""
              foodType="Meat"
              cookingTime="10-15 minutes"
              complexity="Middle"
              author="Jhon Doe"
            />
          ))}
        </ContentMain>
        <ContentHeader
          title="Popular creators"
          className="mt-9 mb-3"
        />
        <ContentMain>
          {[...Array(1)].map(() => (
            <CreatorCard
              key={'ssgs' + 1}
              id="fgsdfgheth53"
              userImage="/assets/testuserimage.jpg"
              name="Jhon Doe"
              followers={100}
              recipes={17}
            />
          ))}
        </ContentMain>
      </div>
    </>
  )
}

export default Home;