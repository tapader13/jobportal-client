import { apiSlice } from './apiSlice';
const base_url = '/';
export const jobSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    jobuser: builder.query({
      query: () => ({
        url: `${base_url}api/job/getuserjob `,
        method: 'GET',
      }),
      providesTags: ['job'],
    }),
    createjob: builder.mutation({
      query: (data) => ({
        url: `${base_url}api/job/createjob `,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['job'],
    }),
    alljob: builder.query({
      query: (data) => {
        const filterKey = Object.keys(data.filter)[0];
        const filterValue = data.filter[filterKey];
        return {
          url: `${base_url}api/job/?_page=${data._page}&_limit=${data._limit}&${filterKey}=${filterValue}`,
          method: 'GET',
        };
      },
      transformResponse: (response, meta) => {
        const totalItems = meta.response.headers.get('total');
        return { data: response, totalItems };
      },
      providesTags: ['job'],
    }),
    location: builder.query({
      query: () => ({
        url: `${base_url}api/location/getloc `,
        method: 'GET',
      }),
    }),
    workexp: builder.query({
      query: () => ({
        url: `${base_url}api/experience/getexp `,
        method: 'GET',
      }),
    }),
    empltype: builder.query({
      query: () => ({
        url: `${base_url}api/categorie/getcat `,
        method: 'GET',
      }),
    }),
    salary: builder.query({
      query: () => ({
        url: `${base_url}api/salary/getsalary `,
        method: 'GET',
      }),
    }),
    jobdetails: builder.query({
      query: (id) => ({
        url: `${base_url}api/job/getjobdlts/${id} `,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useJobuserQuery,
  useCreatejobMutation,
  useLocationQuery,
  useWorkexpQuery,
  useEmpltypeQuery,
  useSalaryQuery,
  useAlljobQuery,
  useJobdetailsQuery,
} = jobSlice;
