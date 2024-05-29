import { useCallback, useState }    from "react";
import { useForm }                  from "react-hook-form";
import { 
  CreateCommentFormData, 
  createCommentSchema 
}                                   from "./schemas/createCommentSchema";
import { zodResolver }              from "@hookform/resolvers/zod";
import { useRouter }                from "next/router";
import { useCreateCommentMutation } from "@/lib/api/commentApi";
import { RtkError }                 from "@/typings/error";
import { useTranslation }           from "next-i18next";
import { useGetAuthStatusQuery }    from "@/lib/api/authApi";
import { Button, Input }            from "@/components/ui";
import { CommentRating }            from "./components";

export const CreateCommentForm = ({ averageRating }: { averageRating: number }) => {
  const { t } = useTranslation("common");

  const { data: authStatus } = useGetAuthStatusQuery();

  const [rating, setRating] = useState<number>(averageRating);
  const router = useRouter();

  const { recipeId } = router.query

  const [createComment, { isLoading }] = useCreateCommentMutation();

  const { handleSubmit, register, setError, formState: { errors }, setValue, reset } = useForm<CreateCommentFormData>({
    defaultValues: {
      commentText: '',
      grade: 0,
    },
    resolver: zodResolver(createCommentSchema)
  });

  const onSubmitCreateComment = useCallback(async (values: CreateCommentFormData) => {
    if (!authStatus?.isAuth) {
      router.push('/sign-in');
    } else {
      await createComment({ ...values, recipeId: recipeId as string }).unwrap().then(() => {
        reset();
        setRating(0);
      }).catch((error: RtkError) => {
        if (error.data.code === 'same-text') {
          setError('commentText', { message: t('spam-error') });
        }
      });
    }
  }, [createComment, reset, authStatus?.isAuth]);

  const handleSetGrade = (grade: number) => {
    setRating(grade);
    setValue('grade', grade);
  };
  return (
    <form onSubmit={handleSubmit(onSubmitCreateComment)}>
      <p className="text-red-500 text-sm">{errors.grade?.message}</p>
      <CommentRating
        averageRating={averageRating}
        onClick={handleSetGrade}
        rating={rating}
      />
      <input {...register('grade')} type="hidden" />
      <p className="text-red-500 text-sm">{errors.commentText?.message}</p>
      <Input color="default" {...register('commentText')} type="text" className="max-w-[615px] block mt-8" placeholder={t('comment-placeholder')} />
      <Button className="max-w-[234px] my-8" text={t('create-comment-button')} state={isLoading ? "loading" : "default"} />
    </form>
  )
}
