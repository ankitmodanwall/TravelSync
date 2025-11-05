export type TravelSuggestion = {
  id: string;
  title: string;
  country: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  topAttractions: string[];
  bestTimeToVisit: string;
};

export const travelSuggestions: TravelSuggestion[] = [
  {
    id: 'suggestion-1',
    title: 'Kyoto',
    country: 'Japan',
    description:
      'Experience the heart of traditional Japan in Kyoto, a city of geishas, temples, and tranquil gardens. Autumn paints the city in fiery colors, making it a breathtaking sight.',
    imageUrl: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d',
    imageHint: 'Kyoto shrine',
    topAttractions: [
      'Kinkaku-ji (Golden Pavilion)',
      'Fushimi Inari-taisha Shrine',
      'Arashiyama Bamboo Grove',
      "Gion Geisha District",
    ],
    bestTimeToVisit: 'Spring (March-May) for cherry blossoms and Autumn (October-November) for fall colors.',
  },
  {
    id: 'suggestion-2',
    title: 'Amalfi Coast',
    country: 'Italy',
    description:
      "A stunning coastline of cliffside villages, azure waters, and vibrant lemon groves. The Amalfi Coast is a dream for lovers of scenic drives, delicious food, and Mediterranean charm.",
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-52b9be4ac20c',
    imageHint: 'Amalfi Coast',
    topAttractions: [
      'Positano Village',
      'Boat trip to Capri',
      'Hike the Path of the Gods',
      'Explore the town of Ravello',
    ],
    bestTimeToVisit: 'Spring (April-June) and Fall (September-October) for pleasant weather and fewer crowds.',
  },
  {
    id: 'suggestion-3',
    title: 'Banff National Park',
    country: 'Canada',
    description:
      "Canada's oldest national park, boasting turquoise glacial lakes, majestic peaks, and abundant wildlife. A paradise for hikers, photographers, and nature lovers.",
    imageUrl: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce',
    imageHint: 'Banff lake',
    topAttractions: [
      'Lake Louise & Moraine Lake',
      'Drive the Icefields Parkway',
      'Ride the Banff Gondola',
      'Wildlife spotting tours',
    ],
    bestTimeToVisit: 'Summer (June-August) for hiking and warm weather, or Winter (December-March) for skiing and snow sports.',
  },
  {
    id: 'suggestion-4',
    title: 'Cairo',
    country: 'Egypt',
    description:
      'Step back in time in the land of the Pharaohs. Cairo is a bustling metropolis that serves as the gateway to the Pyramids of Giza, the Sphinx, and countless ancient treasures.',
    imageUrl: 'https://images.unsplash.com/photo-1569056314990-faf33b544de8',
    imageHint: 'Cairo pyramids',
    topAttractions: [
      'Pyramids of Giza and the Sphinx',
      'The Egyptian Museum',
      'Khan el-Khalili Bazaar',
      'Nile River cruise',
    ],
    bestTimeToVisit: 'Fall (September-November) and Spring (March-May) to avoid the intense summer heat.',
  },
];
