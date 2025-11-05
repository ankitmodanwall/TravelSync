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

export default function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              href="/dashboard"
              isActive={isActive('/dashboard')}
              tooltip="Dashboard"
            >
              <Home />
              Dashboard
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              href="/trips/new"
              isActive={isActive('/trips/new')}
              tooltip="New Trip"
            >
              <PlusCircle />
              Create Trip
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              href="/budget"
              isActive={isActive('/budget')}
              tooltip="Budget"
            >
              <Landmark />
              Budget
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              href="/notifications"
              isActive={isActive('/notifications')}
              tooltip="Notifications"
            >
              <Bell />
              Notifications
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="flex items-center justify-between p-3">
        {user && <UserNav />}
         <div className="flex-1" />
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton href="/settings" isActive={isActive('/settings')} variant="ghost" size="icon" tooltip="Settings">
                    <Settings />
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton href="/help" isActive={isActive('/help')} variant="ghost" size="icon" tooltip="Help">
                    <HelpCircle />
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
