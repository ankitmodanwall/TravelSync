import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { TravelSuggestion } from '@/lib/suggestions';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface SuggestionDetailsDialogProps {
  suggestion: TravelSuggestion;
  isOpen: boolean;
  onClose: () => void;
}

export function SuggestionDetailsDialog({
  suggestion,
  isOpen,
  onClose,
}: SuggestionDetailsDialogProps) {
  const router = useRouter();

  const handleCreateTrip = () => {
    // Navigate to the new trip page with the destination pre-filled
    router.push(`/trips/new?destination=${encodeURIComponent(suggestion.title)}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="relative h-80 w-full">
            <Image
              src={suggestion.imageUrl}
              alt={suggestion.title}
              fill
              className="object-cover"
              data-ai-hint={suggestion.imageHint}
            />
          </div>
          <div className="p-6">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-4xl font-headline font-bold">
                {suggestion.title}
              </DialogTitle>
              <DialogDescription className="text-lg">
                {suggestion.country}
              </DialogDescription>
            </DialogHeader>

            <div className="prose prose-stone dark:prose-invert max-w-none">
              <h3 className="font-headline text-xl font-semibold">
                Why You Should Visit
              </h3>
              <p>{suggestion.description}</p>

              <h3 className="font-headline text-xl font-semibold">
                Top Things to Do
              </h3>
              <ul>
                {suggestion.topAttractions.map((attraction, index) => (
                  <li key={index}>{attraction}</li>
                ))}
              </ul>

              <h3 className="font-headline text-xl font-semibold">
                Best Time to Visit
              </h3>
              <p>{suggestion.bestTimeToVisit}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={handleCreateTrip} size="lg">
                Plan a Trip to {suggestion.title}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
