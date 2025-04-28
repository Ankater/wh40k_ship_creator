import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import mockApi from '../../api/mockApi';

interface AuthState {
  user: { name: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk('auth/login', async ({ username, password }: { username: string; password: string }) => {
  const response = await mockApi.login(username, password);
  return response.user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
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
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка авторизации';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;