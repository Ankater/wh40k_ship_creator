import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import shipsReducer from "./slices/shipsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ships: shipsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
