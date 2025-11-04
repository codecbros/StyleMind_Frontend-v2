import { Outlet, useLocation } from 'react-router-dom';

export default function RootLayout() {
  const location = useLocation();
  const showMainNav = ['/', '/login', '/register'].includes(location.pathname);

  return (
    <div className="antialiased scroll-smooth bg-[#F0F5F9] dark:bg-background min-h-screen">
      {showMainNav && (
        <header className="container mx-auto flex items-center justify-between p-4">
          {/* MainNav componente irá aquí */}
          <div className="text-xl font-bold">StyleMind</div>
          {/* ModeToggle irá aquí */}
          <div>{/* Toggle theme */}</div>
        </header>
      )}
      <main className={`${showMainNav ? 'container mx-auto px-4' : ''}`}>
        <Outlet />
      </main>
    </div>
  );
}
