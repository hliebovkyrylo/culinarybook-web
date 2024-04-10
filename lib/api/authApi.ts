import { api } from ".";

export interface ISignUpRequest {
  email   : string;
  username: string;
  name    : string;
  password: string;
  image   : string;
};

export interface ISignUpResponse {
  accessToken: string;
};

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation<ISignUpResponse, ISignUpRequest>({
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
    })
  })
});

export const { useSignUpMutation, useSendCodeMutation } = authApi;