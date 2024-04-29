import { IUser } from "./user";

export interface IComment {
  id            : string;
  user          : IUser;
  commentText   : string;
  grade         : number;
  createdAt     : Date;
};

export interface ICommentReply {
  id            : string;
  commentText   : string;
  user          : IUser;
  createdAt     : Date;
};