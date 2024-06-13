import { api } from ".";

export interface ISignUpRequest {
  email   : string;
  username: string;
  name    : string;
  password: string;
  image   : string;
};

export interface IAuthResponse {
  access_token: string;
};

export interface IVerifyAccountRequest {
  code: string;
};

export interface ISignInRequest {
  email   : string;
  password: string;
};

export interface ISignOutResponse {
  access_token: null;
};

export interface IForgotPasswordRequest {
  email: string;
};

export interface ICanResetPasswordRequest {
  email: string;
  code : string; 
};

export interface IResetPasswordRequest {
  password       : string;
  confirmPassword: string;
  email          : string;
};

export interface IChangePasswordRequest {
  oldPassword       : string;
  newPassword       : string;
  confirmNewPassword: string;
}

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation<IAuthResponse, ISignUpRequest>({
      query: (body) => ({
        method: 'POST',
        url   : '/auth/sign-up',
        body
      }),
      invalidatesTags: ['user', 'recipe']
    }),
    sendCode: builder.mutation<string, void>({
      query: () => ({
        method: 'POST',
        url   : '/auth/send-code'
      }),
      invalidatesTags: ['user', 'recipe']
    }),
    verifyAccount: builder.mutation<void, IVerifyAccountRequest>({
      query: (body) => ({
        method: 'POST',
        url   :  '/auth/verify-email',
        body
      }),
      invalidatesTags: ['user', 'recipe']
    }),
    signIn: builder.mutation<IAuthResponse, ISignInRequest>({
      query: (body) => ({
        method: 'POST',
        url   : '/auth/sign-in',
        body
      }),
      invalidatesTags: ['user', 'recipe']
    }),
    forgotPassword: builder.mutation<void, IForgotPasswordRequest>({
      query: (body) => ({
        method: 'POST',
        url   : '/auth/forgot-password',
        body
      }),
      invalidatesTags: ['user', 'recipe']
    }),
    canResetPassword: builder.mutation<void, ICanResetPasswordRequest>({
      query: ({ email, code }) => ({
        method: 'PATCH',
        url   : `/auth/canReset-password/${email}`,
        body  : {
          code,
        }
      }),
      invalidatesTags: ['user', 'recipe']
    }),
    resetPassword: builder.mutation<void, IResetPasswordRequest>({
      query: ({ password, confirmPassword, email }) => ({
        method: 'PATCH',
        url   : `/auth/reset-password/${email}`,
        body  : {
          password,
          confirmPassword
        }
      }),
      invalidatesTags: ['user', 'recipe']
    }),
    changePassword: builder.mutation<void, IChangePasswordRequest>({
      query: (body) => ({
        method: 'PATCH',
        url: '/auth/change-password',
        body
      })
    }),
    signOut: builder.mutation<ISignOutResponse, void>({
      queryFn: () => ({
        data: { access_token: null }
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
  useCanResetPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;