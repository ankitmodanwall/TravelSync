'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { placeholderImages } from '@/lib/placeholder-images';

export default function WelcomePage() {
  const welcomeHeroImage = placeholderImages.find(p => p.id === 'welcome-hero');

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
      <div className="hidden bg-muted lg:block relative">
        {welcomeHeroImage && (
          <>
            <Image
              src={welcomeHeroImage.imageUrl}
              alt={welcomeHeroImage.description}
              fill
              className="object-cover"
              data-ai-hint={welcomeHeroImage.imageHint}
            />
             <div className="absolute inset-0 bg-gradient-to-l from-black/10 to-transparent" />
          </>
        )}
      </div>
    </div>
  );
}
