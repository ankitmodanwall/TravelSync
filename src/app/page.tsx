'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { placeholderImages } from '@/lib/placeholder-images';

export default function WelcomePage() {
  const loginHeroImage = placeholderImages.find(p => p.id === 'login-hero');

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[400px] gap-8 text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="grid gap-4">
            <h1 className="text-4xl md:text-5xl font-bold font-headline leading-tight">
              Plan Your Perfect Trip, Together.
            </h1>
            <p className="text-balance text-muted-foreground text-lg">
              TravelSync is the smart, collaborative way to plan your next
              adventure. Get AI-powered suggestions, build itineraries, and
              share plans with your friends, all in one place.
            </p>
          </div>
          <div className="flex flex-col gap-4 mx-auto w-full max-w-sm">
            <Button asChild size="lg" className="w-full">
              <Link href="/signup">Get Started - It&apos;s Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="/login">Already have an account? Log In</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        {loginHeroImage && (
          <Image
            src={loginHeroImage.imageUrl}
            alt={loginHeroImage.description}
            fill
            className="object-cover dark:brightness-[0.2] dark:grayscale"
            data-ai-hint={loginHeroImage.imageHint}
          />
        )}
      </div>
    </div>
  );
}
