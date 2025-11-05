// src/ai/genkit.ts
import 'server-only';

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { config } from 'dotenv';
config();

const googleAiPlugin = googleAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY!,   // keep secret on server
  projectId: process.env.GCLOUD_PROJECT,       // optional locally
});

export const ai = genkit({
  plugins: [googleAiPlugin],
  model: 'googleai/gemini-2.5-flash',
});
