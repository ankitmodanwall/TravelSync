'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TripList } from '@/components/dashboard/trip-list';
import { Plus, Sparkles } from 'lucide-react';
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
    <div className="space-y-12">
      <div className="flex items-center justify-between animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-3xl font-headline font-bold md:text-4xl text-foreground">
            Your Trips
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Here are all your upcoming and past adventures. Ready to plan another one?
          </p>
        </div>
        <Button asChild className="hidden md:flex bg-gradient-to-r from-indigo-500 via-sky-400 to-cyan-300 text-white transition-all duration-300 ease-in-out hover:from-indigo-600 hover:to-cyan-400 hover:shadow-lg">
          <Link href="/trips/new">
            <Plus className="mr-2 h-4 w-4" />
            New Trip
          </Link>
        </Button>
      </div>
      <TripList />

      <Separator className="my-8 bg-border/50" />

      <div className="space-y-8">
        <div className="space-y-2 animate-fade-in">
          <h2 className="text-3xl font-headline font-bold md:text-4xl flex items-center gap-3">
             <Sparkles className="text-cyan-400"/>
            Discover New Adventures
          </h2>
          <p className="text-muted-foreground">
            Get inspired for your next trip with our curated destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {travelSuggestions.map((suggestion, i) => (
            <div key={suggestion.id} style={{ animationDelay: `${i * 100}ms`}} className="animate-fade-in-up opacity-0 fill-mode-forwards">
              <SuggestionCard
                suggestion={suggestion}
                onOpen={() => handleOpenDialog(suggestion)}
              />
            </div>
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
      
      {/* Floating Action Button for Mobile */}
      <Button asChild className="md:hidden fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white">
        <Link href="/trips/new">
          <Plus className="h-6 w-6"/>
        </Link>
      </Button>
    </div>
  );
}
