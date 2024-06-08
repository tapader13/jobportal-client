import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../slices/userSlice';
import { toast } from 'react-toastify';
import { setCredential } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loginUser, { error }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);
  const handleLogin = async (data) => {
    try {
      const { password, email } = data;
      const res = await loginUser({ password, email }).unwrap();
      dispatch(setCredential(res));
      navigate('/');
    } catch (error) {
      toast.error(error.data);
    }
  };
  return (
    <>
      {/* {loggdinuserinfo && <Navigate to={'/'} replace={true}></Navigate>}{' '} */}
      <div className='w-full bg-grey-500'>
        <div className='container mx-auto py-8 '>
          <div className='w-96 mx-auto border border-orange-200 bg-white rounded shadow '>
            <div className='mx-16 py-4 px-8 font-bold text-2xl border-b border-grey-500 text-orange-500 '>
              Welcome back!
              {/* {authError && (
                <p className=' font-normal text-sm text-red-500'>
                  {authError.message}
                </p>
              )} */}
            </div>
            <form
              noValidate
              onSubmit={handleSubmit(handleLogin)}
              name='student_application'
              id='student_application'
              action=''
            >
              <div className='py-4 px-8'>
                <div className='mb-4'>
                  <label className='block text-grey-darker text-orange-400  text-sm font-bold mb-2'>
                    Email:
                  </label>
                  <input
                    className=' border border-orange-300 rounded w-full py-2 px-3 text-grey-darker'
                    type='email'
                    name='email'
                    {...register('email', {
                      required: 'email requered',
                      pattern: {
                        value:
                          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,

                        message: 'email not valid',
                      },
                    })}
                    id='email'
                    defaultValue=''
                    placeholder='Enter Your Email'
                  />
                  {errors.email && (
                    <p className=' text-red-600 text-center'>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className='mb-4'>
                  <label className='block text-grey-darker text-orange-400 text-sm font-bold mb-2'>
                    Password:
                  </label>
                  <input
                    className=' border border-orange-300 rounded w-full py-2 px-3 text-grey-darker'
                    type='password'
                    name='password'
                    {...register('password', {
                      required: 'password requered',
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,

                        message: 'password not valid',
                      },
                    })}
                    id='password'
                    defaultValue=''
                    placeholder='Enter Your Password'
                  />
                  {errors.password && (
                    <p className=' text-red-600 text-center'>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className='mb-4 '>
                  <button
                    type='submit'
                    className='mb-1 rounded-full ms-6 me-6 py-1 px-24 bg-gradient-to-r from-orange-200 to-orange-500 '
                  >
                    Login
                  </button>
                </div>
                <div className='mt-4 flex items-center justify-between'>
                  <span className='border-b w-1/5 md:w-1/4' />
                  <Link
                    to={'/registration'}
                    className='text-xs text-gray-500 uppercase'
                  >
                    or sign up
                  </Link>
                  <span className='border-b w-1/5 md:w-1/4' />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
