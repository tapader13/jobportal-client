import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useCreateContactMutation } from '../slices/contactSlice';

export function Contact() {
  const [createContact] = useCreateContactMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleContact = async (data) => {
    try {
      const { email, text } = data;
      const res = await createContact({ email, text });
      reset();
      toast.success('message sent');
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className='my-6'>
      <div className='grid md:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md text-[#333] font-[sans-serif]'>
        <div>
          <h1 className='text-xl md:text-3xl text-orange-400 font-extrabold'>
            Lets Talk
          </h1>
          <p className='text-sm text-gray-400 mt-3'>
            Have some big idea or brand to develop and need help? Then reach out
            wed love to hear about your project and provide help.
          </p>
          <div className='mt-2 '>
            <iframe
              title='ifr'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.613325495341!2d92.36919177515256!3d24.87705277791846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3751d30030cb76a7%3A0xee4b404d9f1d4311!2sZakiganj%20Bus%20Stand!5e0!3m2!1sen!2sbd!4v1705674538433!5m2!1sen!2sbd'
              className=' w-[270px] md:w-[380px] md:h-[250px] h-[200px] border border-orange-400 mx-auto'
              allowFullScreen=''
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(handleContact)}
          className=' mx-auto space-y-4'
        >
          <div>
            <label className='text-orange-400 font-bold' htmlFor='email'>
              Enter Your Email:-
            </label>
            <input
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
              placeholder='email...'
              className='w-full  rounded-md py-2.5 px-4 border text-sm border-orange-300'
            />
            {errors.email && (
              <p className=' text-red-600 text-center'>
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className='text-orange-400 font-bold' htmlFor='text'>
              Write Your Own:-
            </label>
            <textarea
              placeholder='text...'
              name='text'
              {...register('text', {
                required: 'text requered',
              })}
              rows={5}
              className='w-full rounded-md px-4 border text-sm pt-2.5 border-orange-300'
              defaultValue={''}
            />
            {errors.text && (
              <p className=' text-red-600 text-center'>{errors.text.message}</p>
            )}
          </div>
          <button
            type='submit'
            className='text-white  bg-gradient-to-r from-orange-200 to-orange-500 hover:bg-orange-600 font-semibold rounded-full text-sm px-4 py-2.5 w-full'
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
