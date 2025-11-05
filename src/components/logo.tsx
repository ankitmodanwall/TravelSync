'use client';

import { Plane } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({
  className,
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <Link
      href="/dashboard"
      className={cn('group flex items-center gap-2', className)}
    >
      <div className="rounded-full bg-primary/20 p-2 transition-colors group-hover:bg-primary/30">
        <Plane className="h-5 w-5 text-primary-foreground" />
      </div>
      <span
        className={cn(
          'text-xl font-bold tracking-wider text-foreground transition-all font-headline',
          !showText && 'sr-only opacity-0'
        )}
      >
        TravelSync
      </span>
    </Link>
  );
}
