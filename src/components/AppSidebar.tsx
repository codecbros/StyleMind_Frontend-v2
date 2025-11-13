import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { LogOut, Shirt, SquarePlus, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ErrorToast, SuccessToast } from '../lib/toast';

// Menu items.
const items = [
  {
    title: 'Perfil',
    url: '/dashboard/perfil',
    icon: User,
  },
  {
    title: 'Armario',
    url: '/dashboard/armario',
    icon: Shirt,
  },
  {
    title: 'Nueva Prenda',
    url: '/dashboard/armario/nueva-prenda',
    icon: SquarePlus,
  },
];

//TODO: Añadir funcionalidad de cerrar sesión.

export function AppSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isMobile = useIsMobile();

  const handleClickLogout = () => {
    try {
      SuccessToast({
        title: 'Sesión cerrada',
        description: 'Has cerrado sesión exitosamente.',
      });
      navigate('/');
    } catch {
      ErrorToast({
        title: 'Error',
        description: 'Error al cerrar la sesión. Inténtalo de nuevo.',
      });
    }
  };

  return (
    <Sidebar collapsible="icon" side={isMobile ? 'right' : 'left'}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>StyleMind</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton onClick={handleClickLogout}>
          <LogOut />
          <span>Cerrar sesión</span>
        </SidebarMenuButton>
        {/* Toggle theme button*/}
      </SidebarFooter>
    </Sidebar>
  );
}
