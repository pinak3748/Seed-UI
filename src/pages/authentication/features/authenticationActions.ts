import { createAsyncThunk } from '@reduxjs/toolkit';

import { unAuthInstance } from '@/lib/axios';

export const signIn = createAsyncThunk(
  'authentication/signIn',
  async ({ email, password }: any) => {
    const response = await unAuthInstance.post('/user/signin', {
      email,
      password,
    });
    return response.data;
  }
);

export const signUp = createAsyncThunk(
  'authentication/signUp',
  async ({ name, email, password }: any) => {
    const response = await unAuthInstance.post('/user/signup', {
      name,
      email,
      password,
    });
    return response.data;
  }
);
