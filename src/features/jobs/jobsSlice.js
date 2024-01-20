import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchJobs,
  fetchJobsByTitle,
  fetchLocation,
  fetchSalary,
  fetchSubCategories,
  fetchSubCategoriesJob,
  fetchWorkExp,
} from './jobsAPI';

const initialState = {
  value: 0,
  status: 'idle',
  subCategories: [],
  location: [],
  salary: [],
  workExp: [],
  jobs: [],
  totalItems: 0,
};
export const fetchSubCategoriesAsync = createAsyncThunk(
  'jobs/fetchSubCategories',
  async () => {
    const response = await fetchSubCategories();
    return response.data;
  }
);
export const fetchLocationAsync = createAsyncThunk(
  'jobs/fetchLocation',
  async () => {
    const response = await fetchLocation();
    return response.data;
  }
);
export const fetchSalaryAsync = createAsyncThunk(
  'jobs/fetchSalary',
  async () => {
    const response = await fetchSalary();
    return response.data;
  }
);
export const fetchWorkExpAsync = createAsyncThunk(
  'jobs/fetchWorkExp',
  async () => {
    const response = await fetchWorkExp();
    return response.data;
  }
);
export const fetchJobsAsync = createAsyncThunk(
  'jobs/fetchJobs',
  async ({ filter, pagi }) => {
    const response = await fetchJobs(filter, pagi);
    return response.data;
  }
);
export const fetchSubCategoriesJobAsync = createAsyncThunk(
  'jobs/fetchSubCategoriesJob',
  async (subCategories) => {
    const response = await fetchSubCategoriesJob(subCategories);
    return response.data;
  }
);
export const fetchJobsByTitleAsync = createAsyncThunk(
  'jobs/fetchJobsByTitle',
  async (title) => {
    const response = await fetchJobsByTitle(title);
    return response.data;
  }
);
export const jobsSlice = createSlice({
  name: 'jobs',
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
      .addCase(fetchSubCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.subCategories = action.payload;
      })
      .addCase(fetchLocationAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLocationAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.location = action.payload;
      })
      .addCase(fetchSalaryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSalaryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.salary = action.payload;
      })
      .addCase(fetchWorkExpAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWorkExpAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.workExp = action.payload;
      })
      .addCase(fetchJobsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.jobs = action.payload.jobItems;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchSubCategoriesJobAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubCategoriesJobAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.jobs = action.payload;
      })
      .addCase(fetchJobsByTitleAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobsByTitleAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.jobs = action.payload.jobItems;
        state.totalItems = action.payload.totalItems;
      });
  },
});

export const { increment, decrement, incrementByAmount } = jobsSlice.actions;
export const selectCount = (state) => state.counter.value;
export const selectSubCategories = (state) => state.jobs.subCategories;
export const selectLocation = (state) => state.jobs.location;
export const selectSalary = (state) => state.jobs.salary;
export const selectWorkExp = (state) => state.jobs.workExp;
export const selectJobs = (state) => state.jobs.jobs;
export const selectTotItems = (state) => state.jobs.totalItems;

export default jobsSlice.reducer;
