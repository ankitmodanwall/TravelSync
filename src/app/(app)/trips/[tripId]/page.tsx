'use client';

import { useParams } from 'next/navigation';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { Trip } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';

function TripDetailSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-60 w-full rounded-xl" />
      <div className="space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    </div>
  );
}

export default function TripDetailPage() {
  const params = useParams();
  const tripId = params.tripId as string;
  const firestore = useFirestore();

  const tripRef = useMemoFirebase(
    () => (firestore && tripId ? doc(firestore, 'trips', tripId) : null),
    [firestore, tripId]
  );

  const { data: trip, isLoading } = useDoc<Trip>(tripRef);

  if (isLoading) {
    return <TripDetailSkeleton />;
  }

  if (!trip) {
    return <div>Trip not found.</div>;
  }
  
  const dateRange = trip.startDate && trip.endDate 
    ? `${format(trip.startDate.toDate(), 'MMMM dd, yyyy')} to ${format(trip.endDate.toDate(), 'MMMM dd, yyyy')}`
    : 'Date not set';

  return (
    <div className="mx-auto max-w-5xl">
      <div className="relative mb-8 h-80 w-full overflow-hidden rounded-2xl">
        <Image
          src={trip.imageUrl}
          alt={trip.name}
          fill
          className="object-cover"
          data-ai-hint={trip.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="font-headline text-5xl font-bold text-white">
            {trip.name}
          </h1>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center gap-6 text-lg text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <span>{trip.destination}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>{dateRange}</span>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <h2 className="mb-4 text-2xl font-headline font-semibold">
            Trip Itinerary
          </h2>
          <p className="text-muted-foreground">
            This is where your AI-generated itinerary and collaborative plans will appear. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
}
