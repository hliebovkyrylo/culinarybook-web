import { api } from ".";

export interface ISignUpRequest {
  email   : string;
  username: string;
  name    : string;
  password: string;
  image   : string;
};

export interface IAuthResponse {
  accessToken: string;
};

export interface IVerifyAccountRequest {
  code: string;
};

export interface ISignInRequest {
  email   : string;
  password: string;
};

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation<IAuthResponse, ISignUpRequest>({
      query: (body) => ({
        method: 'POST',
        url   : '/auth/sign-up',
        body
      })
    }),
    sendCode: builder.mutation<string, void>({
      query: () => ({
        method: 'POST',
        url   : '/auth/send-code'
      })
    }),
    verifyAccount: builder.mutation<void, IVerifyAccountRequest>({
      query: (body) => ({
        method: 'POST',
        url   :  '/auth/verify-email',
        body
      })
    }),
    signIn: builder.mutation<IAuthResponse, ISignInRequest>({
      query: (body) => ({
        method: 'POST',
        url   : '/auth/sign-in',
        body
      })
    })
  })
});

export const { 
  useSignUpMutation, 
  useSendCodeMutation,
  useVerifyAccountMutation,
  useSignInMutation
} = authApi;