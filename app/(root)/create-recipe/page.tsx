"use client"

import { useRef, useState } from "react";
import Image from "next/image";
import RecipeInput from "@/components/create-recipe/RecipeInput/RecipeInput";
import RecipeButton from "@/components/create-recipe/RecipeButton/RecipeButton";
import RecipeTextarea from "@/components/create-recipe/RecipeTextarea/RecipeTextarea";
import RecipeCreateButton from "@/components/create-recipe/RecipeCreateButton/RecipeCreateButton";

const CreateRecipe = () => {
  const [elements, setElements] = useState<JSX.Element[]>([]);

  const handleClick = () => {
    setElements(prevElements => [...prevElements, <div className="relative">
      <span className="absolute left-3 top-2 text-color-custom-yellow font-semibold z-50">{`Step ${prevElements.length + 2}`}</span>
      <RecipeTextarea placeholder="Enter text for step..." className="!pt-10 min-h-[128px] mr-3" />
    </div>]);
  };

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <h1 className="head-text">Create recipe</h1>
      <input ref={inputFileRef} type="file" accept="image/*" hidden />

      <form className=" my-7">
          <div className="flex">
            <button onClick={() => inputFileRef.current?.click()} type="button" className="max-w-xl w-full h-80 bg-bg-c-2 flex items-center justify-center rounded-xl">
              <Image src={'/assets/icons/camera.svg'} alt="Camera" width={48} height={48} />
            </button>
            <div className="ml-12">
              <RecipeInput
                placeholder="Enter recipe name..."
                type="text"
                image="/assets/icons/file-signature.svg"
              />
              <RecipeInput
                placeholder="Cooking time..."
                type="text"
                image="/assets/icons/clock.svg"
              />
              <div className="flex mb-3">
                <Image src={'/assets/icons/medal-2.svg'} alt="Name" width={20} height={20} />
                <select className="bg-bg-c-2 rounded-md ml-3">
                  <option>Easy</option>
                  <option>Middle</option>
                  <option>Hard</option>
                </select>
              </div>
              <div className="flex mb-3">
                <Image src={'/assets/icons/lock.png'} alt="Name" width={20} height={20} />
                <select className="bg-bg-c-2 rounded-md ml-3">
                  <option>Avaible for everyone</option>
                  <option>Avaible only to me</option>
                </select>
              </div>
            </div>
          </div>
          <h3 className="text-color-custom-yellow font-semibold my-5">Ingredients</h3>
          <RecipeTextarea placeholder="Enter ingredients..." className="!w-96 min-h-[64px]" />
          <h3 className="text-color-custom-yellow font-semibold my-5">Instructions</h3>
          <div className="flex overflow-x-auto">
            <div className="relative">
              <span className="absolute left-3 top-2 text-color-custom-yellow font-semibold z-50">Step 1</span>
              <RecipeTextarea placeholder="Enter text for step..." className="!pt-10 min-h-[128px] mr-3" />
            </div>
            {elements}
            <RecipeButton
              buttonClick={handleClick}
            />
          </div>
        <RecipeCreateButton />
      </form>
    </>
  )
};

export default CreateRecipe;