'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TripList } from '@/components/dashboard/trip-list';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { SuggestionCard } from '@/components/discover/suggestion-card';
import { SuggestionDetailsDialog } from '@/components/discover/suggestion-details-dialog';
import { travelSuggestions } from '@/lib/suggestions';
import type { TravelSuggestion } from '@/lib/suggestions';
import { Separator } from '@/components/ui/separator';

export default function DashboardPage() {
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<TravelSuggestion | null>(null);

  const handleOpenDialog = (suggestion: TravelSuggestion) => {
    setSelectedSuggestion(suggestion);
  };

  const handleCloseDialog = () => {
    setSelectedSuggestion(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold md:text-4xl">
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

      <Separator className="my-8" />

      <div className="space-y-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-headline font-bold md:text-4xl">
            Discover New Adventures
          </h2>
          <p className="text-muted-foreground">
            Get inspired for your next trip with our curated destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {travelSuggestions.map(suggestion => (
            <SuggestionCard
              key={suggestion.id}
              suggestion={suggestion}
              onOpen={() => handleOpenDialog(suggestion)}
            />
          ))}
        </div>
      </div>

      {selectedSuggestion && (
        <SuggestionDetailsDialog
          suggestion={selectedSuggestion}
          isOpen={!!selectedSuggestion}
          onClose={handleCloseDialog}
        />
      )}
    </div>
  );
}
