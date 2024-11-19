import { useTranslation } from "next-i18next";
import { useFieldArray, useForm } from "react-hook-form";
import {
  CreateRecipeAndStepFormData,
  createRecipeAndStepSchema,
} from "./schemas/createRecipeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import {
  useCreateRecipeMutation,
  useCreateStepsMutation,
} from "@/lib/api/recipeApi";
import { useCallback, useRef, useState } from "react";
import { RtkError } from "@/typings/error";
import { useUploadImageMutation } from "@/lib/api/uploadImageApi";
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
import { Button, Input, Textarea } from "@/components/ui";
import { Loader } from "@/components/Loader";

export const CreateRecipeForm = () => {
  const { t } = useTranslation("common");

  const router = useRouter();

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [createRecipe, { isLoading: isCreatingRecipe, isSuccess }] =
    useCreateRecipeMutation();
  const [createSteps, { isLoading: isCreatingSteps }] =
    useCreateStepsMutation();
  const [uploadImage, { isLoading: isLoadingUploadingImage }] =
    useUploadImageMutation();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isValid },
    setValue,
    control,
  } = useForm<CreateRecipeAndStepFormData>({
    defaultValues: {
      title: "",
      image: "",
      coockingTime: "",
      complexity: "",
      typeOfFood: "",
      ingradients: "",
      isPublic: true,
      applyBackground: true,
      steps: [
        {
          stepNumber: 1,
          stepDescription: "",
        },
      ],
    },
    resolver: zodResolver(createRecipeAndStepSchema),
  });

  const { fields, append, remove } = useFieldArray<
    CreateRecipeAndStepFormData,
    "steps"
  >({
    control,
    name: "steps",
  });

  const handleRemoveStep = (index: number) => {
    fields.forEach((step, stepIndex) => {
      if (step.stepNumber > index) {
        setValue(`steps.${stepIndex}.stepNumber`, step.stepNumber - 1);
      }
    });

    remove(index);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const onSubmit = useCallback(
    async (values: CreateRecipeAndStepFormData) => {
      if (isValid) {
        let imageUrl = "";
        if (selectedImage) {
          const formData = new FormData();
          formData.append("image", selectedImage);
          const response = await uploadImage(formData).unwrap();
          imageUrl = response.imageUrl;
        }

        values.image = imageUrl;

        createRecipe(values)
          .unwrap()
          .then((recipe) => {
            const recipeId = recipe.id;

            createSteps({ recipeId: recipeId, steps: values.steps })
              .unwrap()
              .then(() => {
                router.push(`/recipe/${recipeId}`);
                return null;
              });
          })
          .catch((error: RtkError) => {
            if (error.data.code === "too-large-image") {
              setError("image", { message: t("too-large-error") });
            }
          });
      }
    },
    [
      createRecipe,
      selectedImage,
      createSteps,
      fields,
      isValid,
      selectedImage,
      uploadImage,
    ]
  );

  if (
    isCreatingRecipe ||
    isCreatingSteps ||
    isLoadingUploadingImage ||
    isSuccess
  ) {
    return <Loader className="absolute top-0 left-0" />;
  }
  return (
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
          recipeImage={selectedImage ? URL.createObjectURL(selectedImage) : ""}
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
            className={`text-red-500 text-sm ${!errors.complexity && "hidden"}`}
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
          {selectedImage && (
            <div className="flex items-center gap-3">
              <ImageIcon className="w-5 h-5 fill-[#666]" />
              <div className="relative">
                <RecipeBgImageApplySelect control={control} />
              </div>
            </div>
          )}
        </div>
      </div>
      <h3 className="link-text font-semibold my-5">{t("title-ingradients")}</h3>
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
                <span className="link-text font-semibold z-50">{`${t("step")} ${
                  index + 1
                }`}</span>
                {index !== 0 && (
                  <button
                    className="w-4"
                    type="button"
                    onClick={() => handleRemoveStep(index)}
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
      <Button
        text={t("create-button")}
        className="mt-12 max-w-[234px] max-md:mb-14"
        state={isValid ? "default" : "disabled"}
      />
    </form>
  );
};
