import { ROOM_TYPES } from './constants';

export type RoomType = typeof ROOM_TYPES[number];
export type Unit = 'feet' | 'meters';

export interface Fixture {
  id: number;
  name: string;
  lumens: number;
  price: number; // in INR
}

export interface CalculationResult {
  areaFt: number;
  areaM: number;
  requiredLux: number;
  totalLumens: number;
}

export interface FixtureSuggestion extends Fixture {
  quantity: number;
  totalLumens: number;
  totalCost: number;
  lumensPerRupee: number;
}