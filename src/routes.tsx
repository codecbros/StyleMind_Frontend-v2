import App from '@/App';
import { PATHS } from '@/constants/paths';
import RegisterPage from '@/pages/auth/register';
import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from './layouts/authLayout';
import RootLayout from './layouts/RootLayout';
import Login from './pages/auth/login';

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
    ],
  },
]);
