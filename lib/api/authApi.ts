import { api } from ".";

export interface ISignUpRequest {
  email   : string;
  username: string;
  name    : string;
  password: string;
  image   : string;
};

export interface IVerifyAccountRequest {
  code: string;
};

export interface ISignInRequest {
  email   : string;
  password: string;
};

export interface IAuthStateResponse {
  isAuth: boolean;
}

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
    signUp: builder.mutation<void, ISignUpRequest>({
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
    signIn: builder.mutation<void, ISignInRequest>({
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
    getAuthStatus: builder.query<IAuthStateResponse, void>({
      query: () => ({
        url: '/auth/check-auth-status'
      })
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({
        method: 'POST',
        url   : '/auth/sign-out',
      }),
      invalidatesTags: ['user', 'recipe']
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
  useGetAuthStatusQuery,
} = authApi;