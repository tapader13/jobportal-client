import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useJobdetailsQuery } from '../slices/jobSlice';

export default function JobDetails() {
  const params = useParams();

  const handleApply = () => {
    toast('Apply Done!!!', { position: 'top-center' });
  };
  const { data, error, isLoading } = useJobdetailsQuery(params.id);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading job details</div>;
  console.log(data);
  const job = data ? data[0] : {};
  return (
    <div className='bg-white'>
      {data && (
        <div className='pt-6'>
          {/* Product info */}
          <div className='mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16'>
            <div className='lg:col-span-2 lg:pr-8'>
              <h1 className='text-2xl capitalize font-bold tracking-tight text-gray-900 sm:text-3xl'>
                {job?.title}
              </h1>
            </div>

            {/* Options */}
            <div className='mt-4 lg:row-span-3 lg:mt-0'>
              <h2 className='sr-only'>Product information</h2>
            </div>

            <div className='py-10 lg:col-span-3 lg:col-start-1  lg:pb-16 lg:pr-8 lg:pt-6'>
              {/* Description and details */}
              <div>
                <h3 className='sr-only'>Description</h3>

                <div className='space-y-6'>
                  <p className='text-base text-gray-900'>{job?.description}</p>
                </div>
              </div>

              <div className='mt-10'>
                <h3 className='text-sm font-medium text-gray-900'>
                  Highlights
                </h3>

                <div className='mt-4'>
                  <ul role='list' className='list-disc space-y-2 pl-4 text-sm'>
                    <li className='text-gray-400'>
                      <span className='text-gray-600'>
                        Company: {job?.company}
                      </span>
                    </li>
                    <li className='text-gray-400'>
                      <span className='text-gray-600'>
                        Location: {job?.location}
                      </span>
                    </li>
                    <li className='text-gray-400'>
                      <span className='text-gray-600'>
                        Salary: ${job?.salary_from} - ${job?.salary_to}
                      </span>
                    </li>
                    <li className='text-gray-400'>
                      <span className='text-gray-600'>
                        Job_category: {job?.job_category}
                      </span>
                    </li>
                    <li className='text-gray-400'>
                      <span className='text-gray-600'>
                        Created_at: {job?.created_at}
                      </span>
                    </li>
                    <li className='text-gray-400'>
                      <span className='text-gray-600'>
                        Application_deadline: {job?.application_deadline}
                      </span>
                    </li>
                    <li className='text-gray-400'>
                      <span className='text-gray-600'>
                        Workexperience: {job?.Workexperience}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Job Facilities Detailed Summary */}
              <div className='mt-10'>
                <h3 className='text-sm font-medium text-gray-900'>
                  Job Facilities
                </h3>

                <h4 className='mt-4 leading-7 text-gray-900'>
                  This exciting opportunity at {job?.company}, located in{' '}
                  {job?.location}, provides a competitive salary ranging from $
                  {job?.salary_from} to ${job?.salary_to}. The job falls under
                  the category of {job?.job_category} and is ideal for
                  individuals
                  {/* with a passion for {job?.job_category.toLowerCase()}. */}
                  <br />
                  Applicants can look forward to a collaborative work
                  environment, with a focus on innovation and growth. The
                  company values a diverse workforce and encourages individuals
                  from all backgrounds to apply. The application deadline is{' '}
                  {job?.application_deadline}, so ensure your application is
                  submitted on time.
                  <br />
                  Successful candidates will be required to have{' '}
                  {job?.Workexperience} of work experience in a related field.
                  The position offers{' '}
                  {job?.is_remote_work ? 'remote work' : 'on-site work'},
                  providing flexibility for individuals looking to balance work
                  and life.
                  <br />
                  Dont miss this exciting opportunity to join {job?.company} and
                  contribute to their dynamic team. Apply now and take the next
                  step in your career!
                </h4>
              </div>
              <div className='mt-5'>
                <button
                  onClick={() => handleApply()}
                  className='bg-orange-400 p-2 rounded-md'
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
