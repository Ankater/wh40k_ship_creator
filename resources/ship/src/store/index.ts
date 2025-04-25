import { configureStore, UnknownAction } from '@reduxjs/toolkit';
import shipsReducer from './slices/shipsSlice';

const store = configureStore({
  reducer: {
    ships: shipsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

function authReducer(_state: unknown, _action: UnknownAction): unknown {
  throw new Error('Function not implemented.');
}
