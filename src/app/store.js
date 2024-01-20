import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import jobsReducer from '../features/jobs/jobsSlice';
import contactReducer from '../features/contact/contactSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    jobs: jobsReducer,
    contact: contactReducer,
    auth: authReducer,
  },
});
