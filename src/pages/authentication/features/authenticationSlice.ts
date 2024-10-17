import { createSlice } from '@reduxjs/toolkit';

import { signIn, signUp } from './authenticationActions';

interface AuthenticationState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthenticationState = {
  isAuthenticated: false,
  isLoading: false,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });
    builder.addCase(signIn.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { login, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
