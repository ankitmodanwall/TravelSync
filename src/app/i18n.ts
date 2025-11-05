'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import translationEN from '../locales/en.json';
import translationES from '../locales/es.json';
import translationFR from '../locales/fr.json';
import translationHI from '../locales/hi.json';

const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
  fr: {
    translation: translationFR,
  },
  hi: {
    translation: translationHI,
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
