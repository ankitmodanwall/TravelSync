'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
  Sheet,
} from '@/components/ui/sidebar';
import AppSidebar from '@/components/app-sidebar';
import Header from '@/components/header';
import { PanelLeft } from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div
        className="min-h-screen w-full bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('/background-gradient.png')`,
        }}
      >
        <div className="min-h-screen w-full bg-gradient-to-br from-background/80 via-background/60 to-background/80">
          <Sheet>
            <Header>
              <SidebarTrigger>
                 <PanelLeft />
              </SidebarTrigger>
            </Header>
            <Sidebar>
              <AppSidebar />
            </Sidebar>
          </Sheet>
          <SidebarInset>
            <main className="p-6 lg:p-8">{children}</main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
