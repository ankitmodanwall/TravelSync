import { Button } from '@/components/ui/button';
import { TripList } from '@/components/dashboard/trip-list';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-headline font-bold">
            Your Trips
          </h1>
          <p className="text-muted-foreground">
            Here are all your upcoming and past adventures.
          </p>
        </div>
        <Button asChild>
          <Link href="/trips/new">
            <PlusCircle />
            New Trip
          </Link>
        </Button>
      </div>
      <TripList />
    </div>
  );
}
