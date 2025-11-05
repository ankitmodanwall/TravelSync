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

export type BudgetItem = {
    id: string;
    tripId: string;
    name: string;
    amount: number;
    category: 'transport' | 'accommodation' | 'food' | 'activities' | 'other';
    date: Timestamp;
}

export type Trip = {
  id:string;
  name: string;
  destination: string;
  startDate: Timestamp;
  endDate: Timestamp;
  imageUrl: string;
  imageHint: string;
  ownerId: string;
  collaboratorIds: string[];
  itinerary?: ItineraryDay[];
  budget?: number;
};
