
import { Fixture } from './types';

export const FEET_TO_METERS_SQUARE_FACTOR = 0.092903;

export const ROOM_LUX_VALUES: Record<string, number> = {
  'Bedroom': 150,
  'Living Room': 200,
  'Kitchen': 300,
  'Bathroom': 250,
  'Office': 400,
  'Hallway': 100,
  'Study': 350,
  'Custom': 0, // Placeholder
};

export const ROOM_TYPES = Object.keys(ROOM_LUX_VALUES) as (keyof typeof ROOM_LUX_VALUES)[];

export const FIXTURES_DATA: Fixture[] = [
  { id: 1, name: 'LED Bulb (9W)', lumens: 800, price: 150 },
  { id: 2, name: 'LED Tube Light (20W)', lumens: 2000, price: 400 },
  { id: 3, name: 'Recessed Downlight (12W)', lumens: 1100, price: 600 },
  { id: 4, name: 'Panel Light (36W)', lumens: 3600, price: 1500 },
  { id: 5, name: 'Smart Bulb (10W)', lumens: 850, price: 750 },
  { id: 6, name: 'Decorative Chandelier Bulb (5W)', lumens: 450, price: 250 },
];
