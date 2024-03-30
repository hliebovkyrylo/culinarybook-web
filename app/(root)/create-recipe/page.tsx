"use client"

import {
  ClockIcon, 
  FileIcon, 
  ImageIcon, 
  LockIcon, 
  SecondMedalIcon, 
  UntesilsIcon
}                             from "@/icons";
import { 
  SelectButton, 
  SelectContent, 
  SelectField 
}                             from "@/components/select";
import Textarea               from "@/ui/textarea/Textarea";
import { 
  RecipeCreateCover, 
  RecipeInput, 
  RecipeButton 
}                             from "@/components/create-recipe";
import { Button }             from "@/ui";
import { useDynamicElements } from "@/hooks/useDynamicElements";
import { useImageUpload }     from "@/hooks/useUploadImage";
import { useCustomState }     from "@/hooks/useInputsState";
import { useTranslation }     from "react-i18next";

const CreateRecipe = () => {
  const { t } = useTranslation();

  const createElement = (index: number) => (
    <div className="relative">
      <span className="absolute left-3 top-2 text-color-custom-yellow font-semibold z-50">{`${t('step')} ${index + 2}`}</span>
      <Textarea placeholder={t('step-placeholder')} className="!pt-10 min-h-[128px] mr-3 w-full max-w-[300px]" />
    </div>
  );

  const { elements, handleClick } = useDynamicElements(createElement);

  const { image, inputFileRef, handleImageChange } = useImageUpload();

  const { complexity, access, type, bgImage, activeId, onClickSetValue, onClickChangeStates } = useCustomState();

  return (
    <>
      <h1 className="head-text">{t('create-recipe')}</h1>
      <input ref={inputFileRef} onChange={handleImageChange} type="file" accept="image/*" hidden />
      <form className="my-7">
          <div className="flex max-md:flex-col">
            <RecipeCreateCover 
              recipeImage={image}
              onClick={() => inputFileRef.current?.click()}
            />
            <div className="ml-12 max-md:ml-0 max-md:mt-6">
              <RecipeInput
                placeholder={t('recipe-title-placeholder')}
                type="text"
                image={<FileIcon className="w-5 h-5" />}
                className="w-full"
              />
              <RecipeInput
                placeholder={t('cooking-time-placeholder')}
                type="text"
                image={<ClockIcon className="w-5 h-5" />}
                className="w-full"
              />
              <div className="flex mb-3">
                <SecondMedalIcon className="w-5 h-5"/>
                <div className="relative ml-3">
                  <SelectButton 
                    isActive={activeId === 'complexity'} 
                    className="w-32 text-left" 
                    title={complexity === '' ? t('complexity') : complexity}
                    onClick={() => onClickChangeStates('complexity')} 
                  />
                  <SelectContent isActive={activeId === 'complexity'}>
                    <SelectField value={t('complexity-choose-easy')} id="1" onClick={() => onClickSetValue('complexity', t('complexity-choose-easy'))} />
                    <SelectField value={t('complexity-choose-middle')} id="2" onClick={() => onClickSetValue('complexity', t('complexity-choose-middle'))} />
                    <SelectField value={t('complexity-choose-hard')} id="3" onClick={() => onClickSetValue('complexity', t('complexity-choose-hard'))} />
                  </SelectContent>
                </div>
              </div>
              <div className="flex mb-3">
                <LockIcon className="w-5 h-5" />
                <div className="relative ml-3">
                  <SelectButton 
                    isActive={activeId === 'access'} 
                    className="w-[268px] text-left" 
                    title={access ? t('avaible-everyone') : t('avaible-me')}
                    onClick={() => onClickChangeStates('access')} 
                  />
                  <SelectContent isActive={activeId === 'access'}>
                    <SelectField icon={<span>🌐</span>} value={t('avaible-everyone')} id="1" onClick={() => onClickSetValue('access', true)} />
                    <SelectField icon={<span>🔒</span>} value={t('avaible-me')} id="2" onClick={() => onClickSetValue('access', false)} />
                  </SelectContent>
                </div>
              </div>
              <div className="flex mb-3">
                <UntesilsIcon className="w-5 h-5 fill-[#666]" />
                <div className="relative ml-3">
                  <SelectButton 
                    isActive={activeId === 'type'} 
                    className="w-[268px] text-left" 
                    title={type === '' ? t('type-food') : type} 
                    onClick={() => onClickChangeStates('type')} 
                  />
                  <SelectContent isActive={activeId === 'type'}>
                    <SelectField icon={<span>🍖</span>} value={t('type-food-meat')} id="1" onClick={() => onClickSetValue('type', t('type-food-meat'))} />
                    <SelectField icon={<span>🍩</span>} value={t('type-food-desert')} id="1" onClick={() => onClickSetValue('type', t('type-food-desert'))} />
                    <SelectField icon={<span>🍔</span>} value={t('type-food-fastfood')} id="1" onClick={() => onClickSetValue('type', t('type-food-fastfood'))} />
                    <SelectField icon={<span>🍹</span>} value={t('type-food-softdrink')} id="1" onClick={() => onClickSetValue('type', t('type-food-softdrink'))} />
                    <SelectField icon={<span>🍸</span>} value={t('type-food-alcoholdrink')} id="1" onClick={() => onClickSetValue('type', t('type-food-alcoholdrink'))} />
                    <SelectField icon={<span>🍲</span>} value={t('type-food-soup')} id="1" onClick={() => onClickSetValue('type', t('type-food-soup'))} />
                    <SelectField icon={<span>🥘</span>} value={t('type-food-poridge')} id="1" onClick={() => onClickSetValue('type', t('type-food-poridge'))} />
                    <SelectField icon={<span>🥗</span>} value={t('type-food-salad')} id="1" onClick={() => onClickSetValue('type', t('type-food-salad'))} />
                    <SelectField icon={<span>🍝</span>} value={t('type-food-national')} id="1" onClick={() => onClickSetValue('type', t('type-food-national'))} />
                    <SelectField icon={<span>🍜</span>} value={t('type-food-pasta')} id="1" onClick={() => onClickSetValue('type', t('type-food-pasta'))} />
                    <SelectField icon={<span>🐟</span>} value={t('type-food-fish')} id="1" onClick={() => onClickSetValue('type', t('type-food-fish'))} />
                  </SelectContent>
                </div>
              </div>
              {image && (
                <div className="flex mb-3">
                  <ImageIcon className="w-5 h-5 fill-[#666]" />
                  <div className="relative ml-3">
                    <SelectButton 
                      isActive={activeId === 'bgImage'} 
                      className="w-[218px] text-left" 
                      title={bgImage ? t('apply') : t('do-not-apply')} 
                      onClick={() => onClickChangeStates('bgImage')} 
                    />
                    <SelectContent isActive={activeId === 'bgImage'}>
                      <SelectField icon={<span>✅</span>} value={t('photo-apply')} id="1" onClick={() => onClickSetValue('bgImage', true)} />
                      <SelectField icon={<span>❎</span>} value={t('photo-apply-do-not')} id="1" onClick={() => onClickSetValue('bgImage', false)} />
                    </SelectContent>
                  </div>
                </div>
              )}
            </div>
          </div>
          <h3 className="text-color-custom-yellow font-semibold my-5">{t('title-ingradients')}</h3>
          <Textarea placeholder={t('placeholder-ingradients')} className="w-full max-w-sm min-h-[170px]" />
          <h3 className="text-color-custom-yellow font-semibold my-5">{t('title-instructions')}</h3>
          <div>
            <div className="relative">
              <span className="absolute left-3 top-2 text-color-custom-yellow font-semibold z-50">{t('step')} 1</span>
              <Textarea placeholder={t('step-placeholder')} className="!pt-10 min-h-[128px] mr-3 w-full max-w-[300px]" />
            </div>
            {elements}
            <div className="w-full max-w-[300px] flex justify-center">
              <RecipeButton
                buttonClick={handleClick}
              />
            </div>
          </div>
        <Button text={t('create-button')} className="mt-12 max-w-[234px] cursor-pointer max-md:mb-14" isActive={true} />
      </form>
    </>
  )
};

export default CreateRecipe;