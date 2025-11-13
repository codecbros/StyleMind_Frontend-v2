import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from '../components/AppSidebar';

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-1 flex-col gap-2 md:gap-4 p-5">
        <SidebarTrigger />
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
