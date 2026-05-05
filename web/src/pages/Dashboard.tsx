import React, { useMemo } from "react";
import { useParking } from "@/context/ParkingContext";
import { Layout } from "@/components/layout/Layout";
import { LotCard } from "@/components/LotCard";
import { Button } from "@/components/ui/button";
import { Crosshair, Map, Activity } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const { lots } = useParking();

  const { totalSpots, availableSpots, bestLot } = useMemo(() => {
    let total = 0;
    let avail = 0;
    let best: (typeof lots)[0] | null = null;
    let maxPercent = -1;

    lots.forEach(lot => {
      const lotTotal = lot.spots.length;
      const lotAvail = lot.spots.filter(s => !s.isOccupied).length;
      total += lotTotal;
      avail += lotAvail;
      
      const percent = lotTotal > 0 ? lotAvail / lotTotal : 0;
      if (percent > maxPercent && lotAvail > 0) {
        maxPercent = percent;
        best = lot;
      }
    });

    return { totalSpots: total, availableSpots: avail, bestLot: best };
  }, [lots]);

  const campusPercent = totalSpots > 0 ? Math.round((availableSpots / totalSpots) * 100) : 0;

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          
          {/* Summary Panel */}
          <div className="w-full md:w-1/3 grid grid-cols-1 gap-4">
            <div className="bg-card border rounded-lg p-5 flex flex-col items-center justify-center text-center py-8">
              <Activity className="h-8 w-8 text-primary mb-3" />
              <div className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-1">Campus Availability</div>
              <div className="text-5xl font-black tabular-nums tracking-tighter text-foreground mb-2">
                {campusPercent}%
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="text-foreground font-bold">{availableSpots}</span> of {totalSpots} spots free
              </div>
            </div>

            {bestLot && (
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-5 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <Crosshair className="w-24 h-24" />
                </div>
                <div className="text-xs font-mono text-primary font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  Recommended Lot
                </div>
                <div className="text-xl font-bold mb-1 text-foreground">{bestLot.name}</div>
                <div className="text-sm text-muted-foreground mb-4">{bestLot.distance} away</div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="text-2xl font-black tabular-nums">{bestLot.spots.filter(s => !s.isOccupied).length} <span className="text-sm text-muted-foreground font-normal">free</span></div>
                  <Link href={`/map?lot=${bestLot.id}`}>
                    <Button size="sm" className="font-bold uppercase text-xs h-8">
                      Navigate <Map className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Lots Grid */}
          <div className="w-full md:w-2/3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Live Status</h2>
              <Link href="/lots" className="text-sm text-primary hover:underline font-mono">View All</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lots.map(lot => (
                <LotCard key={lot.id} lot={lot} highlight={bestLot?.id === lot.id} />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </Layout>
  );
}
