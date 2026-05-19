export interface DiningLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  seatingDensity: string;
  densityValue: number; // 0 to 100
  description: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const DINING_LOCATIONS: DiningLocation[] = [
  {
    id: 'beverly-hills',
    name: 'Lumina Beverly Hills',
    address: '9601 Wilshire Blvd, Beverly Hills, CA 90210',
    phone: '+1 (310) 555-0190',
    hours: '11:00 AM - 11:00 PM',
    seatingDensity: '85% (High Seating)',
    densityValue: 85,
    description: 'Located in the heart of Wilshire, offering an exclusive rooftop patio, open-air garden kitchen, and a private dining vault with custom Julian Vance pairings.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    coordinates: { lat: 34.0674, lng: -118.3995 }
  },
  {
    id: 'manhattan',
    name: 'Lumina Manhattan',
    address: '730 Fifth Ave, New York, NY 10019',
    phone: '+1 (212) 555-0142',
    hours: '11:00 AM - 12:00 AM',
    seatingDensity: '45% (Comfortable)',
    densityValue: 45,
    description: 'A multi-level architectural masterpiece on Fifth Avenue featuring gold-accented booths, glass mezzanine views, and integrated drone dispatch pads for local VIP couriers.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    coordinates: { lat: 40.7614, lng: -73.9753 }
  },
  {
    id: 'mayfair',
    name: 'Lumina Mayfair',
    address: '15 Bruton St, London W1J 6JD, UK',
    phone: '+44 20 7946 0192',
    hours: '12:00 PM - 11:00 PM',
    seatingDensity: '95% (Fully Booked)',
    densityValue: 95,
    description: 'Our historic British flagship in Mayfair. Indulge in live flame-roasted charcoal chambers, hand-rolled gold-leaf pasta, and private sommelier tastings beneath crystal chandeliers.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800',
    coordinates: { lat: 51.5098, lng: -0.1429 }
  }
];

export function useLocationsData() {
  const getLocations = () => DINING_LOCATIONS;
  
  const getLocationById = (id: string) => {
    return DINING_LOCATIONS.find((loc) => loc.id === id);
  };

  return {
    locations: DINING_LOCATIONS,
    getLocations,
    getLocationById
  };
}
