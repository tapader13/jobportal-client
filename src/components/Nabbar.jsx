import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeCredential } from '../slices/authSlice';
const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Job Listing', href: '/job-listing', current: false },
  { name: 'Post A Job', href: '/post-job', current: false },
  { name: 'Contact', href: '/contact', current: false },
  { name: 'Login', href: '/login', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Nabbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const updateNavigation = navigation.map((nav) => ({
    ...nav,
    current: location.pathname === nav.href,
  }));
  const handleHome = () => {
    navigate('/');
  };
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(removeCredential());
  };
  return (
    <Disclosure as='nav' className='  isolate bg-gray-100   shadow-lg'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-10 lg:px-16'>
            <div className=' relative flex h-16 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center md:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='absolute -inset-0.5' />
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>

              <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-around'>
                <div className='flex me-5 flex-shrink-0 items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-7 w-7 cursor-pointer text-orange-700'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                    onClick={() => handleHome()}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                <div className='hidden md:ml-6 md:block'>
                  <div className='flex '>
                    {updateNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        // href={item.href}
                        className={classNames(
                          item.current
                            ? `${
                                item.name === 'Login'
                                  ? 'bg-orange-500 text-white text-sm'
                                  : 'text-orange-500 text-xl'
                              } `
                            : `${
                                item.name === 'Login'
                                  ? 'bg-orange-500 text-white text-sm my-auto'
                                  : 'hover:text-orange-500  text-gray-700 text-xl'
                              } `,
                          'rounded-md px-5 py-2 uppercase text-sm font-bold'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  {/* ' ' */}
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {/* Profile dropdown */}
                <Menu as='div' className='relative ml-3'>
                  <div>
                    <Menu.Button className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                      <span className='absolute -inset-1.5' />
                      <span className='sr-only'>Open user menu</span>
                      <img
                        className='h-8 w-8 rounded-full'
                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        alt=''
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={handleLogout}
                            href='#'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className=' md:hidden flex '>
            <div className='space-y-1 px-2 pb-3 pt-2'>
              {updateNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  // href={item.href}
                  className={classNames(
                    item.current
                      ? `${
                          item.name === 'Login'
                            ? 'bg-orange-500 text-white text-sm'
                            : 'text-orange-500 text-xl'
                        } `
                      : `${
                          item.name === 'Login'
                            ? 'bg-orange-500 text-white text-sm my-auto'
                            : 'hover:text-orange-500  text-gray-700 text-xl'
                        } `,
                    'block rounded-md px-5 py-2 uppercase text-sm font-bold'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
