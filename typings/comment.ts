export interface IComment {
  id            : string;
  authorImage   : string;
  authorUsername: string;
  commentText   : string;
  grade         : number;
  createdAt     : Date;
};

export interface ICommentReply {
  id            : string;
  commentText   : string;
  userId        : string;
  createdAt     : Date;
};