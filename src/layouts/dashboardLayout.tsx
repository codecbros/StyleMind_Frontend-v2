import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';
import { AppSidebar } from '../components/AppSidebar';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-1 flex-col gap-2 md:gap-4 p-5">
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  );
}
