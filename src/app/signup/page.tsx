'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/auth-context';
import { Logo } from '@/components/logo';
import { placeholderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
});

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, you'd call your auth service here.
    console.log(values);
    login({ email: values.email, name: values.name });
    router.push('/dashboard');
  };

  const loginHeroImage = placeholderImages.find(p => p.id === 'login-hero');

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center">
       {loginHeroImage && (
        <Image
          src={loginHeroImage.imageUrl}
          alt={loginHeroImage.description}
          fill
          className="object-cover brightness-[0.4]"
          data-ai-hint={loginHeroImage.imageHint}
        />
      )}
      <div className="relative z-10 w-full max-w-md p-4">
        <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader className="text-center">
                 <div className="mb-4 flex justify-center">
                    <Logo />
                </div>
                <CardTitle className="text-3xl font-bold font-headline">Sign Up</CardTitle>
                <CardDescription>
                Create your account to start planning your next adventure.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                            <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                            <Input
                                placeholder="m@example.com"
                                {...field}
                                type="email"
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                            <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                    <Button variant="outline" className="w-full">
                        <svg
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="google"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 488 512"
                        >
                        <path
                            fill="currentColor"
                            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-69.2 69.2c-20.8-19.6-48.2-31.4-79-31.4-62.5 0-113.5 51.1-113.5 113.5s51 113.5 113.5 113.5c71.2 0 98.2-53.6 102.2-81.7H248v-87.3h236.1c2.3 12.7 3.9 26.9 3.9 42.4z"
                        ></path>
                        </svg>
                        Sign Up with Google
                    </Button>
                    </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="underline">
                    Login
                    </Link>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
