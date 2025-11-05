# **App Name**: TravelSync

## Core Features:

- User Authentication: Secure user sign-up and sign-in using Firebase Authentication (email or Google). Store user profiles in Firestore (users collection)
- Collaborative Trip Planning: Users can create new trips and invite others via email or shareable link. Store trips in Firestore (trips collection) with access control. Allow multiple users to edit the same itinerary in real time.
- Itinerary Management: Day-by-day itinerary builder UI. Each day includes activities, times, locations, notes, and optional image uploads (Firebase Storage).
- Interactive Maps: Use Mapbox or Google Maps API to show all planned locations. Clickable markers show activity details (time, notes, etc.)
- AI-Powered Itinerary Generation: AI suggests full itineraries when given destination, duration (days), trip type (adventure, budget, leisure, etc.). Output: daily schedule (times, places, notes, budget tips). Leverages Gemini, accessed as a tool, via Firebase Genkit.
- AI Chat Summary: Allow users to chat while planning. Use Gemini to summarize chat logs and notes into a short plan summary. Save summary results under each trip, accessed as a tool.
- Real-Time Updates: Firestore triggers UI updates instantly for all users in the same trip. Use onSnapshot listeners for live collaboration.

## Style Guidelines:

- Primary color: Soft Lavender (#D0C9E2) to evoke feelings of calm, relaxation, and exploration.
- Background color: Light off-white (#F5F5F5) provides a clean and unobtrusive backdrop.
- Accent color: Teal (#4DB6AC) adds a touch of freshness and highlights interactive elements.
- Body text: 'PT Sans', a modern humanist sans-serif that blends clarity and approachability.
- Headline text: 'Playfair', an elegant serif, visually distinct from body text to add visual interest.
- Use a consistent set of minimalist icons to represent different activities and categories.
- Employ a clean, responsive layout with clear visual hierarchy and ample whitespace.
- Subtle Tailwind transitions for hover, page load, and modals
- Use calm blue and white tones for a clean travel feel
- Fixed sidebar (desktop) + collapsible menu (mobile)