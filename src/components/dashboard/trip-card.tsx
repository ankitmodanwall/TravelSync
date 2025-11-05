import type { Trip } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MapPin } from 'lucide-react';
import Link from 'next/link';

export function TripCard({ trip }: { trip: Trip }) {
  const displayedCollaborators = trip.collaborators.slice(0, 3);
  const remainingCollaborators = trip.collaborators.length - displayedCollaborators.length;

  return (
    <Link href={`/trips/${trip.id}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={trip.imageUrl}
              alt={trip.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={trip.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-headline text-xl font-semibold mb-1 truncate group-hover:text-accent">
            {trip.title}
          </h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4 shrink-0" />
            <span>{trip.destination}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 pt-0">
          <div className="text-sm text-muted-foreground">{trip.dateRange}</div>
          <div className="flex items-center -space-x-2">
            <TooltipProvider>
              {displayedCollaborators.map(c => (
                <Tooltip key={c.id}>
                  <TooltipTrigger asChild>
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage src={c.avatarUrl} alt={c.name} />
                      <AvatarFallback>{c.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{c.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
            {remainingCollaborators > 0 && (
              <Avatar className="h-8 w-8 border-2 border-background">
                <AvatarFallback>+{remainingCollaborators}</AvatarFallback>
              </Avatar>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
