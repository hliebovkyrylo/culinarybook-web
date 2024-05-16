"use client"

import { renderMetaTags }                      from "@/pages/meta";
import { 
  PrivateRecipe,
  RecipeComment, 
  RecipeCommentContent, 
  RecipeCommentSkeleton, 
  RecipeContentCard, 
  RecipeContentCardSkeleton, 
  RecipeInfo, 
  RecipeRating 
}                                              from "@/components/recipe";
import { Loader }                              from "@/components/shared";
import { useToggleState }                      from "@/hooks/useToggleState";
import { 
  useCreateCommentMutation, 
  useCreateCommentReplyMutation, 
  useDeleteCommentMutation, 
  useDeleteCommentReplyMutation, 
  useGetCommentsQuery 
}                                              from "@/lib/api/commentApi";
import { 
  useCreateLikeMutation, 
  useGetLikeStateQuery, 
  useGetRecipeLikesQuery, 
  useRemoveLikeMutation }                      from "@/lib/api/likeApi";
import { useGetRecipeQuery, useGetStepsQuery } from "@/lib/api/recipeApi";
import { 
  useCreateSaveMutation, 
  useGetSaveStateQuery, 
  useRemoveSaveMutation 
}                                              from "@/lib/api/saveApi";
import { useGetMeQuery }                       from "@/lib/api/userApi";
import { RtkError }                            from "@/typings/error";
import { Button }                              from "@/ui";
import { Input }                               from "@/ui/input/Input";
import { zodResolver }                         from "@hookform/resolvers/zod";
import Image                                   from "next/image";
import { useParams, useRouter }                from "next/navigation";
import { useCallback, useEffect, useState }    from "react";
import { useForm }                             from "react-hook-form";
import { useTranslation }                      from "react-i18next";
import { Swiper, SwiperSlide }                 from "swiper/react";
import { z }                                   from "zod";

const createCommentSchema = z.object({
  commentText: z.string().min(1),
  grade      : z.number().min(1).max(5)
});

const createCommentReplySchema = z.object({
  commentText: z.string().min(1),
});

export type CreateCommentFormData      = z.infer<typeof createCommentSchema>;
export type CreateCommentReplyFormData = z.infer<typeof createCommentReplySchema>;

const Recipe = () => {
  /*
    =================================
    TODO: split the page into modules
    ================================= 
  */
  const { t }    = useTranslation();
  const { id }   = useParams();
  const recipeId = id as string

  const router = useRouter();

  const { data: user } = useGetMeQuery();

  const { data: recipe, isLoading: isLoadingRecipe }                 = useGetRecipeQuery(recipeId);
  const { data: steps, isLoading: isLoadingSteps }                   = useGetStepsQuery(recipeId);
  const { data: comments, isLoading: isLoadingComments, isFetching } = useGetCommentsQuery(recipeId);
  const { data: likes, isLoading: isLoadingLikes }                   = useGetRecipeLikesQuery(recipeId);

  const { data: likeState, isLoading: isLoadingLikeState } = useGetLikeStateQuery(recipeId);
  const { data: saveState, isLoading: isLoadingSaveState }  = useGetSaveStateQuery(recipeId);

  const [ createComment, { isLoading: isLoadingCreatingComment } ]              = useCreateCommentMutation();
  const [ deleteComment, { isLoading: isLoadingDeleteComment } ]                = useDeleteCommentMutation();
  const [ createCommentReply, { isLoading: isLoadingCreatingCommentsReplies } ] = useCreateCommentReplyMutation();
  const [ deleteCommentReply, { isLoading: isLoadingDeletingCommentReply } ]    = useDeleteCommentReplyMutation();

  const [ createLike ] = useCreateLikeMutation();
  const [ removeLike ] = useRemoveLikeMutation();
  const [ createSave ] = useCreateSaveMutation();
  const [ removeSave ] = useRemoveSaveMutation();

  const [selectedCommentId, setSelectedCommentId] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  const [ isLiked, setIsLiked ] = useState<boolean>(!!likeState?.isLiked);
  const [ isSaved, setIsSaved ] = useState<boolean>(!!saveState?.isSaved);
  const [ likesCount, setLikesCount] = useState(likes?.length || 0); 

  useEffect(() => {
    setIsLiked(!!likeState?.isLiked);
  }, [likeState])

  useEffect(() => {
    setLikesCount(likes?.length || 0);
  }, [likes])

  useEffect(() => {
    setIsSaved(!!saveState?.isSaved);
  }, [saveState])

  const handleLikeClick = async () => {
    if (!user) {
      router.push('/sign-in');
    } else {
      if (!isLiked) {
        setIsLiked(true);
        setLikesCount(likesCount + 1);

        await createLike(recipeId);
      } else {
        setIsLiked(false);
        setLikesCount(likesCount - 1);
        
        await removeLike(recipeId);
      }
    }
  };

  const handleSaveClick = async () => {
    if (!user) {
      router.push('/sign-in');
    } else {
      if (!isSaved) {
        setIsSaved(true);
  
        await createSave(recipeId);
      } else {
        setIsSaved(false);
  
        await removeSave(recipeId);
      }
    }
  };

  const [isRecipeOwner, setIsRecipeOwner] = useState(user ? user.id === recipe?.ownerId : false);

  useEffect(() => {
    setIsRecipeOwner(user?.id === recipe?.ownerId);
  }, [user, recipe]);

  const isBackgroundApplied = recipe?.applyBackground;
  
  const [rating, setRating] = useState(comments ? comments.reduce((sum, comment) => sum + comment.grade, 0) / comments.length : 0);
  const [hover, setHover]   = useState(0);

  useEffect(() => {
    setRating(comments ? comments.reduce((sum, comment) => sum + comment.grade, 0) / comments.length : 0)
  }, [comments])

  const { handleSubmit, register, setError, formState: { errors, isValid }, setValue, reset } = useForm<CreateCommentFormData>({
    defaultValues: {
      commentText: '',
      grade      : 0,
    },
    resolver: zodResolver(createCommentSchema)
  });

  const { handleSubmit: handleSubmitReply, register: registerReply, setError: setErrorReply, formState: { errors: errorsReply, isValid: isValidReply }, reset: resetReply, setValue: setReplyValue } = useForm<CreateCommentReplyFormData>({
    defaultValues: {
      commentText: '',
    },
    resolver: zodResolver(createCommentReplySchema),
  });

  const onClickSetGrade = (grade: number) => {
    setRating(grade);
    setValue('grade', grade);
  };

  const onSubmitCreateComment = useCallback(async (values: CreateCommentFormData) => {
    if (!user) {
      router.push('/sign-in');
    } else {
      await createComment({ ...values, recipeId: recipeId }).unwrap().then(() => {
        reset();
        setRating(0);
        setOpenInputId('');
      }).catch((error: RtkError) => {
        if (error.data.code === 'same-text') {
          setError('commentText', { message: t('spam-error') });
        }
      });
    }
  }, [createComment, reset, user]);

  const onClickDeleteComment = async (commentId: string) => {
    await deleteComment(commentId);
  }

  const onClickDeleteCommentReply = async (commentReplyId: string) => {
    await deleteCommentReply(commentReplyId);
  }

  const onSubmitCreateCommentReply = useCallback(async (values: CreateCommentReplyFormData) => {
    if (!user) {
      router.push('/sign-in');
    } else {
      createCommentReply({ ...values, commentId: selectedCommentId, userId: selectedUserId }).unwrap().then(() => {
        resetReply();
        setOpenInputId('');
      })
    }
  }, [createCommentReply, selectedCommentId, user])

  const [openReplies, toggleOpenReplies] = useToggleState({});

  const [openInputId, setOpenInputId] = useState<string>();

  const handleOpenInput = (openCommentId: string, createCommentId: string, userId: string) => {
    setSelectedCommentId(createCommentId);
    setOpenInputId(openCommentId);
    setSelectedUserId(userId);
  };

  const handleOpenReplies = (commentId: string) => {
    toggleOpenReplies(commentId);
  };

  if (isLoadingRecipe || isLoadingLikes || isLoadingLikeState || isLoadingSaveState) {
    return <Loader />
  }

  const isLoadingAllComments = isLoadingComments || isLoadingCreatingComment || isLoadingDeleteComment || isFetching || isLoadingCreatingCommentsReplies || isLoadingDeletingCommentReply;

  if (!recipe?.isPublic) {
    return <PrivateRecipe />
  }
  
  return (
    <>
      {renderMetaTags({ title: `${recipe.title} | Recipebook`, description: recipe.ingradients })}
      {isBackgroundApplied && (
        <Image src={recipe.image} alt="Background image" width={1000} height={1000} className=" absolute top-0 left-0 w-full h-full object-cover -z-10 blur-sm opacity-10" />
      )}
      <RecipeInfo 
        recipeId={recipe.id}
        recipeImage={recipe.image}
        title={recipe.title}
        coockingTime={recipe.coockingTime}
        complexity={recipe.complexity}
        typeOfFood={recipe.typeOfFood}
        numbersOfLikes={likesCount}
        averageGrade={comments && comments?.length > 0 ? comments.reduce((sum, comment) => sum + comment.grade, 0) / comments.length : 0}
        isLiked={isLiked}
        isSaved={isSaved}
        likeButtonClick={handleLikeClick}
        saveButtonClick={handleSaveClick}
        isOwner={isRecipeOwner}
      />
      <h3 className="link-text font-semibold my-5">{t('title-ingradients')}</h3>
      <RecipeContentCard className="w-full max-w-[364px] min-h-[170px]" text={recipe.ingradients} />
      <h3 className="link-text font-semibold my-5">{t('title-instructions')}</h3>
      <div className="flex justify-start">
        <Swiper spaceBetween={12} slidesPerView={"auto"} freeMode={true} centeredSlides={false} className="!m-0">
          {isLoadingSteps ? (
            <>
              {[...Array(5)].map((_, index) => (
                <SwiperSlide style={{ width: '300px' }} key={index + 10}>
                  <RecipeContentCardSkeleton />
                </SwiperSlide>
              ))}
            </>
          ) : (
            <>
              {steps && steps.map((step, index) => (
                <SwiperSlide style={{ width: '300px' }} key={index}>
                  <div className="relative">
                    <span className="absolute left-3 top-2 link-text font-semibold z-50">{t('step')} {index + 1}</span>
                    <RecipeContentCard text={step.stepDescription} className="w-[300px] !pt-10 min-h-[128px]" />
                  </div>
                </SwiperSlide>
              ))}
            </>
          )}
          
        </Swiper>
      </div>
      <div className="mt-12">
        <h3 className="link-text font-semibold my-5">{t('title-comment')}</h3>
        <p className="text-red-500 text-sm">{errors.grade?.message}</p>
        <div className="flex">
          {[...Array(5)].map((_, i) => {
            const ratingValue = i + 1;
            return (
              <RecipeRating
                key={i}
                averageRating={4}
                ratingValue={ratingValue}
                hover={hover}
                rating={rating}
                setHoverOnEnter={() => setHover(ratingValue)}
                setHoverOnLeave={() => setHover(0)}
                onClick={() => onClickSetGrade(ratingValue)}
              />
            )
          })}
        </div>
        <form onSubmit={handleSubmit(onSubmitCreateComment)}>
          <input {...register('grade')} type="hidden" />
          <p className="text-red-500 text-sm">{errors.commentText?.message}</p>
          <Input {...register('commentText')} type="text" className="max-w-[615px] block mt-8" placeholder={t('comment-placeholder')} />
          <Button className="max-w-[234px] my-8" text={t('create-comment-button')} isActive={true} />
        </form>
        <RecipeCommentContent>
          {isLoadingAllComments ? (
            <>
              {[...Array(5)].map(() => (
                <RecipeCommentSkeleton className="mb-6" />
              ))}
            </> 
          ) : (
            <>
              {comments && comments.length > 0 ? comments.map((comment, index) => {
                return (
                  <div className="mb-6" key={index}>
                    <RecipeComment 
                      key={index}
                      userImage={comment.user.image}
                      username={comment.user.username}
                      recipeOwnerId={recipe.ownerId}
                      commentText={comment.commentText}
                      rating={comment.grade}
                      userId={comment.user.id}
                      numbersOfReplies={comment.commentReply.length}
                      onClickOpenReplies={() => handleOpenReplies(comment.id)}
                      isOpenReplies={openReplies[comment.id]}
                      onClickReply={() => {handleOpenInput(comment.id, comment.id, comment.user.id), setReplyValue('commentText', '')}}
                      onClickDeleteComment={() => onClickDeleteComment(comment.id)}
                    />
                    <div className="ml-14">
                      {openInputId === comment.id && (
                        <form onSubmit={handleSubmitReply(onSubmitCreateCommentReply)}>
                          <Input {...registerReply('commentText')} type="text" placeholder={t('comment-placeholder')} />
                          <div className="flex justify-end mt-3">
                            <button onClick={() => setOpenInputId('')} className=" mr-4">{t('canclel-button')}</button>
                            <Button text={t('reply-button')} isActive={isValidReply} className="max-w-[128px] h-8 flex justify-center items-center" />
                          </div>
                        </form>
                      )}
                      {openReplies[comment.id] && (
                        <div className="my-4">
                          {comment.commentReply.map((commentReply) => {
                            return (
                              <div key={commentReply.id}>
                                <RecipeComment 
                                  userImage={commentReply.user.image}
                                  recipeOwnerId={recipe.ownerId}
                                  numbersOfReplies={0}
                                  username={commentReply.user.username}
                                  commentText={commentReply.commentText}
                                  userId={commentReply.user.id}
                                  onClickReply={() => {handleOpenInput(commentReply.id, comment.id, commentReply.user.id), setReplyValue('commentText', `@${commentReply.user.username} `) }}
                                  onClickDeleteComment={() => onClickDeleteCommentReply(commentReply.id)}
                                />
                                {openInputId === commentReply.id && (
                                  <form onSubmit={handleSubmitReply(onSubmitCreateCommentReply)} className="ml-14">
                                    <Input {...registerReply('commentText')} type="text" placeholder={t('comment-placeholder')} />
                                    <div className="flex justify-end mt-3">
                                      <button onClick={() => setOpenInputId('')} className="mr-4">{t('canclel-button')}</button>
                                      <Button text={t('reply-button')} isActive={isValidReply} className="max-w-[128px] h-8 flex justify-center items-center" />
                                    </div>
                                  </form>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )
              }) : (
                <p className="w-full text-center text-[#969696]">No comments</p>
              )}
            </>
          )}
        </RecipeCommentContent>
      </div>
    </>
  )
}

export default Recipe;