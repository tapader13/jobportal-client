import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Registration from './features/auth/components/Registration';
import Login from './features/auth/components/Login';
import JobPage from './pages/JobPage';
import HJ from './features/jobs/HJ';
import ContactPage from './pages/ContactPage';
import JobListingPage from './pages/JobListingPage';
import Protected from './features/auth/components/Protected';

const router = createBrowserRouter([
  {
    path: '/registration',
    element: <Registration />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/hj',
    element: <HJ />,
  },
  {
    path: '/job-listing',
    element: (
      <Protected>
        <JobListingPage />
      </Protected>
    ),
  },
  {
    path: '/',
    element: <JobPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
