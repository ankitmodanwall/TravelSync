'use client';
import { useAuth } from '@/context/auth-context';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import AppSidebar from '@/components/app-sidebar';
import Header from '@/components/header';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { AuthRedirect } from '@/components/auth-redirect';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div
        className={cn(
          'min-h-screen w-full bg-cover bg-center bg-fixed',
          'bg-gradient-to-br from-indigo-100 via-sky-50 to-cyan-100',
          'dark:from-indigo-900/50 dark:via-sky-900/50 dark:to-cyan-900/50'
        )}
      >
        <Sidebar>
          <AppSidebar />
        </Sidebar>
        <SidebarInset>
          <Header />
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
