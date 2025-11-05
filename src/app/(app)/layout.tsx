'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import AppSidebar from '@/components/app-sidebar';
import Header from '@/components/header';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';

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
          <Sheet>
            <Header>
              <SidebarTrigger className="md:hidden" />
            </Header>
            <Sidebar>
              <AppSidebar />
            </Sidebar>
            <SheetContent
              side="left"
              className="w-[280px] p-0 border-r border-sidebar-border bg-sidebar/70 backdrop-blur-xl md:hidden"
            >
              <SheetTitle className="sr-only">Sidebar Menu</SheetTitle>
              <AppSidebar />
            </SheetContent>
          </Sheet>
          <SidebarInset>
            <main className="p-6 lg:p-8">{children}</main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
