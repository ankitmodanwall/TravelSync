import type { Timestamp } from 'firebase/firestore';

export type User = {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
};

export type Collaborator = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type Activity = {
  id: string;
  time: string;
  description: string;
  location: string;
  notes?: string;
};

export type ItineraryDay = {
  day: number;
  title: string;
  activities: Activity[];
};

export type Trip = {
  id: string;
  name: string;
  destination: string;
  startDate: Timestamp;
  endDate: Timestamp;
  imageUrl: string;
  imageHint: string;
  ownerId: string;
  collaboratorIds: string[];
  itinerary?: ItineraryDay[];
};

export type ChatMessage = {
    id: string;
    tripId: string;
    userId: string;
    userName: string;
    userPhotoURL: string | null;
    message: string;
    timestamp: Timestamp;
};
