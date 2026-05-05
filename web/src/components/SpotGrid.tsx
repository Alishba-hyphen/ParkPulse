import React from "react";
import { ParkingSpot } from "@/data/types";
import { Badge } from "@/components/ui/badge";

interface SpotGridProps {
  spots: ParkingSpot[];
}

export function SpotGrid({ spots }: SpotGridProps) {
  // Group spots by row
  const rowsMap = spots.reduce((acc, spot) => {
    if (!acc[spot.row]) acc[spot.row] = [];
    acc[spot.row].push(spot);
    return acc;
  }, {} as Record<string, ParkingSpot[]>);
  
  const rowLabels = Object.keys(rowsMap).sort();

  return (
    <div className="flex flex-col gap-6 p-6 bg-card border rounded-lg">
      {rowLabels.map(row => {
        const rowSpots = rowsMap[row].sort((a, b) => a.number - b.number);
        const avail = rowSpots.filter(s => !s.isOccupied).length;
        
        return (
          <div key={row} className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-border/50 pb-2">
              <div className="font-mono text-sm font-bold text-muted-foreground">ROW {row}</div>
              <Badge variant="outline" className="font-mono text-[10px]">{avail}/{rowSpots.length} FREE</Badge>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {rowSpots.map(spot => {
                const isOccupied = spot.isOccupied;
                let colorClass = "border-green-500/50 bg-green-500/10 text-green-500";
                
                if (isOccupied) {
                  colorClass = "border-red-500/30 bg-red-500/20 text-red-500/70";
                } else {
                  if (spot.type === "handicap") colorClass = "border-blue-500/50 bg-blue-500/10 text-blue-500";
                  if (spot.type === "ev") colorClass = "border-green-400/50 bg-green-400/10 text-green-400";
                }
                
                return (
                  <div 
                    key={spot.id} 
                    className={`h-12 w-8 rounded-sm border flex flex-col items-center justify-center text-[10px] font-mono transition-colors ${colorClass}`}
                    title={`Spot ${spot.id} (${spot.type})`}
                  >
                    {!isOccupied && <span className="opacity-70">{spot.number}</span>}
                    {spot.type === "handicap" && !isOccupied && <span className="text-[8px] mt-1">♿</span>}
                    {spot.type === "ev" && !isOccupied && <span className="text-[8px] mt-1">⚡</span>}
                    {isOccupied && <div className="w-4 h-8 bg-red-500/40 rounded-sm" />}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
