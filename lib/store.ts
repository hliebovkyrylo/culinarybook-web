import { createWrapper, HYDRATE }          from 'next-redux-wrapper';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { api }                             from './api/index';
import { authSlice }                       from './slices/authSlice';

const combinedReducer = combineReducers({
  api : api.reducer,
  auth: authSlice.reducer,
});

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () => configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(api.middleware),
});

export const wrapper  = createWrapper(makeStore, {debug: false});