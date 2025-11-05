import type { Trip } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export function TripCard({ trip }: { trip: Trip }) {

  const dateRange = trip.startDate && trip.endDate 
    ? `${format(trip.startDate.toDate(), 'LLL dd')} - ${format(trip.endDate.toDate(), 'dd, yyyy')}`
    : 'Date not set';

  return (
    <Link href={`/trips/${trip.id}`} className="group block animate-fade-in-up">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out bg-card backdrop-blur-sm hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={trip.imageUrl || 'https://picsum.photos/seed/default/600/400'}
              alt={trip.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={trip.imageHint}
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-headline text-xl font-semibold mb-1 truncate group-hover:text-primary text-card-foreground">
            {trip.name}
          </h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4 shrink-0" />
            <span>{trip.destination}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 pt-0">
          <div className="text-sm text-muted-foreground">{dateRange}</div>
        </CardFooter>
      </Card>
    </Link>
  );
}
