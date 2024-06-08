import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRegisterMutation } from '../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredential } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createReg] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);
  const handleReg = async (data) => {
    try {
      const { name, email, password } = data;
      const res = await createReg({ name, email, password }).unwrap();
      dispatch(setCredential(res));
      console.log(res);
      navigate('/');
    } catch (error) {
      toast.error(error.data);
      console.log(error);
    }
  };
  return (
    <>
      {/* {loggdinuserinfo && <Navigate to={'/'} replace={true}></Navigate>} */}
      <div className='w-full bg-grey-500'>
        <div className='container mx-auto py-8 '>
          <div className='w-96 mx-auto border border-orange-200 bg-white rounded shadow '>
            <div className='mx-16 py-4 px-8 font-bold text-2xl border-b border-grey-500 text-orange-500 '>
              Create Account
            </div>
            <form
              noValidate
              onSubmit={handleSubmit(handleReg)}
              name='student_application'
              id='student_application'
              action=''
            >
              <div className='py-4 px-8'>
                <div className='mb-4'>
                  <label className='block text-grey-darker text-orange-400  text-sm font-bold mb-2'>
                    User Name
                  </label>
                  <input
                    className=' border border-orange-300 rounded w-full py-2 px-3 text-grey-darker'
                    type='text'
                    name='username'
                    id='username'
                    {...register('username', {
                      required: ' username requered',
                      minLength: 3,
                      maxLength: 8,
                    })}
                    defaultValue=''
                    placeholder='Enter Your UserName'
                  />
                  {errors.username && (
                    <p className=' text-red-600 text-center'>
                      {errors.username.message}
                    </p>
                  )}
                </div>
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
                    id='password'
                    {...register('password', {
                      required: 'password requered',
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,

                        message: 'password not valid',
                      },
                    })}
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
                  <button className='mb-1 rounded-full ms-6 me-6 py-1 px-24 bg-gradient-to-r from-orange-200 to-orange-500 '>
                    Registration
                  </button>
                </div>
                <div className='mt-4 flex items-center justify-between'>
                  <span className='border-b w-1/5 md:w-1/4' />
                  <Link
                    to={'/login'}
                    className='text-xs text-gray-500 uppercase'
                  >
                    or login
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
