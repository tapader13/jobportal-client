import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, loginUser } from './authAPI';

const initialState = {
  value: 0,
  status: 'idle',
  userInfo: null,
  errors: null,
};
export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (userInfo) => {
    const response = await createUser(userInfo);
    return response.data;
  }
);
export const loginUserAsync = createAsyncThunk(
  'auth/loginUser',
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(userInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },

    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.errors = action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = authSlice.actions;
export const selectCount = (state) => state.counter.value;
export const selectLoginUserInfo = (state) => state.auth.userInfo;
export const selectAuthErr = (state) => state.auth.errors;

export default authSlice.reducer;
