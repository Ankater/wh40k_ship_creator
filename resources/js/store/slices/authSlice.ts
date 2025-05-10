import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi, { LoginSuccess, LoginError } from '@/api/api';

interface AuthState {
    user: { name: string } | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

export const login = createAsyncThunk<
    // Return type
    { name: string; token: string },
    // Argument type
    { email: string; password: string },
    // Optional thunkApi fields – just for rejectWithValue
    { rejectValue: string }
>(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        const res = await authApi.login(email, password);

        if (res.success) {
            return { name: res.data.name, token: res.data.token };
        }

        return rejectWithValue(res.error || 'Авторизация не удалась');
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('sb_token');   // optional: clear persisted JWT
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = { name: action.payload.name };
                state.token = action.payload.token;
                // Optional persistence so refreshes stay logged-in
                localStorage.setItem('sb_token', action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? action.error.message ?? 'Ошибка авторизации';
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
