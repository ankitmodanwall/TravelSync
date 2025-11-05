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
  Globe,
} from 'lucide-react';
import { Logo } from './logo';
import { usePathname } from 'next/navigation';
import { UserNav } from './user-nav';
import { useAuth } from '@/context/auth-context';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export default function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { isOpen } = useSidebar();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  
  useEffect(() => {
    // Optional: You might want to set the document's lang attribute
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const isActive = (path: string) => pathname === path || (path.length > 1 && pathname.startsWith(path));

  return (
    <>
      <SidebarHeader>
        <Logo showText={isOpen} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
             <Link href="/dashboard" className="w-full">
                <SidebarMenuButton
                isActive={isActive('/dashboard')}
                tooltip={t('dashboard')}
                >
                <Home />
                <span>{t('dashboard')}</span>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/trips/new" className="w-full">
                <SidebarMenuButton
                isActive={isActive('/trips/new')}
                tooltip={t('createTrip')}
                >
                <PlusCircle />
                <span>{t('createTrip')}</span>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/budget" className="w-full">
                <SidebarMenuButton
                isActive={isActive('/budget')}
                tooltip={t('budget')}
                >
                <Landmark />
                <span>{t('budget')}</span>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/notifications" className="w-full">
                <SidebarMenuButton
                isActive={isActive('/notifications')}
                tooltip={t('notifications')}
                >
                <Bell />
                <span>{t('notifications')}</span>
                {isOpen && <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-red-500/30 text-xs text-red-400">3</span>}
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-4">
        {isOpen ? (
            <div className="px-4">
              <Select defaultValue={i18n.language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-full">
                  <div className='flex items-center gap-2'>
                    <Globe className='h-4 w-4'/>
                    <SelectValue placeholder={t('language')} />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="hi">हिन्दी</SelectItem>
                </SelectContent>
              </Select>
            </div>
        ) : (
          <div className='px-2'>
            <Select defaultValue={i18n.language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-full justify-center px-2">
                 <SelectValue>
                    <Globe className='h-4 w-4' />
                 </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="hi">हिन्दी</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        <SidebarSeparator />
         <div className={cn("flex items-center", isOpen ? "justify-between" : "justify-center")}>
            {user ? <UserNav user={user} isSidebarOpen={isOpen} /> : null}
            {isOpen && (
              <div className="flex items-center gap-2">
                <Link href="/settings">
                    <SidebarMenuButton variant="ghost" size="icon" tooltip={t('settings')}>
                        <Settings className="h-5 w-5"/>
                    </SidebarMenuButton>
                </Link>
                <Link href="/help">
                  <SidebarMenuButton variant="ghost" size="icon" tooltip={t('help')}>
                      <HelpCircle className="h-5 w-5"/>
                  </SidebarMenuButton>
                </Link>
              </div>
            )}
         </div>
         {!isOpen && (
            <div className="flex flex-col gap-2 items-center">
              <Link href="/settings">
                <SidebarMenuButton variant="ghost" size="icon" tooltip={t('settings')}>
                    <Settings className="h-5 w-5"/>
                </SidebarMenuButton>
              </Link>
              <Link href="/help">
                <SidebarMenuButton variant="ghost" size="icon" tooltip={t('help')}>
                    <HelpCircle className="h-5 w-5"/>
                </SidebarMenuButton>
              </Link>
          </div>
         )}
      </SidebarFooter>
    </>
  );
}
