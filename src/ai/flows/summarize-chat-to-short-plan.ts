'use server';

/**
 * @fileOverview Summarizes chat logs and notes into a short plan summary.
 *
 * - summarizeChatToShortPlan - A function that handles the summarization process.
 * - SummarizeChatToShortPlanInput - The input type for the summarizeChatToShortPlan function.
 * - SummarizeChatToShortPlanOutput - The return type for the summarizeChatToShortPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeChatToShortPlanInputSchema = z.object({
  chatLogs: z.string().describe('The chat logs from the trip planning session.'),
  notes: z.string().describe('The notes taken during the trip planning session.'),
});
export type SummarizeChatToShortPlanInput = z.infer<
  typeof SummarizeChatToShortPlanInputSchema
>;

const SummarizeChatToShortPlanOutputSchema = z.object({
  summary: z.string().describe('A short summary of the trip plan.'),
});
export type SummarizeChatToShortPlanOutput = z.infer<
  typeof SummarizeChatToShortPlanOutputSchema
>;

export async function summarizeChatToShortPlan(
  input: SummarizeChatToShortPlanInput
): Promise<SummarizeChatToShortPlanOutput> {
  return summarizeChatToShortPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeChatToShortPlanPrompt',
  input: {schema: SummarizeChatToShortPlanInputSchema},
  output: {schema: SummarizeChatToShortPlanOutputSchema},
  prompt: `Summarize the following chat logs and notes into a short, concise trip plan summary.\n\nChat Logs: {{{chatLogs}}}\n\nNotes: {{{notes}}}\n\nSummary:`, 
});

const summarizeChatToShortPlanFlow = ai.defineFlow(
  {
    name: 'summarizeChatToShortPlanFlow',
    inputSchema: SummarizeChatToShortPlanInputSchema,
    outputSchema: SummarizeChatToShortPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
