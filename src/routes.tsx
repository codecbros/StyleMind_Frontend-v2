import { PATHS } from '@/constants/paths';
import { createBrowserRouter } from 'react-router-dom';
import GuestRoute from './components/auth/GuestRoute';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import RootLayout from './layouts/RootLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import HomePage from './pages/Home';
import NewClothing from './pages/NewClothing';
import NewOutfit from './pages/NewOutfit';
import Outfits from './pages/Outfits';
import Profile from './pages/Profile';
import Wardrobe from './pages/Wardrobe';

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
                path: PATHS.NewOutfit,
                element: <NewOutfit />,
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
