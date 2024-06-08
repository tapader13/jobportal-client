import { apiSlice } from './apiSlice';
const base_url = '/';
export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${base_url}api/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${base_url}api/login`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = userSlice;
