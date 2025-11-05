'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { generateItineraryFromPrompt } from '@/ai/flows/generate-itinerary-from-prompt';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  destination: z
    .string()
    .min(2, { message: 'Destination must be at least 2 characters.' }),
  dates: z.object(
    {
      from: z.date({ required_error: 'A start date is required.' }),
      to: z.date({ required_error: 'An end date is required.' }),
    },
    { required_error: 'Please select a date range.' }
  ),
  tripType: z.string({ required_error: 'Please select a trip type.' }),
});

export default function NewTripPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    const duration =
      (values.dates.to.getTime() - values.dates.from.getTime()) /
        (1000 * 3600 * 24) +
      1;

    try {
      // In a real app, you would save the trip to a database first
      // and get a trip ID.
      const aiResponse = await generateItineraryFromPrompt({
        destination: values.destination,
        duration,
        tripType: values.tripType,
      });

      console.log('AI Generated Itinerary:', aiResponse.itinerary);
      
      toast({
        title: 'Trip Created!',
        description: 'Your new adventure has been set up.',
      });

      // We'll simulate creating the trip and redirecting.
      // In a real app, you'd redirect to `/trips/[new-trip-id]`
      router.push('/dashboard');

    } catch (error) {
      console.error('Failed to generate itinerary', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem generating your itinerary.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
       <div className="space-y-1 mb-8">
          <h1 className="text-3xl md:text-4xl font-headline font-bold">
            Plan a New Trip
          </h1>
          <p className="text-muted-foreground">
            Fill in the details below to start your next journey.
          </p>
        </div>

      <Card>
        <CardHeader>
          <CardTitle>Trip Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Paris, France" {...field} />
                    </FormControl>
                    <FormDescription>
                      Where are you heading to?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dates"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Trip Dates</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, 'LLL dd, y')} -{' '}
                                  {format(field.value.to, 'LLL dd, y')}
                                </>
                              ) : (
                                format(field.value.from, 'LLL dd, y')
                              )
                            ) : (
                              <span>Pick a date range</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={field.value?.from}
                          selected={field.value as DateRange}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Select the start and end dates for your trip.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tripType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Trip</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a trip style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="adventure">Adventure</SelectItem>
                        <SelectItem value="budget">Budget</SelectItem>
                        <SelectItem value="leisure">Leisure</SelectItem>
                        <SelectItem value="family">Family-Friendly</SelectItem>
                        <SelectItem value="romantic">Romantic</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This helps us tailor suggestions for you.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Itinerary...
                  </>
                ) : (
                  'Create & Generate Itinerary'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
