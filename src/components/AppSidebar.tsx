import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { wardrobe } from '@lucide/lab';
import { Icon, LogOut, Shirt, SquarePlus, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { COOKIE_KEYS } from '../constants/cookies';
import { PATHS } from '../constants/paths';
import { removeCookie } from '../lib/auth-cookies';
import { ErrorToast, SuccessToast } from '../lib/toast';

// Menu items.
const items = [
  {
    title: 'Crear Outfit',
    url: PATHS.Outfits,
    icon: Shirt,
  },
  {
    title: 'Armario',
    url: PATHS.Wardrobe,
    icon: (props: any) => <Icon iconNode={wardrobe} {...props} />,
  },
  {
    title: 'Nueva Prenda',
    url: PATHS.NewClothing,
    icon: SquarePlus,
  },
  {
    title: 'Perfil',
    url: PATHS.Profile,
    icon: User,
  },
];

//TODO: implementar cambio de tema
export function AppSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleClickLogout = () => {
    try {
      removeCookie(COOKIE_KEYS.AUTH_TOKEN);

      SuccessToast({
        title: 'Sesión cerrada',
        description: 'Has cerrado sesión exitosamente.',
      });
      navigate(PATHS.Login, { replace: true });
    } catch {
      ErrorToast({
        title: 'Error',
        description: 'Error al cerrar la sesión. Inténtalo de nuevo.',
      });
    }
  };

  return (
    <>
      <Sidebar collapsible="icon" side={isMobile ? 'right' : 'left'}>
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="flex items-center gap-2 px-2 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Shirt className="h-5 w-5" />
            </div>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="text-lg font-bold">StyleMind</span>
              <span className="text-xs text-muted-foreground">
                Tu asistente de moda
              </span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navegación</SidebarGroupLabel>
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

        <SidebarFooter className="border-t border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setLogoutDialogOpen(true)}
                className="cursor-pointer hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-colors"
                tooltip="Cerrar sesión"
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar sesión</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas cerrar sesión? Tendrás que iniciar
              sesión nuevamente para acceder a tu cuenta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClickLogout}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/80 cursor-pointer"
            >
              Cerrar sesión
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
