import { PATHS } from '@/constants/paths';
import { createBrowserRouter } from 'react-router-dom';
import GuestRoute from './components/auth/GuestRoute.tsx';
import ProtectedRoute from './components/auth/ProtectedRoute.tsx';
import AuthLayout from './layouts/AuthLayout.tsx';
import DashboardLayout from './layouts/dashboardLayout.tsx';
import RootLayout from './layouts/RootLayout.tsx';
import Login from './pages/auth/Login.tsx';
import Register from './pages/auth/Register.tsx';
import HomePage from './pages/Home.tsx';
import NewClothing from './pages/NewClothing.tsx';
import Outfits from './pages/Outfits.tsx';
import Profile from './pages/Profile.tsx';
import Wardrobe from './pages/Wardrobe.tsx';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: PATHS.Home,
        element: <HomePage />,
      },
      {
        element: <GuestRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              {
                path: PATHS.Login,
                element: <Login />,
              },
              {
                path: PATHS.Register,
                element: <Register />,
              },
            ],
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
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
              {
                path: PATHS.Outfits,
                element: <Outfits />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
