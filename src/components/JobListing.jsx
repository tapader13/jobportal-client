import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useJobuserQuery } from '../slices/jobSlice';

export function Joblisting() {
  const { data } = useJobuserQuery();

  useEffect(() => {
    if (data) {
      console.log('Data fetched:', data);
    }
  }, [data]);

  return (
    <>
      <div className='relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray- py-6 sm:py-12'>
        <div className='mx-auto max-w-screen-xl px-4 w-full'>
          <h2 className='mb-5  text-center font-bold text-2xl text-orange-600'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic,
            consequuntur.
          </h2>
          <div className='grid w-full sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
            {data &&
              data.map((jlist, i) => (
                <div
                  key={i}
                  className='relative border-orange-400 border flex flex-col shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-sm'
                >
                  <div className='h-auto px-3 pt-3 overflow-hidden'>
                    <p className='text-xl capitalize text-gray-400'>
                      {jlist.title}
                    </p>
                  </div>
                  <div className='bg-white py-4 px-3'>
                    <p className=' mb-2 font-medium'>
                      {jlist.description.slice(0, 130)}...
                    </p>
                    <div className='flex justify-between items-center'>
                      <h6 className=' text-gray-400'>
                        created_at: {jlist.created_at}
                      </h6>
                      <h6 className=' text-gray-400'>
                        application_deadline: {jlist.application_deadline}
                      </h6>
                      <div className='relative z-40 flex items-center gap-2'></div>
                    </div>
                  </div>
                  <div className='bg-white py-4 px-3'>
                    <Link className=' mb-2 p-1 rounded font-medium hover:bg-orange-400 hover:text-white'>
                      More...
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
