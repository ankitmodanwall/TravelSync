'use client';

import { useState } from 'react';
import { SuggestionCard } from '@/components/discover/suggestion-card';
import { SuggestionDetailsDialog } from '@/components/discover/suggestion-details-dialog';
import { travelSuggestions } from '@/lib/suggestions';
import type { TravelSuggestion } from '@/lib/suggestions';

export default function DiscoverPage() {
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
      <div className="space-y-1">
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
          Discover New Adventures
        </h1>
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
