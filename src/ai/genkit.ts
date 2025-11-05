'use server';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {config} from 'dotenv';
config();

// Vercel deployment requires GOOGLE_GENAI_API_KEY to be set as an environment variable.
// For local development with `npm run dev`, this will be read from the .env file.
const googleAiPlugin = googleAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
  // Explicitly passing the project ID is required for Vercel deployments.
  projectId: process.env.GCLOUD_PROJECT,
});

export const ai = genkit({
  plugins: [googleAiPlugin],
  model: 'googleai/gemini-2.5-flash',
});
