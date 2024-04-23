export interface IUserMe {
  id              : string;
  email           : string;
  username        : string;
  name            : string;
  backgroundImage : string;
  image           : string;
  isVerified      : boolean;
  canResetPassword: boolean;
}

export interface IUser {
  id              : string;
  email           : string;
  username        : string;
  name            : string;
  backgroundImage : string;
  followerCount   : number;
  recipeCount     : number;
  image           : string;
  isVerified      : boolean;
  isPrivate       : boolean;
}