import { SidebarTrigger } from './ui/sidebar';
import { UserNav } from './user-nav';
import { Logo } from './logo';
import Link from 'next/link';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="hidden md:block">
        <Logo />
      </div>
      <div className="flex w-full items-center justify-end gap-4">
        <Button asChild size="sm">
            <Link href="/trips/new">
                <Plus className="h-4 w-4 sm:hidden"/>
                <span className="hidden sm:inline">New Trip</span>
            </Link>
        </Button>
        <UserNav />
      </div>
    </header>
  );
}
