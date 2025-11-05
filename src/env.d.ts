declare namespace NodeJS {
  interface ProcessEnv {
    GOOGLE_GENAI_API_KEY: string;
    GCLOUD_PROJECT?: string;
  }
}
