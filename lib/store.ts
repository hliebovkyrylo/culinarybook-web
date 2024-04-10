import {
  StateFromReducersMapObject,
  combineReducers,
  configureStore,
}                          from '@reduxjs/toolkit';
import createWebStorage    from 'redux-persist/lib/storage/createWebStorage';
import persistReducer      from 'redux-persist/es/persistReducer';
import persistStore        from 'redux-persist/es/persistStore';
import { authSlice }       from './slices/authSlice';
import { PersistConfig }   from 'redux-persist';
import { api }             from './api/index';
import { authInterceptor } from './middleware/authInterceptor';
import { WebStorage }      from 'redux-persist/lib/types';

export function createPersistStorage(): WebStorage {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }

  return createWebStorage('local');
}

const storage = createPersistStorage();

export const reducers = {
  auth: authSlice.reducer,
  api : api.reducer,
};

export type IAppState    = StateFromReducersMapObject<typeof reducers>;
export const rootReducer = combineReducers(reducers);

export const persistConfig: PersistConfig<IAppState> = {
  key      : 'root',
  whitelist: ['auth'],
  storage,
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer   : persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(api.middleware),
});

export const persistor = persistStore(store);
