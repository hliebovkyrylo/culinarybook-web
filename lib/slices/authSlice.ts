import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

export interface IAuthState {
  access_token: string | null;
};

export const initialAuthState: IAuthState = {
  access_token: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.access_token = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.signUp.matchFulfilled,
        (state, { payload }) => {
          state.access_token = payload.access_token;
        }
      )
      .addMatcher(
        authApi.endpoints.signIn.matchFulfilled,
        (state, { payload }) => {
          state.access_token = payload.access_token;
        }
      )
      .addMatcher(
        authApi.endpoints.signOut.matchFulfilled,
        (state) => {
          state.access_token = null;
        }
      )
  }
});

export const { setAccessToken } = authSlice.actions;