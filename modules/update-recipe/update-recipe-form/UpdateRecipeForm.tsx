import { IRecipe, IStep } from "@/typings/recipe";
import { useFieldArray, useForm } from "react-hook-form";
import {
  UpdateRecipeAndStepFormData,
  updateRecipeAndStepSchema,
} from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useRef, useState } from "react";
import {
  useCreateStepsMutation,
  useDeleteRecipeMutation,
  useDeleteStepMutation,
  useUpdateRecipeMutation,
  useUpdateStepsMutation,
} from "@/lib/api/recipeApi";
import { useRouter } from "next/router";
import { RtkError } from "@/typings/error";
import { useTranslation } from "next-i18next";
import {
  RecipeAccessSelect,
  RecipeAddStepButton,
  RecipeBgImageApplySelect,
  RecipeComplexitySelect,
  RecipeCreateCover,
  RecipeTypeSelect,
} from "./components";
import {
  ClockIcon,
  FileIcon,
  ImageIcon,
  LockIcon,
  SecondMedalIcon,
  TrashIcon,
  UntesilsIcon,
} from "@/icons";
import { Button, Dialog, Input, Textarea } from "@/components/ui";
import { useUploadImageMutation } from "@/lib/api/uploadImageApi";
import { Loader } from "@/components/Loader";

interface IUpdateRecipeForm {
  recipe?: IRecipe;
  steps?: IStep[];
}

export const UpdateRecipeForm = ({ recipe, steps }: IUpdateRecipeForm) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [stepsToDelete, setStepsToDelete] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);

  const [uploadImage, { isLoading: isLoadingUploadingImage }] =
    useUploadImageMutation();
  const [deleteStep, { isLoading: isLoadingDeleteStep }] =
    useDeleteStepMutation();
  const [deleteRecipe, { isLoading: isLoadingDeleteRecipe }] =
    useDeleteRecipeMutation();
  const [updateRecipe, { isLoading: isUpdatingRecipe }] =
    useUpdateRecipeMutation();
  const [createSteps, { isLoading: isCreatingSteps }] =
    useCreateStepsMutation();
  const [updateSteps, { isLoading: isUpdatingSteps }] =
    useUpdateStepsMutation();

  const handleDeleteStep = (index: number) => {
    if (steps) {
      const step = steps[index];
      if (step?.id) {
        setStepsToDelete([...stepsToDelete, step.id]);
      }
    }

    remove(index);
  };

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isValid },
    control,
  } = useForm<UpdateRecipeAndStepFormData>({
    defaultValues: {
      title: recipe?.title,
      image: recipe?.image,
      coockingTime: recipe?.coockingTime,
      complexity: recipe?.complexity,
      typeOfFood: recipe?.typeOfFood,
      ingradients: recipe?.ingradients,
      isPublic: recipe?.isPublic,
      applyBackground: recipe?.applyBackground,
      steps: steps,
    },
    resolver: zodResolver(updateRecipeAndStepSchema),
  });

  const { fields, append, remove } = useFieldArray<
    UpdateRecipeAndStepFormData,
    "steps"
  >({
    control,
    name: "steps",
  });

  const onSubmit = useCallback(
    async (values: UpdateRecipeAndStepFormData) => {
      if (isValid) {
        let imageUrl = "";
        if (selectedImage) {
          const formData = new FormData();
          formData.append("image", selectedImage);
          const response = await uploadImage(formData).unwrap();
          imageUrl = response.imageUrl;
        }

        values.image = imageUrl;

        updateRecipe({ ...values, id: recipe?.id as string })
          .unwrap()
          .then((recipe) => {
            const recipeId = recipe.id;

            const existingSteps = values.steps.filter((step) => step.id);
            const newSteps = values.steps.filter((step) => !step.id);

            const formattedExistingSteps = existingSteps.map((step) => ({
              stepId: step.id!,
              stepDescription: step.stepDescription,
            }));

            updateSteps(formattedExistingSteps).unwrap();

            if (newSteps.length > 0) {
              createSteps({ recipeId, steps: newSteps }).unwrap();
            }

            if (stepsToDelete.length > 0) {
              stepsToDelete.forEach(async (stepId) => {
                deleteStep(stepId).unwrap();
              });
            }

            router.push(`/recipe/${recipeId}`);
            return null;
          })
          .catch((error: RtkError) => {
            if (error.data.code === "too-large-image") {
              setError("image", { message: t("too-large-error") });
            }
          });
      }
    },
    [
      updateRecipe,
      createSteps,
      fields,
      isValid,
      deleteStep,
      steps,
      updateSteps,
      stepsToDelete,
    ]
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleDeleteRecipe = async (recipeId: string) => {
    deleteRecipe(recipeId);
    router.push("/");
  };

  const handleOpenConfirm = () => {
    setIsOpenConfirm(!isOpenConfirm);
  };

  if (
    isLoadingDeleteStep ||
    isLoadingDeleteRecipe ||
    isUpdatingRecipe ||
    isCreatingSteps ||
    isUpdatingSteps ||
    isLoadingUploadingImage
  ) {
    return <Loader className="absolute top-0 left-0" />;
  }
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className="my-7">
        <input
          ref={inputFileRef}
          onChange={handleImageChange}
          type="file"
          accept="image/*"
          hidden
        />
        <div className="flex gap-12 max-md:flex-col">
          <RecipeCreateCover
            recipeImage={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : (recipe?.image as string)
            }
            onClick={() => inputFileRef.current?.click()}
            isError={errors.image ? true : false}
            errorMessage={errors.image?.message}
          />
          <div className="flex flex-col gap-3 max-md:mt-6">
            <p className={`text-red-500 text-sm ${!errors.title && "hidden"}`}>
              {errors.title?.message}
            </p>
            <div className={"flex items-center gap-3"}>
              <FileIcon className="w-5 h-5" />
              <Input
                placeholder={t("recipe-title-placeholder")}
                type="text"
                {...register("title")}
                color="default"
                className="h-6 max-w-[224px] rounded-md"
              />
            </div>
            <p
              className={`text-red-500 text-sm ${
                !errors.coockingTime && "hidden"
              }`}
            >
              {errors.coockingTime?.message}
            </p>
            <div className={"flex items-center gap-3"}>
              <ClockIcon className="w-5 h-5" />
              <Input
                placeholder={t("cooking-time-placeholder")}
                type="text"
                {...register("coockingTime")}
                color="default"
                className="h-6 max-w-[224px] rounded-md"
              />
            </div>
            <p
              className={`text-red-500 text-sm ${
                !errors.complexity && "hidden"
              }`}
            >
              {errors.complexity?.message}
            </p>
            <div className="flex items-center gap-3">
              <SecondMedalIcon className="w-5 h-5" />
              <div className="relative">
                <RecipeComplexitySelect control={control} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LockIcon className="w-5 h-5" />
              <div className="relative">
                <RecipeAccessSelect control={control} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <UntesilsIcon className="w-5 h-5 fill-[#666]" />
              <div className="relative">
                <RecipeTypeSelect control={control} />
              </div>
            </div>
            {(selectedImage || recipe?.image !== "") && (
              <div className="flex items-center gap-3">
                <ImageIcon className="w-5 h-5 fill-[#666]" />
                <div className="relative">
                  <RecipeBgImageApplySelect control={control} />
                </div>
              </div>
            )}
          </div>
        </div>
        <h3 className="link-text font-semibold my-5">
          {t("title-ingradients")}
        </h3>
        <p className="text-red-500 text-sm">{errors.ingradients?.message}</p>
        <Textarea
          {...register("ingradients")}
          placeholder={t("placeholder-ingradients")}
          className="w-full max-w-sm min-h-[170px]"
        />
        <h3 className="link-text font-semibold my-5">
          {t("title-instructions")}
        </h3>
        <>
          {fields.map((_, index) => (
            <div key={index}>
              <p className="text-red-500 text-sm">
                {errors.steps?.[index]?.stepDescription?.message}
              </p>
              <div className="relative max-w-[300px]">
                <div className="flex justify-between items-center">
                  <span className="link-text font-semibold z-50">{`${t(
                    "step"
                  )} ${index + 1}`}</span>
                  {index !== 0 && (
                    <button
                      className="w-4"
                      type="button"
                      onClick={() => handleDeleteStep(index)}
                    >
                      <TrashIcon className="fill-color-666" />
                    </button>
                  )}
                </div>
                <Textarea
                  placeholder={t("step-placeholder")}
                  className="min-h-[128px] w-full max-w-[300px]"
                  {...register(`steps.${index}.stepDescription`)}
                />
              </div>
            </div>
          ))}
          <div className="w-full max-w-[300px] flex justify-center">
            <RecipeAddStepButton
              buttonClick={() =>
                append({ stepNumber: fields.length + 1, stepDescription: "" })
              }
            />
          </div>
        </>
        <div className="flex max-sm:flex-col-reverse mt-12 max-md:mb-14">
          <button
            type="button"
            onClick={() => handleOpenConfirm()}
            className="h-10 mr-3 w-48 max-sm:mt-3 border-red-500 border-[1px] px-1 rounded-lg hover:bg-red-500 transition-all"
          >
            {t("delete-recipe")}
          </button>
          <Button
            text={t("apply-changes")}
            className="max-w-[234px]"
            state={isValid ? "default" : "disabled"}
          />
        </div>
      </form>
      {isOpenConfirm && (
        <Dialog
          confirmText={`${t("delete-recipe-text")}"${recipe?.title}"?`}
          buttonText={t("delete-recipe")}
          clickAction={() => handleDeleteRecipe(recipe?.id as string)}
          closeConfirm={() => handleOpenConfirm()}
        />
      )}
    </section>
  );
};
