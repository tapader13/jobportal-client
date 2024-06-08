import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import JbPage from './pages/JbPage';
import Login from './components/Login';
import { Registration } from './components/Registration';
import ContactPage from './pages/ContactPage';
import JobListingPage from './pages/JobListingPage';
import { Protected } from './components/Protected';
import JobPostPage from './pages/JobPostPage';
import JobDetailsPage from './pages/JobDetailsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <JbPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/job-details/:id',
    element: <JobDetailsPage />,
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
    path: '/post-job',
    element: (
      <Protected>
        <JobPostPage />
      </Protected>
    ),
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
