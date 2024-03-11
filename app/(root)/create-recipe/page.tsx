"use client"

import { 
  useEffect,
  useRef, 
  useState 
}                           from "react";
import {
  ClockIcon, 
  FileIcon, 
  LockIcon, 
  SecondMedalIcon, 
  UntesilsIcon
}                           from "@/icons";
import { 
  SelectButton, 
  SelectContent, 
  SelectField 
}                           from "@/components/select";
import Button               from "@/ui/button/Button";
import Textarea             from "@/ui/textarea/Textarea";
import { 
  RecipeCreateCover, 
  RecipeInput, 
  RecipeButton 
}                           from "@/components/create-recipe";

const CreateRecipe = () => {
  const [elements, setElements]       = useState<JSX.Element[]>([]);
  const [recipeImage, setRecipeImage] = useState<File | null>(null);

  const handleClick = () => {
    setElements(prevElements => [...prevElements, <div className="relative">
      <span className="absolute left-3 top-2 text-color-custom-yellow font-semibold z-50">{`Step ${prevElements.length + 2}`}</span>
      <Textarea placeholder="Enter text for step..." className="!pt-10 min-h-[128px] mr-3 w-[300px]" />
    </div>]);
  };

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setRecipeImage(file);
    }
  }

  const [activeId, setActiveId] = useState<string | null>(null);

  const [complexity, setComplexity] = useState<string>(""); 
  const [access, setAccess]         = useState<string>(""); 
  const [type, setType]             = useState<string>(""); 

  const onClickSetValue = (id: string, value: string) => {
    if (id === 'complexity') {
      setComplexity(value);
    } else if (id === 'access') {
      setAccess(value);
    } else if (id === 'type') {
      setType(value);
    }

    setActiveId(null);
  };

  const onClickChangeStates = (id: string) => {
    setActiveId(prevId => prevId === id ? null : id);
  };


  return (
    <>
      <h1 className="head-text">Create recipe</h1>
      <input ref={inputFileRef} onChange={handleImageChange} type="file" accept="image/*" hidden />
      <form className=" my-7">
          <div className="flex max-md:flex-col">
            <RecipeCreateCover 
              recipeImage={recipeImage}
              onClick={() => inputFileRef.current?.click()}
            />
            <div className="ml-12 max-md:ml-0 max-md:mt-6">
              <RecipeInput
                placeholder="Enter recipe name..."
                type="text"
                image={<FileIcon className="w-5 h-5" />}
              />
              <RecipeInput
                placeholder="Cooking time..."
                type="text"
                image={<ClockIcon className="w-5 h-5" />}
              />
              <div className="flex mb-3">
                <SecondMedalIcon className="w-5 h-5"/>
                <div className="relative ml-3">
                  <SelectButton 
                    isActive={activeId === 'complexity'} 
                    className="w-32 text-left" 
                    title={complexity === '' ? 'Complexity' : complexity}
                    onClick={() => onClickChangeStates('complexity')} 
                  />
                  <SelectContent isActive={activeId === 'complexity'}>
                    <SelectField value="Easy" id="1" onClick={() => onClickSetValue('complexity', "Easy")} />
                    <SelectField value="Middle" id="2" onClick={() => onClickSetValue('complexity', "Middle")} />
                    <SelectField value="Hard" id="3" onClick={() => onClickSetValue('complexity', "Hard")} />
                  </SelectContent>
                </div>
              </div>
              <div className="flex mb-3">
                <LockIcon className="w-5 h-5" />
                <div className="relative ml-3">
                  <SelectButton 
                    isActive={activeId === 'access'} 
                    className="w-[218px] text-left" 
                    title={access === '' ? 'Access' : access}
                    onClick={() => onClickChangeStates('access')} 
                  />
                  <SelectContent isActive={activeId === 'access'}>
                    <SelectField icon={<span>🌐</span>} value="Avaible for everyone" id="1" onClick={() => onClickSetValue('access', "Avaible for everyone")} />
                    <SelectField icon={<span>🔒</span>} value="Avaible only to me" id="2" onClick={() => onClickSetValue('access', "Avaible only to me")} />
                  </SelectContent>
                </div>
              </div>
              <div className="flex mb-3">
                <UntesilsIcon className="w-5 h-5 fill-[#666]" />
                <div className="relative ml-3">
                  <SelectButton 
                    isActive={activeId === 'type'} 
                    className="w-[218px] text-left" 
                    title={type === '' ? 'Type of food' : type} 
                    onClick={() => onClickChangeStates('type')} 
                  />
                  <SelectContent isActive={activeId === 'type'}>
                    <SelectField icon={<span>🍖</span>} value="Meat" id="1" onClick={() => onClickSetValue('type', "Meat")} />
                    <SelectField icon={<span>🍩</span>} value="Dessert" id="1" onClick={() => onClickSetValue('type', "Dessert")} />
                    <SelectField icon={<span>🍔</span>} value="Fast food" id="1" onClick={() => onClickSetValue('type', "Fast food")} />
                    <SelectField icon={<span>🍹</span>} value="Soft drink" id="1" onClick={() => onClickSetValue('type', "Soft drink")} />
                    <SelectField icon={<span>🍸</span>} value="Alcohol drink" id="1" onClick={() => onClickSetValue('type', "Alcohol drink")} />
                    <SelectField icon={<span>🍲</span>} value="Soup" id="1" onClick={() => onClickSetValue('type', "Soup")} />
                    <SelectField icon={<span>🥘</span>} value="Porridge" id="1" onClick={() => onClickSetValue('type', "Porridge")} />
                    <SelectField icon={<span>🥗</span>} value="Salad" id="1" onClick={() => onClickSetValue('type', "Salad")} />
                    <SelectField icon={<span>🍝</span>} value="National dish" id="1" onClick={() => onClickSetValue('type', "National dish")} />
                    <SelectField icon={<span>🍜</span>} value="Pasta" id="1" onClick={() => onClickSetValue('type', "Pasta")} />
                    <SelectField icon={<span>🐟</span>} value="Fish" id="1" onClick={() => onClickSetValue('type', "Fish")} />
                  </SelectContent>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-color-custom-yellow font-semibold my-5">Ingredients</h3>
          <Textarea placeholder="Enter ingredients..." className="w-full max-w-sm min-h-[170px]" />
          <h3 className="text-color-custom-yellow font-semibold my-5">Instructions</h3>
          <div className="flex overflow-x-auto">
            <div className="relative">
              <span className="absolute left-3 top-2 text-color-custom-yellow font-semibold z-50">Step 1</span>
              <Textarea placeholder="Enter text for step..." className="!pt-10 min-h-[128px] mr-3 w-[300px]" />
            </div>
            {elements}
            <RecipeButton
              buttonClick={handleClick}
            />
          </div>
        <Button text="Create recipe" className="mt-12 max-w-[234px] cursor-pointer max-md:mb-14" isActive={true} />
      </form>
    </>
  )
};

export default CreateRecipe;