'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { Card, CardContent } from '@/components/ui/card';
import { Itinerary, Map, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const previewCards = [
  {
    icon: <Itinerary className="w-8 h-8 text-blue-400" />,
    title: 'Itinerary',
    description: 'Day 1: Eiffel Tower, Louvre',
    rotation: '-rotate-6',
    className: 'animate-fade-in-up'
  },
  {
    icon: <Map className="w-8 h-8 text-green-400" />,
    title: 'Map View',
    description: 'Louvre to Notre Dame: 15 min walk',
    rotation: 'rotate-2',
    className: 'animate-fade-in-up animation-delay-200'
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-purple-400" />,
    title: 'Team Chat',
    description: 'Alice: "Let\'s get pastries!"',
    rotation: 'rotate-12',
    className: 'animate-fade-in-up animation-delay-400'
  },
];

export default function WelcomePage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[450px] gap-8 text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="grid gap-4 animate-fade-in animation-delay-200">
            <h1 className="text-4xl md:text-5xl font-bold font-headline leading-tight">
              Craft Your Next Adventure
            </h1>
            <p className="text-balance text-muted-foreground text-lg">
              Our AI-powered planner helps you build the perfect itinerary, discover hidden gems, and collaborate with friends. Effortless planning, unforgettable journeys.
            </p>
          </div>
          <div className="flex flex-col gap-4 mx-auto w-full max-w-sm animate-fade-in-up animation-delay-400">
            <Button asChild size="lg" className="w-full text-lg">
              <Link href="/signup">Start Planning with AI ✈️</Link>
            </Button>
            <Button asChild variant="link" size="lg" className="w-full">
              <Link href="/login">Already have an account? Log In</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:flex items-center justify-center relative overflow-hidden">
        <div className="relative w-full max-w-lg h-full flex items-center justify-center">
           <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            {previewCards.map((card, index) => (
              <Card
                key={index}
                className={cn(
                  'absolute w-64 p-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm shadow-2xl transition-transform duration-500 hover:scale-105 hover:!rotate-0',
                  card.rotation,
                  card.className
                )}
                style={{
                  transformOrigin: 'center center',
                  animationFillMode: 'forwards',
                  opacity: 0,
                }}
              >
                <CardContent className="flex flex-col items-center justify-center text-center gap-2 p-0">
                    <div className='p-3 bg-white/80 rounded-full shadow-inner'>
                        {card.icon}
                    </div>
                    <h3 className="font-bold text-lg">{card.title}</h3>
                    <p className="text-sm text-muted-foreground">{card.description}</p>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
