import { Fragment, useEffect, useState } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid';

// import { useSelector } from 'react-redux';
import {
  useAlljobQuery,
  useEmpltypeQuery,
  useLocationQuery,
  useSalaryQuery,
  useWorkexpQuery,
} from '../slices/jobSlice';
import { LIMIT_PER_PAGE } from '../app/common';
import { Link } from 'react-router-dom';

const Jb = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [searchJobs, setSearchJobs] = useState('');
  const [page, setPage] = useState(1);
  //   const { userInfo } = useSelector((state) => state.auth);
  const { data: categorie } = useEmpltypeQuery();
  const { data: location } = useLocationQuery();
  const { data: salary } = useSalaryQuery();
  const { data: workExp } = useWorkexpQuery();
  const { data: alljobs } = useAlljobQuery({
    _page: page,
    _limit: LIMIT_PER_PAGE,
    filter,
  });
  console.log({ alljobs: alljobs });

  useEffect(() => {
    setPage(1);
  }, [searchJobs, filter]);
  const totalPage = alljobs && Math.ceil(alljobs.totalItems / LIMIT_PER_PAGE);
  const filters = [
    {
      id: 'location',
      name: 'location',
      options: location,
    },
    {
      id: 'salary_from',
      name: 'salary_from',
      options: salary,
    },
    {
      id: 'Work experience',
      name: 'Work experience',
      options: workExp,
    },
  ];
  console.log({ filter: filter });
  const handlePage = (p) => {
    setPage(p);
  };
  const handleFilter = (e, section, option) => {
    setFilter({ [section.name]: option.label });
  };
  const handleSubCategories = (e, section) => {
    setFilter({ employment_type: section });
    console.log(section);
  };

  const handleJobTitle = () => {
    setFilter({ title: searchJobs });
  };
  return (
    <div>
      <div className=' bg-white'>
        {/* search part */}
        <div className='relative  overflow-hidden  py-16 sm:pt-24 sm:pb-12 lg:pt-32 lg:pb-16'>
          <div className='mx-auto max-w-7xl px-6 lg:px-16'>
            <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-1'>
              <div className='max-w-2xl lg:max-w-full '>
                <h2 className='text-3xl font-bold tracking-tight text-black sm:text-4xl'>
                  Find your <span className='text-orange-500'>new job</span>{' '}
                  today
                </h2>
                <p className='mt-4 leading-8 text-lg col-span-full  text-gray-600'>
                  Discover exciting career opportunities that match your skills
                  and passion.
                </p>
                <div className='mt-6 mx-auto  flex max-w-md gap-x-4'>
                  <input
                    id='title'
                    name='title'
                    type='text'
                    value={searchJobs}
                    required
                    className='min-w-0 border border-orange-400 flex-auto rounded-md  bg-white/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus-visible:border-orange-500 sm:text-sm sm:leading-6'
                    onChange={(e) => setSearchJobs(e.target.value)}
                    placeholder='Search any job by title...'
                  />
                  <button
                    className='flex-none rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500'
                    type='submit'
                    onClick={() => handleJobTitle()}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as='div'
              className='relative z-40 lg:hidden'
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter='transition-opacity ease-linear duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity ease-linear duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='fixed inset-0 bg-black bg-opacity-25' />
              </Transition.Child>

              <div className='fixed inset-0 z-40 flex'>
                <Transition.Child
                  as={Fragment}
                  enter='transition ease-in-out duration-300 transform'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transition ease-in-out duration-300 transform'
                  leaveFrom='translate-x-0'
                  leaveTo='translate-x-full'
                >
                  <Dialog.Panel className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl'>
                    <div className='flex items-center justify-between px-4'>
                      <h2 className='text-lg font-medium text-gray-900'>
                        Filters
                      </h2>
                      <button
                        type='button'
                        className='-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400'
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className='sr-only'>Close menu</span>
                        <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className='mt-4 border-t border-gray-200'>
                      <h3 className='sr-only'>Categories</h3>
                      <ul
                        role='list'
                        className='px-2 py-3 font-medium text-gray-900'
                      >
                        {categorie &&
                          categorie.map((category) => (
                            <li key={category.name}>
                              <a
                                href={category.href}
                                className='block px-2 py-3'
                              >
                                {category.name}
                              </a>
                            </li>
                          ))}
                      </ul>

                      {filters.map((section) => (
                        <Disclosure
                          as='div'
                          key={section.id}
                          className='border-t border-gray-200 px-4 py-6'
                        >
                          {({ open }) => (
                            <>
                              <h3 className='-mx-2 -my-3 flow-root'>
                                <Disclosure.Button className='flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500'>
                                  <span className='font-medium text-gray-900'>
                                    {section.name}
                                  </span>
                                  <span className='ml-6 flex items-center'>
                                    {open ? (
                                      <MinusIcon
                                        className='h-5 w-5'
                                        aria-hidden='true'
                                      />
                                    ) : (
                                      <PlusIcon
                                        className='h-5 w-5'
                                        aria-hidden='true'
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className='pt-6'>
                                <div className='space-y-6'>
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className='flex items-center'
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type='checkbox'
                                        defaultChecked={option.checked}
                                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className='ml-3 min-w-0 flex-1 text-gray-500'
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className='mx-auto max-w-7xl px-4 sm:px-10 lg:px-16'>
            {/* for small scree filters */}
            <div className='flex items-baseline justify-between  pb-6 pt-6'>
              <div className='flex items-center'>
                <Menu as='div' className='relative inline-block text-left'>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'></Menu.Items>
                  </Transition>
                </Menu>
                <button
                  type='button'
                  className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className='sr-only'>Filters</span>
                  <FunnelIcon className='h-5 w-5' aria-hidden='true' />
                </button>
              </div>
            </div>
            <section aria-labelledby='products-heading' className='pb-12 pt-6'>
              <h2 id='products-heading' className='sr-only'>
                Products
              </h2>

              <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
                {/* Filters */}
                <form className='hidden lg:block'>
                  <h3 className='sr-only'>Categories</h3>
                  <ul
                    role='list'
                    className='space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900'
                  >
                    {categorie &&
                      categorie.map((category) => (
                        <li
                          key={category.name}
                          onClick={(e) => handleSubCategories(e, category.name)}
                          className='hover:text-orange-500 cursor-pointer'
                        >
                          {category.name}
                        </li>
                      ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure
                      as='div'
                      key={section.id}
                      className='border-b border-gray-200 py-6'
                    >
                      {({ open }) => (
                        <>
                          <h3 className='-my-3 flow-root'>
                            <Disclosure.Button className='flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500'>
                              <span className='font-medium text-gray-900 capitalize'>
                                {`${
                                  section.name === 'salary_from'
                                    ? 'salary'
                                    : section.name
                                } `}
                              </span>
                              <span className='ml-6 flex items-center'>
                                {open ? (
                                  <MinusIcon
                                    className='h-5 w-5'
                                    aria-hidden='true'
                                  />
                                ) : (
                                  <PlusIcon
                                    className='h-5 w-5'
                                    aria-hidden='true'
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className='pt-6'>
                            <div className='space-y-4'>
                              {section.options &&
                                section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className='flex items-center'
                                  >
                                    <input
                                      onClick={(e) =>
                                        handleFilter(e, section, option)
                                      }
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={`${section.id}`}
                                      defaultValue={option.value}
                                      type='radio'
                                      defaultChecked={option.checked}
                                      className='h-4 w-4 circle border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                    />
                                    <label
                                      htmlFor={`filter-${section.id}-${optionIdx}`}
                                      className='ml-3 text-sm text-gray-600'
                                    >
                                      {`${
                                        section.name === 'salary_from'
                                          ? '<='
                                          : ''
                                      } ${option.label}${
                                        section.name === 'salary_from'
                                          ? 'tk'
                                          : ''
                                      }`}
                                    </label>
                                  </div>
                                ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>

                {/* Product grid */}
                <div className='lg:col-span-3'>
                  <div className='container px-5 pb-3 mx-auto'>
                    <div className='flex flex-wrap flex-col -m-4'>
                      {/*start here*/}

                      {alljobs && alljobs.data.length > 0 ? (
                        alljobs.data.map((jb, i) => {
                          return (
                            <div key={i} className='p-4 '>
                              <div className='h-full border-2 border-orange-200 border-opacity-60 rounded-lg overflow-hidden'>
                                <div className='w-full'>
                                  <div className='w-full flex p-2'>
                                    <div className='p-2 '>
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-10 text-orange-500 rounded-full overflow-hidden w-10'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                        strokeWidth={2}
                                      >
                                        <path
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                                        />
                                      </svg>
                                    </div>
                                    <div className='pl-2 pt-2 '>
                                      <p className='text-xs'>{jb.company}</p>
                                      <p className='font-bold capitalize'>
                                        {jb.title}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className='p-4 pt-0.5'>
                                  <div className='tracking-widest flex flex-wrap justify-between text-xs title-font text-gray-400 mb-1  capitalize '>
                                    <div className='flex flex-row gap-1 mx-2'>
                                      <span>
                                        <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          fill='none'
                                          viewBox='0 0 24 24'
                                          strokeWidth='1.5'
                                          stroke='currentColor'
                                          className='w-4 h-4'
                                        >
                                          <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                                          />
                                          <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
                                          />
                                        </svg>
                                      </span>
                                      <span>{jb.location}</span>
                                    </div>
                                    <div className='flex flex-row gap-1'>
                                      <span>
                                        <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          fill='none'
                                          viewBox='0 0 24 24'
                                          strokeWidth={1.5}
                                          stroke='currentColor'
                                          className='w-4 h-4'
                                        >
                                          <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                                          />
                                        </svg>
                                      </span>
                                      <span>{jb.salary_from} k</span>
                                    </div>
                                    <div className='flex flex-row gap-1'>
                                      <span>
                                        <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          fill='none'
                                          viewBox='0 0 24 24'
                                          strokeWidth={1.5}
                                          stroke='currentColor'
                                          className='w-4 h-4'
                                        >
                                          <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                                          />
                                        </svg>
                                      </span>
                                      <span>{jb.employment_type}</span>
                                    </div>
                                    <div className='flex flex-row gap-1'>
                                      <span>
                                        <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          fill='none'
                                          viewBox='0 0 24 24'
                                          strokeWidth={1.5}
                                          stroke='currentColor'
                                          className='w-4 h-4'
                                        >
                                          <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z'
                                          />
                                        </svg>
                                      </span>
                                      <span>{jb.application_deadline}</span>
                                    </div>
                                  </div>
                                  <h1 className='title-font text-lg font-medium text-gray-500 mb-3'>
                                    {jb.description}
                                  </h1>
                                  <div className='flex items-center flex-wrap '>
                                    <Link
                                      to={`/job-details/${jb._id}`}
                                      className='text-green-800  md:mb-2 lg:mb-0'
                                    >
                                      <p className='inline-flex items-center hover:text-orange-300'>
                                        Read More
                                        <svg
                                          className='w-4 h-4 ml-2'
                                          viewBox='0 0 24 24'
                                          stroke='currentColor'
                                          strokeWidth={2}
                                          fill='none'
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                        >
                                          <path d='M5 12h14' />
                                          <path d='M12 5l7 7-7 7' />
                                        </svg>
                                      </p>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p>no jobs available</p>
                      )}
                      {/*End here*/}
                    </div>
                    {/* pagination start */}
                    <div className=' m-5 flex justify-center'>
                      <ul className='flex'>
                        <li
                          onClick={() => handlePage(page > 1 ? page - 1 : page)}
                          className='mx-1 hover:bg-orange-300 cursor-pointer flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300'
                          aria-label='Previous'
                        >
                          <span className='material-icons text-sm'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M15 19l-7-7 7-7'
                              />
                            </svg>
                          </span>
                        </li>

                        {alljobs &&
                          Array.from({ length: totalPage }).map((el, i) => (
                            <div key={i}>
                              <li
                                onClick={() => handlePage(i + 1)}
                                className={`mx-1 cursor-pointer flex h-9 w-9 items-center justify-center rounded-full ${
                                  page === i + 1
                                    ? ' bg-orange-500 text-white'
                                    : 'bg-white text-black'
                                }  p-0 text-sm  shadow-md transition duration-150 ease-in-out`}
                              >
                                {i + 1}
                              </li>
                            </div>
                          ))}

                        <li
                          onClick={() =>
                            handlePage(page < totalPage ? page + 1 : page)
                          }
                          className='mx-1 flex cursor-pointer hover:bg-orange-300 h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300'
                          aria-label='Next'
                        >
                          <span className='material-icons text-sm'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M9 5l7 7-7 7'
                              />
                            </svg>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jb;
