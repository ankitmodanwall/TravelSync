import { Plane } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/dashboard" className={cn("flex items-center gap-2 group", className)}>
      <div className="p-2 bg-primary/20 rounded-full group-hover:bg-primary/30 transition-colors">
        <Plane className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold font-headline tracking-wider text-foreground">
        TravelSync
      </span>
    </Link>
  );
}
