export interface ApiError {
  code   : string;
  message: string;
};

export interface RtkError {
  data  : ApiError;
  status: number;
};