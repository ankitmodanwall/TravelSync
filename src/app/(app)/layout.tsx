'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import AppSidebar from '@/components/app-sidebar';
import Header from '@/components/header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div
        className="min-h-screen w-full bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1536734261439-80e38a023c8a?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-900/20 via-cyan-900/20 to-violet-900/20">
          <Header />
          <Sidebar>
            <AppSidebar />
          </Sidebar>
          <SidebarInset>
            <main className="p-6 lg:p-8">{children}</main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
