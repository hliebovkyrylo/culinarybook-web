import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { configureStore, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import { api } from './api/index';
import { authSlice } from './slices/authSlice';

// Определите RootState
export type RootState = ReturnType<typeof combinedReducer>;

const combinedReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authSlice.reducer,
});

const reducer = (state: RootState | undefined, action: PayloadAction<any>) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
      [api.reducerPath]: {
        ...state?.[api.reducerPath],
        ...action.payload[api.reducerPath],
      },
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () => 
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(api.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });