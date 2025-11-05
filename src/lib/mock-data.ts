import type { Trip, Collaborator } from './types';
import { placeholderImages } from './placeholder-images';

const getPlaceholderImage = (id: string) => {
  const img = placeholderImages.find(p => p.id === id);
  if (!img) return { imageUrl: 'https://picsum.photos/seed/default/600/400', imageHint: 'landscape' };
  return { imageUrl: img.imageUrl, imageHint: img.imageHint };
};

export const collaborators: Collaborator[] = [
  { id: '1', name: 'Alice', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { id: '2', name: 'Bob', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
  { id: '3', name: 'Charlie', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
  { id: '4', name: 'Diana', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026707d' },
];

export const mockTrips: Trip[] = [
  {
    id: '1',
    title: 'Romantic Getaway to Paris',
    destination: 'Paris, France',
    dateRange: 'Oct 12-19, 2024',
    ...getPlaceholderImage('trip-paris'),
    collaborators: [collaborators[0], collaborators[1]],
  },
  {
    id: '2',
    title: 'Autumn in Kyoto',
    destination: 'Kyoto, Japan',
    dateRange: 'Nov 05-12, 2024',
    ...getPlaceholderImage('trip-japan'),
    collaborators: [collaborators[0], collaborators[2], collaborators[3]],
  },
  {
    id: '3',
    title: 'Jungle Adventure',
    destination: 'Costa Rica',
    dateRange: 'Jan 20-28, 2025',
    ...getPlaceholderImage('trip-costa-rica'),
    collaborators: [collaborators[0], collaborators[3]],
  },
  {
    id: '4',
    title: 'Santorini Views',
    destination: 'Santorini, Greece',
    dateRange: 'Sep 01-08, 2024',
    ...getPlaceholderImage('trip-greece'),
    collaborators: [collaborators[0], collaborators[1], collaborators[2]],
  },
    {
    id: '5',
    title: 'City That Never Sleeps',
    destination: 'New York, USA',
    dateRange: 'Dec 22-29, 2024',
    ...getPlaceholderImage('trip-new-york'),
    collaborators: [collaborators[0], collaborators[1]],
  },
  {
    id: '6',
    title: 'Ancient Wonders',
    destination: 'Machu Picchu, Peru',
    dateRange: 'Jun 15-25, 2025',
    ...getPlaceholderImage('trip-peru'),
    collaborators: [collaborators[0]],
  },
];
