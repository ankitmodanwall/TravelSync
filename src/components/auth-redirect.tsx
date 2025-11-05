'use client';

import { useAuth } from '@/context/auth-context';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AUTH_ROUTES = ['/login', '/signup', '/'];
const PROTECTED_ROUTE_PREFIX = '/dashboard';

export function AuthRedirect() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) {
      return; // Wait until loading is complete
    }

    const isAuthRoute = AUTH_ROUTES.includes(pathname);
    const isProtectedRoute = pathname.startsWith(PROTECTED_ROUTE_PREFIX) || pathname === '/budget' || pathname.startsWith('/trips/');


    if (user && isAuthRoute) {
      // User is logged in but on an auth page, redirect to dashboard
      router.replace('/dashboard');
    } else if (!user && isProtectedRoute) {
      // User is not logged in and trying to access a protected page, redirect to welcome page
      router.replace('/');
    }
  }, [user, loading, router, pathname]);

  return null; // This component does not render anything
}
