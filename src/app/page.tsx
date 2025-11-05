'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { placeholderImages } from '@/lib/placeholder-images';

export default function WelcomePage() {
  const welcomeHeroImage = placeholderImages.find(p => p.id === 'welcome-hero');

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background">
      {welcomeHeroImage && (
        <Image
          src={welcomeHeroImage.imageUrl}
          alt={welcomeHeroImage.description}
          fill
          className="object-cover brightness-[0.4]"
          data-ai-hint={welcomeHeroImage.imageHint}
        />
      )}
      <div className="relative z-10 mx-auto grid w-[450px] gap-8 text-center text-white">
        <div className="flex justify-center">
          <Logo className="[&>span]:text-white" />
        </div>
        <div className="grid gap-4 animate-fade-in animation-delay-200">
          <h1 className="text-4xl md:text-5xl font-bold font-headline leading-tight">
            Craft Your Next Adventure
          </h1>
          <p className="text-balance text-lg text-white/80">
            Our AI-powered planner helps you build the perfect itinerary, discover hidden gems, and collaborate with friends. Effortless planning, unforgettable journeys.
          </p>
        </div>
        <div className="flex flex-col gap-4 mx-auto w-full max-w-sm animate-fade-in-up animation-delay-400">
          <Button asChild size="lg" className="w-full text-lg">
            <Link href="/signup">Start Planning with AI ✈️</Link>
          </Button>
          <Button asChild variant="link" size="lg" className="w-full text-white/90 hover:text-white">
            <Link href="/login">Already have an account? Log In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
