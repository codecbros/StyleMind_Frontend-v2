import App from '@/App';
import { PATHS } from '@/constants/paths';
import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from './layouts/authLayout';
import DashboardLayout from './layouts/dashboardLayout';
import RootLayout from './layouts/RootLayout';
import Login from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import Profile from './pages/profile';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: PATHS.Home,
        element: <App />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: PATHS.Login,
            element: <Login />,
          },
          {
            path: PATHS.Register,
            element: <RegisterPage />,
          },
        ],
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: PATHS.Profile,
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);
