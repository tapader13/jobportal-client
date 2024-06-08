import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { Link } from 'react-router-dom';
import {
  useCreatejobMutation,
  useEmpltypeQuery,
  useLocationQuery,
  useWorkexpQuery,
} from '../slices/jobSlice';
import { toast } from 'react-toastify';
export default function PostJob() {
  const { register, handleSubmit, reset } = useForm();
  const { data: loc } = useLocationQuery();
  const { data: workExp } = useWorkexpQuery();
  const { data: empytype } = useEmpltypeQuery();
  const [createjob] = useCreatejobMutation();
  const handlePost = async (data) => {
    try {
      const dtcrt = new Date().toISOString().split('T')[0];
      const post = { ...data, created_at: dtcrt };
      console.log(post);
      const res = await createjob(post);
      reset();
      toast.success('job done!!!');
    } catch (error) {
      toast.error(error.data);
    }
  };
  useEffect(() => {
    const handleDate = () => {
      const dtePeak = document.getElementById('application_deadline');
      const dt = new Date().toISOString().split('T')[0];
      dtePeak.min = dt;
      console.log(dt);
    };
    handleDate();
  }, []);
  return (
    <div className='mx-auto max-w-7xl my-5 border border-orange-400 py-5 shadow-md  px-4 sm:px-10 lg:px-16'>
      <h1 className='text-center my-3 text-2xl text-orange-500 font-bold border-b'>
        Create A Job Post
      </h1>
      <form noValidate onSubmit={handleSubmit((data) => handlePost(data))}>
        <div className='space-y-12'>
          <div className=' pb-6'>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-4'>
                <label
                  htmlFor='title'
                  className='block text-sm font-bold leading-6 text-orange-400'
                >
                  Title
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                    <input
                      type='text'
                      name='title'
                      id='title'
                      {...register('title', { required: true })}
                      className='block flex-1  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>

              <div className='col-span-full'>
                <label
                  htmlFor='description'
                  className='block text-sm font-bold leading-6 text-orange-400'
                >
                  Description
                </label>
                <div className='mt-2'>
                  <textarea
                    id='description'
                    name='description'
                    rows={3}
                    {...register('description', { required: true })}
                    className='block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    defaultValue={''}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='border-b border-gray-900/10 pb-12'>
            <div className='mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-2'>
                <label
                  htmlFor='contact'
                  className='block text-sm font-bold leading-6 text-orange-400'
                >
                  Contact
                </label>
                <div className='mt-2'>
                  <input
                    type='number'
                    name='contact'
                    id='contact'
                    {...register('contact', { required: true })}
                    className='block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='salary_from'
                  className='block text-sm font-bold leading-6 text-orange-400'
                >
                  Salary From
                </label>
                <div className='mt-2'>
                  <input
                    type='number'
                    name='salary_from'
                    id='salary_from'
                    {...register('salary_from', { required: true })}
                    className='block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='salary_to'
                  className='block text-sm font-bold leading-6 text-orange-400'
                >
                  Salary To
                </label>
                <div className='mt-2'>
                  <input
                    type='number'
                    name='salary_to'
                    id='salary_to'
                    {...register('salary_to', { required: true })}
                    className='block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='is_remote_work'
                  className='block text-sm font-bold leading-6 text-orange-400'
                >
                  Is Remote Work
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    name='is_remote_work'
                    id='is_remote_work'
                    {...register('is_remote_work', { required: true })}
                    className='block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='number_of_opening'
                  className='block text-sm font-bold leading-6 text-orange-400'
                >
                  Number Of Opening{' '}
                </label>
                <div className='mt-2'>
                  <input
                    type='number'
                    name='number_of_opening'
                    id='number_of_opening'
                    {...register('number_of_opening', { required: true })}
                    className='block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='application_deadline'
                  className='block text-sm font-bold leading-6 text-orange-400'
                >
                  Application Deadline{' '}
                </label>
                <div className='mt-2'>
                  <input
                    type='date'
                    min={''}
                    name='application_deadline'
                    id='application_deadline'
                    {...register('application_deadline', { required: true })}
                    className='block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <label
                  htmlFor='company'
                  className='block text-sm font-bold leading-6 text-orange-400'
                >
                  Company
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    min={''}
                    name='company'
                    id='company'
                    {...register('company', { required: true })}
                    className='block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <label
                  htmlFor='location'
                  className='block text-sm font-bold leading-6 text-orange-400'
                >
                  Location
                </label>
                <div className='mt-2'>
                  <select
                    id='location'
                    name='location'
                    {...register('location', { required: true })}
                    className='block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  >
                    {loc &&
                      loc.map((loc, i) => (
                        <option key={i} value={loc.label}>
                          {loc.label}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className='sm:col-span-2'>
                <label
                  htmlFor='employment_type'
                  className='block text-sm font-bold leading-6 text-orange-400'
                >
                  Employment Type
                </label>
                <div className='mt-2'>
                  <select
                    id='employment_type'
                    name='employment_type'
                    {...register('employment_type', { required: true })}
                    className='block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  >
                    {empytype &&
                      empytype.map((emp, i) => (
                        <option key={i} value={emp.name}>
                          {emp.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className='sm:col-span-2'>
                <label
                  htmlFor='Workexperience'
                  className='block text-sm font-bold leading-6 text-orange-400'
                >
                  Workexperience
                </label>
                <div className='mt-2'>
                  <select
                    id='Workexperience'
                    name='Workexperience'
                    {...register('Workexperience', { required: true })}
                    className='block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  >
                    {workExp &&
                      workExp.map((wrk, i) => (
                        <option key={i} value={wrk.value}>
                          {wrk.label}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className='sm:col-span-2'>
                <label
                  htmlFor='job_category'
                  className='block text-sm font-bold leading-6 text-orange-400'
                >
                  Job Category
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    min={''}
                    name='job_category'
                    id='job_category'
                    placeholder='Software Engineer/Data Analyst/Marketing...'
                    {...register('job_category', { required: true })}
                    className='block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <Link
            to='/'
            className='text-sm font-semibold leading-6 text-gray-900'
          >
            Cancel
          </Link>
          <button
            type='submit'
            className='rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
