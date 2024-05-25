import {
  ClockIcon, 
  FileIcon, 
  ImageIcon, 
  LockIcon, 
  SecondMedalIcon, 
  TrashIcon, 
  UntesilsIcon
}                                 from "@/icons";
import { 
  SelectButton, SelectContent, 
  SelectField 
}                                 from "@/components/select";
import Textarea                   from "@/components/ui/textarea";
import { 
  RecipeCreateCover, 
  RecipeInput, 
  RecipeButton 
}                                 from "@/components/create-recipe";
import { Button }                 from "@/components/ui";
import { useImageUpload }         from "@/hooks/useUploadImage";
import { useCustomState }         from "@/hooks/useInputsState";
import { useTranslation }         from "next-i18next";
import { z }                      from "zod";
import { 
  useCreateRecipeMutation, 
  useCreateStepsMutation 
}                                 from "@/lib/api/recipeApi";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver }            from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useRouter }              from "next/navigation";
import { Loader }                 from "@/components/shared";
import { RtkError }               from "@/typings/error";
import { useSelector }            from "react-redux";
import { IAppState }              from "@/lib/store";
import { renderMetaTags }         from "@/pages/meta";
import { GetStaticPropsContext }  from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const createRecipeAndStepSchema = z.object({
  title          : z.string().min(1).max(80),
  image          : z.string().default(''),
  coockingTime   : z.string().max(32),
  complexity     : z.string().min(1),
  typeOfFood     : z.string().min(1),
  ingradients    : z.string().min(1).min(1),
  isPublic       : z.boolean(),
  applyBackground: z.boolean().default(false),
  steps          : z.array(z.object({
    stepNumber     : z.number().min(1),
    stepDescription: z.string().min(2)
  }))
});

export type CreateRecipeAndStepFormData = z.infer<typeof createRecipeAndStepSchema>;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const CreateRecipe = () => {
  const { t }       = useTranslation('common');
  const accessToken = useSelector((state: IAppState) => state.auth.accessToken);
  const router      = useRouter();

  const [ createRecipe, { isLoading: isCreatingRecipe } ] = useCreateRecipeMutation();
  const [ createSteps, { isLoading: isCreatingSteps } ]   = useCreateStepsMutation();

  const { image, inputFileRef, handleImageChange } = useImageUpload();
  const { complexity, access, type, bgImage, activeId, onClickSetValue, onClickChangeStates } = useCustomState({});

  const { handleSubmit, register, setError, formState: { errors, isValid }, setValue, control } = useForm<CreateRecipeAndStepFormData>({
    defaultValues: {
      title          : '',
      image          : '',
      coockingTime   : '',
      complexity     : '',
      typeOfFood     : '',
      ingradients    : '',
      isPublic       : true,
      applyBackground: false,
      steps          : [{
        stepNumber     : 1,
        stepDescription: ''
      }]
    },
    resolver: zodResolver(createRecipeAndStepSchema)
  });

  const { fields, append, remove } = useFieldArray<CreateRecipeAndStepFormData, "steps">({
    control,
    name: "steps"
  });

  const handleRemoveStep = (index: number) => {
    fields.forEach((step, stepIndex) => {
      if (step.stepNumber > index) {
        setValue(`steps.${stepIndex}.stepNumber`, step.stepNumber - 1);
      }
    });

    remove(index);
  };

  useEffect(() => {
    setValue('complexity', complexity);
    setValue('isPublic', access);
    setValue('typeOfFood', type);
    setValue('image', image || '');
    setValue('applyBackground', bgImage);
  }, [complexity, access, type, setValue, image, bgImage]);  

  const onSubmit = useCallback(async (values: CreateRecipeAndStepFormData) => {
    if (isValid) {
      createRecipe(values).unwrap().then((recipe) => {
        const recipeId = recipe.id;
  
        createSteps({ recipeId: recipeId, steps: values.steps }).unwrap().then(() => {
          router.push(`/recipe/${recipeId}`);
          return null;
        })
      }).catch((error: RtkError) => {
        if (error.data.code === 'too-large-image') {
          setError('image', { message: t('too-large-error') });
        }
      });
    }
  }, [createRecipe, image, complexity, access, type, bgImage, createSteps, fields, isValid]); 
  
  if (isCreatingRecipe || isCreatingSteps) {
    return <Loader />;
  }

  if (!accessToken) {
    router.push('/sign-in');
    return null;
  }

  return (
    <>
      {renderMetaTags({ title: `${t('create-recipe')} | Culinarybook`, description: t('meta-create-recipe-description') })}
      <h1 className="head-text">{t('create-recipe')}</h1>
      <input ref={inputFileRef} onChange={handleImageChange} type="file" accept="image/*" hidden />
      <form onSubmit={handleSubmit(onSubmit)} className="my-7">
          <div className="flex max-md:flex-col">
            <RecipeCreateCover 
              recipeImage={image}
              onClick={() => inputFileRef.current?.click()}
              isError={errors.image ? true : false}
              errorMessage={errors.image?.message}
            />
            <div className="ml-12 max-md:ml-0 max-md:mt-6">
              <p className="text-red-500 text-sm">{errors.title?.message}</p>
              <div className={'flex mb-3 items-center'}> 
                <FileIcon className="w-5 h-5" />
                <RecipeInput
                  placeholder={t('recipe-title-placeholder')}
                  type="text"
                  {...register('title')}
                />
              </div>
              <p className="text-red-500 text-sm">{errors.coockingTime?.message}</p>
              <div className={'flex mb-3 items-center'}> 
                <ClockIcon className="w-5 h-5" />
                <RecipeInput
                  placeholder={t('cooking-time-placeholder')}
                  type="text"
                  {...register('coockingTime')}
                />
              </div>
              <p className="text-red-500 text-sm">{errors.complexity?.message}</p>
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
          <h3 className="link-text font-semibold my-5">{t('title-ingradients')}</h3>
          <p className="text-red-500 text-sm">{errors.ingradients?.message}</p>
          <Textarea {...register('ingradients')} placeholder={t('placeholder-ingradients')} className="w-full max-w-sm min-h-[170px]" />
          <h3 className="link-text font-semibold my-5">{t('title-instructions')}</h3>
          <div>
            {fields.map((_, index) => (
              <div key={index}>
                <p className="text-red-500 text-sm">
                  {errors.steps?.[index]?.stepDescription?.message}
                </p>
                <div className="relative max-w-[300px]">
                  <span className="absolute left-3 top-2 link-text font-semibold z-50">{`${t('step')} ${index + 1}`}</span>
                  {index !== 0 && (
                    <button
                      className="w-6 absolute right-3 top-2 p-1"
                      type="button"
                      onClick={() => handleRemoveStep(index)}
                    >
                    <TrashIcon className="fill-color-666" />
                    </button>
                  )}
                  <Textarea
                    placeholder={t('step-placeholder')}
                    className="!pt-10 min-h-[128px] mr-3 w-full max-w-[300px]"
                    {...register(`steps.${index}.stepDescription`)}
                  />
                </div>
              </div>
            ))}
            <div className="w-full max-w-[300px] flex justify-center">
              <RecipeButton
                buttonClick={() => append({ stepNumber: fields.length + 1, stepDescription: '' })}
              />
            </div>
          </div>
        <Button text={t('create-button')} className="mt-12 max-w-[234px] max-md:mb-14" isActive={isValid} />
      </form>
    </>
  )
};

export default CreateRecipe;