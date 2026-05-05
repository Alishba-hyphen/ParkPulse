import { ParkingSpot, ParkingLot, SpotType } from "./types";

function generateSpots(rows: string[], spotsPerRow: number, occupancyRate: number): ParkingSpot[] {
  const spots: ParkingSpot[] = [];
  rows.forEach(row => {
    for (let i = 1; i <= spotsPerRow; i++) {
      const type: SpotType = (i === 1 && row === rows[0]) ? "handicap" : (i === 2 && row === rows[0]) ? "ev" : "regular";
      spots.push({
        id: `${row}${i}`,
        row,
        number: i,
        isOccupied: Math.random() < occupancyRate,
        type
      });
    }
  });
  return spots;
}

export function buildInitialLots(): ParkingLot[] {
  return [
    { id: "lot-a", name: "Lot A", building: "South Oval - Engineering Tower", distance: "0.1 mi", isFavorite: false, lastUpdated: new Date(), spots: generateSpots(["A", "B", "C", "D", "E"], 12, 0.65) },
    { id: "lot-b", name: "Lot B", building: "St. John Arena - RPAC", distance: "0.2 mi", isFavorite: true, lastUpdated: new Date(), spots: generateSpots(["A", "B", "C", "D"], 10, 0.4) },
    { id: "lot-c", name: "Lot C", building: "North Campus - Knowlton School", distance: "0.3 mi", isFavorite: false, lastUpdated: new Date(), spots: generateSpots(["A", "B", "C", "D", "E", "F"], 14, 0.9) },
    { id: "lot-d", name: "Lot D", building: "Ohio Stadium - Schottenstein Center", distance: "0.5 mi", isFavorite: false, lastUpdated: new Date(), spots: generateSpots(["A", "B", "C"], 20, 0.2) },
    { id: "lot-e", name: "Lot E", building: "Wexner Medical Center - Ross Heart Hospital", distance: "0.6 mi", isFavorite: false, lastUpdated: new Date(), spots: generateSpots(["A", "B", "C", "D", "E"], 8, 0.75) },
    { id: "garage-1", name: "Garage 1", building: "Lane Avenue Garage - Northwest Campus", distance: "0.4 mi", isFavorite: false, lastUpdated: new Date(), spots: generateSpots(["L1-A", "L1-B", "L1-C", "L2-A", "L2-B", "L2-C"], 16, 0.55) }
  ];
}

export function simulateRefresh(lots: ParkingLot[]): ParkingLot[] {
  return lots.map(lot => ({
    ...lot,
    lastUpdated: new Date(),
    spots: lot.spots.map(s => Math.random() < 0.08 ? { ...s, isOccupied: !s.isOccupied } : s)
  }));
}
