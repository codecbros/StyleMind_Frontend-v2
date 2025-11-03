import App from '@/App';
import { PATHS } from '@/constants/paths';
import RegisterPage from '@/pages/auth/register';
import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/auth/login';

export const router = createBrowserRouter([
  {
    path: PATHS.Home,
    element: <App />,
  },
  {
    path: PATHS.Login,
    element: <Login />,
  },
  {
    path: PATHS.Register,
    element: <RegisterPage />,
  },
]);
