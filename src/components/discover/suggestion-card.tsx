import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { TravelSuggestion } from '@/lib/suggestions';

interface SuggestionCardProps {
  suggestion: TravelSuggestion;
  onOpen: () => void;
}

export function SuggestionCard({ suggestion, onOpen }: SuggestionCardProps) {
  return (
    <Card
      className="group block cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onClick={onOpen}
    >
      <div className="relative h-64 w-full">
        <Image
          src={suggestion.imageUrl}
          alt={suggestion.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={suggestion.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="font-headline text-2xl font-bold text-white">
            {suggestion.title}
          </h3>
          <p className="text-sm text-white/90">{suggestion.country}</p>
        </div>
      </div>
    </Card>
  );
}
