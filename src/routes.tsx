import App from '@/App';
import { PATHS } from '@/constants/paths';
import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/dashboardLayout';
import RootLayout from './layouts/RootLayout';
import Login from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';
import NewClothing from './pages/NewClothing';
import Profile from './pages/Profile';
import Wardrobe from './pages/Wardrobe';

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
          {
            path: PATHS.Wardrobe,
            element: <Wardrobe />,
          },
          {
            path: PATHS.NewClothing,
            element: <NewClothing />,
          },
        ],
      },
    ],
  },
]);
