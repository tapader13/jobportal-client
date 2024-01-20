import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, fetchCount } from './joblistingAPI';

const initialState = {
  value: 0,
  status: 'idle',
  contacts: [],
};

export const createCommentAsync = createAsyncThunk(
  'contact/createComment',
  async (commentInfo) => {
    const response = await createComment(commentInfo);
    return response.data;
  }
);

export const joblistingSlice = createSlice({
  name: 'contact',
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
      .addCase(createCommentAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCommentAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.contacts.push(action.payload);
      });
  },
});

export const { increment, decrement, incrementByAmount } =
  joblistingSlice.actions;
export const selectCount = (state) => state.counter.value;
// export const selectCount = (state) => state.counter.value;

export default joblistingSlice.reducer;
