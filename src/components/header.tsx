import { SidebarTrigger } from './ui/sidebar';
import { UserNav } from './user-nav';
import { Logo } from './logo';
import Link from 'next/link';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  return (
    <header
      className={cn(
        'sticky top-0 z-10 flex h-16 items-center gap-4 border-b px-4 backdrop-blur-sm md:px-6',
        'border-border/50 bg-background/5'
      )}
    >
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="hidden items-center gap-4 md:flex">
        <SidebarTrigger />
        <Logo />
      </div>
      <div className="flex w-full items-center justify-end gap-4">
        <Button
          asChild
          size="sm"
          className="bg-gradient-to-r from-indigo-500 via-sky-400 to-cyan-300 text-white transition-all duration-300 ease-in-out hover:from-indigo-600 hover:to-cyan-400 hover:shadow-lg"
        >
          <Link href="/trips/new">
            <Plus className="h-4 w-4 sm:hidden" />
            <span className="hidden sm:inline">New Trip</span>
          </Link>
        </Button>
        <UserNav />
      </div>
    </header>
  );
}
