import { IComment }                 from "@/typings/comment"
import { Comment, CommentSkeleton } from "../common";
import { useToggleState }           from "@/hooks/useToggleState";
import { useCallback, useState }    from "react";
import { zodResolver }              from "@hookform/resolvers/zod";
import { Button, Input }            from "@/components/ui";
import { useTranslation }           from "next-i18next";
import { 
  CreateCommentReplyFormData, 
  createCommentReplySchema 
}                                   from "./schemas/createCommentReplySchema";
import { 
  useCreateCommentReplyMutation, 
  useDeleteCommentMutation, 
  useDeleteCommentReplyMutation 
}                                   from "@/lib/api/commentApi";
import { useRouter }                from "next/router";
import { useForm }                  from "react-hook-form";
import { useSelector }              from "react-redux";
import { IAppState }                from "@/lib/store";

interface ICommentsContent {
  data         : IComment[] | undefined;
  isLoading    : boolean;
  recipeOwnerId: string
}

export const CommentsContent = ({
  data,
  isLoading,
  recipeOwnerId
}: ICommentsContent) => {
  const accessToken = useSelector((state: IAppState) => state.auth.access_token);
  const { t }       = useTranslation("common");
  const router      = useRouter();

  const [openReplies, toggleOpenReplies] = useToggleState({});
  const handleOpenReplies = (commentId: string) => {
    toggleOpenReplies(commentId);
  };

  const [selectedCommentId, setSelectedCommentId] = useState('');
  const [selectedUserId, setSelectedUserId]       = useState('');
  const [openInputId, setOpenInputId]             = useState<string>();

  const { handleSubmit: handleSubmitReply, register: registerReply, formState: { isValid: isValidReply }, reset: resetReply, setValue: setReplyValue } = useForm<CreateCommentReplyFormData>({
    defaultValues: {
      commentText: '',
    },
    resolver: zodResolver(createCommentReplySchema),
  });

  const [ createCommentReply, { isLoading: isLoadingCreatingCommentsReplies } ] = useCreateCommentReplyMutation();

  const [ deleteComment, { isLoading: isLoadingDeleteComment } ]             = useDeleteCommentMutation();
  const [ deleteCommentReply, { isLoading: isLoadingDeletingCommentReply } ] = useDeleteCommentReplyMutation();

  const onClickDeleteComment = async (commentId: string) => {
    await deleteComment(commentId);
  }

  const onClickDeleteCommentReply = async (commentReplyId: string) => {
    await deleteCommentReply(commentReplyId);
  }

  const onSubmitCreateCommentReply = useCallback(async (values: CreateCommentReplyFormData) => {
    if (!accessToken) {
      router.push('/sign-in');
    } else {
      createCommentReply({ ...values, commentId: selectedCommentId, userId: selectedUserId }).unwrap().then(() => {
        resetReply();
        setOpenInputId('');
      })
    }
  }, [createCommentReply, selectedCommentId, accessToken])

  const handleOpenInput = (openCommentId: string, createCommentId: string, userId: string) => {
    setSelectedCommentId(createCommentId);
    setOpenInputId(openCommentId);
    setSelectedUserId(userId);
  };

  const isLoadingAllComments = isLoadingDeleteComment || isLoadingCreatingCommentsReplies || isLoadingDeletingCommentReply;

  return (
    <>
      {(isLoading || isLoadingAllComments) ? (
        <>
          {[...Array(5)].map((_, index) => (
            <CommentSkeleton className="mb-6" key={index} />
          ))}
        </>
      ) : (
        <>
          {data && data.length > 0 ? data.map((comment, index) => {
            return (
              <div className="mb-6" key={index}>
                <Comment
                  key={index}
                  userImage={comment.user.image}
                  username={comment.user.username}
                  recipeOwnerId={recipeOwnerId}
                  commentText={comment.commentText}
                  rating={comment.grade}
                  userId={comment.user.id}
                  numbersOfReplies={comment.commentReply.length}
                  onClickOpenReplies={() => handleOpenReplies(comment.id)}
                  isOpenReplies={openReplies[comment.id]}
                  onClickReply={() => { handleOpenInput(comment.id, comment.id, comment.user.id), setReplyValue('commentText', '') }}
                  onClickDeleteComment={() => onClickDeleteComment(comment.id)}
                />
                <div className="ml-14">
                  {openInputId === comment.id && (
                    <form onSubmit={handleSubmitReply(onSubmitCreateCommentReply)}>
                      <Input color="default" {...registerReply('commentText')} type="text" placeholder={t('comment-placeholder')} />
                      <div className="flex justify-end mt-3">
                        <button onClick={() => setOpenInputId('')} className=" mr-4">{t('canclel-button')}</button>
                        <Button text={t('reply-button')} state={isValidReply ? "default" : "disabled"} className="max-w-[128px] h-8 flex justify-center items-center" />
                      </div>
                    </form>
                  )}
                  {openReplies[comment.id] && (
                    <div className="my-4">
                      {comment.commentReply.map((commentReply) => {
                        return (
                          <div key={commentReply.id}>
                            <Comment
                              userImage={commentReply.user.image}
                              recipeOwnerId={recipeOwnerId}
                              numbersOfReplies={0}
                              username={commentReply.user.username}
                              commentText={commentReply.commentText}
                              userId={commentReply.user.id}
                              onClickReply={() => { handleOpenInput(commentReply.id, comment.id, commentReply.user.id), setReplyValue('commentText', `@${commentReply.user.username} `) }}
                              onClickDeleteComment={() => onClickDeleteCommentReply(commentReply.id)}
                            />
                            {openInputId === commentReply.id && (
                              <form onSubmit={handleSubmitReply(onSubmitCreateCommentReply)} className="ml-14">
                                <Input color="default" {...registerReply('commentText')} type="text" placeholder={t('comment-placeholder')} />
                                <div className="flex justify-end mt-3">
                                  <button onClick={() => setOpenInputId('')} className="mr-4">{t('canclel-button')}</button>
                                  <Button text={t('reply-button')} state={isValidReply ? "default" : "disabled"} className="max-w-[128px] h-8 flex justify-center items-center" />
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
    </>
  )
}