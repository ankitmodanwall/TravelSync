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
  title: string;
  destination: string;
  dateRange: string;
  imageUrl: string;
  imageHint: string;
  collaborators: Collaborator[];
  itinerary?: ItineraryDay[];
};
