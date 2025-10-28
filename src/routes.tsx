import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '@/pages/auth/login'
import RegisterPage from '@/pages/auth/register'
import App from '@/App'
import { PATHS } from '@/constants/paths'

export const router = createBrowserRouter([
    {
        path: PATHS.Home,
        element: <App />,
    },
    {
        path: PATHS.Login,
        element: <LoginPage />,
    },
    {
        path: PATHS.Register,
        element: <RegisterPage />,
    },
])
