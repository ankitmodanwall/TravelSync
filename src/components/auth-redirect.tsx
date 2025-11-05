'use client';

import { useAuth } from '@/context/auth-context';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';

const AUTH_ROUTES = ['/login', '/signup', '/'];
const PROTECTED_ROUTES = ['/dashboard', '/budget', '/trips/new'];

export function AuthRedirect({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isProtectedRoute = PROTECTED_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  useEffect(() => {
    if (loading) {
      return; // Wait until loading is complete before doing anything
    }

    if (user && isAuthRoute) {
      router.replace('/dashboard');
    } else if (!user && isProtectedRoute) {
      router.replace('/');
    }
  }, [user, loading, router, pathname, isAuthRoute, isProtectedRoute]);

  // While loading, or if redirection is about to happen, don't render children
  if (loading || (user && isAuthRoute) || (!user && isProtectedRoute)) {
    // You can return a global loader here if you have one
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          {/* You can use your Skeleton component or any other loader */}
        </div>
      </div>
    );
  }

  // If no redirection is needed, render the page content
  return <>{children}</>;
}
