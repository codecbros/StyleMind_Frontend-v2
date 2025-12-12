import { Outlet, useLocation } from 'react-router-dom';
import MainHeader from '../components/MainHeader';

export default function RootLayout() {
  const location = useLocation();
  const showMainNav = ['/', '/login', '/register'].includes(location.pathname);

  return (
    <div className="antialiased scroll-smooth bg-[#F0F5F9] dark:bg-background min-h-screen">
      {showMainNav && <MainHeader />}
      <main className={`${showMainNav ? 'container mx-auto px-4' : ''}`}>
        <Outlet />
      </main>
    </div>
  );
}
