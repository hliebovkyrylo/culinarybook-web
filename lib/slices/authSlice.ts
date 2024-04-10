import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { authApi }                    from "../api/authApi";

export interface IAuthState {
  accessToken: string | null;
};

export const initialAuthState: IAuthState = {
  accessToken: null
};

export const authSlice = createSlice({
  name        : 'auth',
  initialState: initialAuthState,
  reducers    : {
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.signUp.matchFulfilled,
        (state, { payload }) => {
          state.accessToken = payload.accessToken;
        }
      )
      .addMatcher(
        authApi.endpoints.signIn.matchFulfilled,
        (state, { payload }) => {
          state.accessToken = payload.accessToken;
        }
      )
      .addMatcher(
        authApi.endpoints.signOut.matchFulfilled,
        (state, { payload }) => {
          state.accessToken = payload.accessToken;
        }
      )
  }
});

export const { setAccessToken } = authSlice.actions;