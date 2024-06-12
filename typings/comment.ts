import { IUser } from "./user";

export interface IComment {
  id            : string;
  user          : IUser;
  commentText   : string;
  grade         : number;
  createdAt     : Date;
  commentReply  : ICommentReply[];
};

export interface ICommentReply {
  id            : string;
  commentText   : string;
  user          : IUser;
  createdAt     : Date;
};