import { IComment, ICommentReply } from "@/typings/comment";
import { api }                     from ".";
import { IUser } from "@/typings/user";

export interface ICreateCommentRequest {
  commentText: string;
  grade      : number;
  recipeId   : string;
};

export interface ICreateCommentReplyRequest {
  commentText: string;
  commentId  : string;
};

export type ICommentResponse      = IComment;
export type ICommentReplyResponse = ICommentReply;

export interface IGetCommentsResponse {
  id            : string;
  user          : IUser;
  commentText   : string;
  grade         : number;
  createdAt     : Date;
  commentReply  : ICommentReply[];
}

export const commentApi = api.injectEndpoints({
  endpoints: builder => ({
    createComment: builder.mutation<ICommentResponse, ICreateCommentRequest>({
      query: ({ recipeId, ...rest }) => ({
        method: 'POST',
        url: `/comment/create/${recipeId}`,
        body: rest
      })
    }),
    createCommentReply: builder.mutation<ICommentReplyResponse, ICreateCommentReplyRequest>({
      query: ({ commentId, ...rest }) => ({
        method: 'POST',
        url: `/comment/${commentId}/reply`,
        body: rest
      })
    }),
    getComments: builder.query<IGetCommentsResponse[], string>({
      query: (recipeId) => ({
        url: `/comment/getComments/${recipeId}`
      })
    }),
    deleteComment: builder.mutation<void, string>({
      query: (commentId) => ({
        method: 'DELETE',
        url: `/comment/${commentId}/delete`
      })
    }),
    deleteCommentReply: builder.mutation<void, string>({
      query: (commentReplyId) => ({
        method: 'DELETE',
        url: `/comment/reply/${commentReplyId}/delete`
      })
    }),
  })
});

export const {
  useCreateCommentMutation,
  useCreateCommentReplyMutation,
  useDeleteCommentMutation,
  useDeleteCommentReplyMutation,
  useGetCommentsQuery
} = commentApi;