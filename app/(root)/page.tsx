"use client"

import Recipecard   from "@/components/cards/RecipeCard";
import CreatorCard  from "@/components/cards/CreatorCard";
import Link         from "next/link";
import { useTheme } from "next-themes";

const Home = () => {
  const { theme } = useTheme();

  return (
    <>
      <h1 className='head-text'>Home</h1>
      <div className="flex items-center justify-between  mt-9">
        <h2 className='second-head-text'>Popular recipes</h2>
        <Link className={theme === "dark" ? "text-color-custom-yellow" : "text-color-orange"} href={'/search'} >See all</Link>
      </div>
      <div className="mt-3 mb-28 ">
        <div className="overflow-x-auto">
          <div className="flex justify-between w-width-1480">
            {[...Array(6)].map(() => (
              <Recipecard 
                key={'ssgsg'}
                id="dgfg9034hg348yfg3j0s94"
                recipeName ="Meat pie"
                recipeImage=""
                foodType="Meat"
                cookingTime="10-15 minutes"
                complexity="Middle"
                author="Jhon Doe"
              />
            ))}
          </div>
        </div>
        <h2 className='second-head-text mt-9 mb-3'>Popular creators</h2>
        <div className="overflow-x-auto">
          <div className="flex justify-between w-width-1480">
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
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;