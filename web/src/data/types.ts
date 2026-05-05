export type SpotType = "regular" | "handicap" | "ev";

export interface ParkingSpot {
  id: string;
  row: string;
  number: number;
  isOccupied: boolean;
  type: SpotType;
}

export interface ParkingLot {
  id: string;
  name: string;
  building: string;
  distance: string;
  isFavorite: boolean;
  lastUpdated: Date;
  spots: ParkingSpot[];
}
