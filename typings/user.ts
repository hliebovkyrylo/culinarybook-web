export interface IUserMe {
  id              : string;
  email           : string;
  username        : string;
  name            : string;
  image           : string;
  isVerified      : boolean;
  canResetPassword: boolean;
}

export interface IUser {
  id              : string;
  email           : string;
  username        : string;
  name            : string;
  image           : string;
  isVerified      : boolean;
}