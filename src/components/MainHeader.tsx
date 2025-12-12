import { Shirt } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { PATHS } from '../constants/paths';
import { Button } from './ui/button';

const MainHeader = () => {
  const location = useLocation();
  const fixedHeader = ['/'].includes(location.pathname);
  return (
    <header
      className={`${
        fixedHeader ? 'fixed top-0' : ''
      } z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:backdrop-blur`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to={PATHS.Home} className="flex items-center gap-2">
            <Shirt className="h-6 w-6 sm:h-7 sm:w-7" />
            <span className="text-xl sm:text-2xl font-bold">StyleMind</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link to={PATHS.Login}>Iniciar Sesión</Link>
            </Button>
            <Button asChild size="sm">
              <Link to={PATHS.Register}>Registrarse</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
