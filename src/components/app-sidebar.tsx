'use client';
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  Bell,
  Home,
  Settings,
  PlusCircle,
  HelpCircle,
  Landmark,
} from 'lucide-react';
import { Logo } from './logo';
import { usePathname } from 'next/navigation';
import { UserNav } from './user-nav';
import { useAuth } from '@/context/auth-context';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export default function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { isOpen } = useSidebar();
  
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <SidebarHeader>
        <Logo showText={isOpen} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              href="/dashboard"
              isActive={isActive('/dashboard')}
              tooltip="Dashboard"
            >
              <Home />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              href="/trips/new"
              isActive={isActive('/trips/new')}
              tooltip="New Trip"
            >
              <PlusCircle />
              <span>Create Trip</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              href="/budget"
              isActive={isActive('/budget')}
              tooltip="Budget"
            >
              <Landmark />
              <span>Budget</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              href="/notifications"
              isActive={isActive('/notifications')}
              tooltip="Notifications"
            >
              <Bell />
              <span>Notifications</span>
              {isOpen && <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-red-500/30 text-xs text-red-400">3</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-4">
        <SidebarSeparator />
         <div className={cn("flex items-center", isOpen ? "justify-between" : "justify-center")}>
            {user && (isOpen || !user.name) ? <UserNav /> : null}
            {isOpen && (
              <div className="flex items-center gap-2">
                  <SidebarMenuButton href="/settings" isActive={isActive('/settings')} variant="ghost" size="icon" tooltip="Settings">
                      <Settings className="h-5 w-5"/>
                  </SidebarMenuButton>
                  <SidebarMenuButton href="/help" isActive={isActive('/help')} variant="ghost" size="icon" tooltip="Help">
                      <HelpCircle className="h-5 w-5"/>
                  </SidebarMenuButton>
              </div>
            )}
         </div>
         {!isOpen && (
            <div className="flex flex-col gap-2 items-center">
              <SidebarMenuButton href="/settings" isActive={isActive('/settings')} variant="ghost" size="icon" tooltip="Settings">
                  <Settings className="h-5 w-5"/>
              </SidebarMenuButton>
              <SidebarMenuButton href="/help" isActive={isActive('/help')} variant="ghost" size="icon" tooltip="Help">
                  <HelpCircle className="h-5 w-5"/>
              </SidebarMenuButton>
          </div>
         )}
      </SidebarFooter>
    </>
  );
}
