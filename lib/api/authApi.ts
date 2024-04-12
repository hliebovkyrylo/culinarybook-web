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

export interface ISignOutResponse {
  accessToken: null;
};

export interface IForgotPasswordRequest {
  email: string;
};

export interface ICanResetPasswordRequest {
  email: string;
  code : string; 
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
    }),
    forgotPassword: builder.mutation<void, IForgotPasswordRequest>({
      query: (body) => ({
        method: 'POST',
        url   : '/auth/forgot-password',
        body
      })
    }),
    canResetPassword: builder.mutation<void, ICanResetPasswordRequest>({
      query: ({ email, code }) => ({
        method: 'PATCH',
        url   : `/auth/canReset-password/${email}`,
        body  : {
          code,
        }
      })
    }),
    signOut: builder.mutation<ISignOutResponse, void>({
      queryFn: () => ({
        data: { accessToken: null }
      }),
      invalidatesTags: ['user']
    })
  })
});

export const { 
  useSignUpMutation, 
  useSendCodeMutation,
  useVerifyAccountMutation,
  useSignInMutation,
  useSignOutMutation,
  useForgotPasswordMutation,
  useCanResetPasswordMutation
} = authApi;