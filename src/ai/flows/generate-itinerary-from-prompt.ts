'use server';
/**
 * @fileOverview Generates a travel itinerary based on destination, duration, and trip type.
 *
 * - generateItineraryFromPrompt - A function that generates a travel itinerary.
 * - GenerateItineraryInput - The input type for the generateItineraryFromPrompt function.
 * - GenerateItineraryOutput - The return type for the generateItineraryFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateItineraryInputSchema = z.object({
  destination: z.string().describe('The destination for the trip.'),
  duration: z.number().describe('The duration of the trip in days.'),
  tripType: z.string().describe('The type of trip (e.g., adventure, budget, leisure).'),
});
export type GenerateItineraryInput = z.infer<typeof GenerateItineraryInputSchema>;

const GenerateItineraryOutputSchema = z.object({
  itinerary: z.string().describe(`The generated travel itinerary, formatted as a JSON string. The JSON should contain a single key "itinerary" which is an array of objects. Each object represents a day and should have "day" (number), "title" (string), and "activities" (an array of objects with "time", "description", and "location"). Example: {"itinerary": [{"day": 1, "title": "Arrival in Paris", "activities": [{"time": "Afternoon", "description": "Check into hotel", "location": "Hotel Name"}, {"time": "Evening", "description": "Dinner at a local bistro", "location": "Le Procope"}]}]}`),
});
export type GenerateItineraryOutput = z.infer<typeof GenerateItineraryOutputSchema>;

export async function generateItineraryFromPrompt(input: GenerateItineraryInput): Promise<GenerateItineraryOutput> {
  return generateItineraryFromPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateItineraryPrompt',
  input: {schema: GenerateItineraryInputSchema},
  output: {schema: GenerateItineraryOutputSchema},
  prompt: `You are a travel expert. Generate a {{duration}}-day travel itinerary for {{destination}} for a {{tripType}} trip. Respond with only the JSON formatted string as specified in the output schema.`,
});

const generateItineraryFromPromptFlow = ai.defineFlow(
  {
    name: 'generateItineraryFromPromptFlow',
    inputSchema: GenerateItineraryInputSchema,
    outputSchema: GenerateItineraryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
