import React from "react";
import { ParkingLot } from "@/data/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, MapPin } from "lucide-react";
import { Link } from "wouter";
import { useParking } from "@/context/ParkingContext";

interface LotCardProps {
  lot: ParkingLot;
  highlight?: boolean;
}

export function LotCard({ lot, highlight = false }: LotCardProps) {
  const { toggleFavorite } = useParking();
  
  const totalSpots = lot.spots.length;
  const availableSpots = lot.spots.filter(s => !s.isOccupied).length;
  const percentAvailable = totalSpots > 0 ? (availableSpots / totalSpots) * 100 : 0;
  
  let statusColor = "bg-green-500/10 text-green-500 border-green-500/20";
  if (percentAvailable < 20) statusColor = "bg-red-500/10 text-red-500 border-red-500/20";
  else if (percentAvailable < 50) statusColor = "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";

  return (
    <Card className={`relative overflow-hidden transition-all ${highlight ? "border-primary shadow-[0_0_15px_-3px_rgba(255,107,0,0.3)]" : "hover:border-primary/50"}`}>
      <CardHeader className="pb-3 pt-5 px-5 flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            {lot.name}
            {highlight && <Badge variant="default" className="ml-2 uppercase text-[10px] tracking-wider">Best Match</Badge>}
          </CardTitle>
          <CardDescription className="flex items-center gap-1 mt-1 text-xs font-mono">
            <MapPin className="h-3 w-3" /> {lot.building} • {lot.distance}
          </CardDescription>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 shrink-0 -mt-1 -mr-1"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(lot.id);
          }}
        >
          <Bookmark className={`h-4 w-4 ${lot.isFavorite ? "fill-primary text-primary" : "text-muted-foreground"}`} />
        </Button>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="flex items-end justify-between mt-2">
          <div>
            <div className="text-3xl font-black tabular-nums tracking-tighter">
              {availableSpots}
            </div>
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
              Spots Available
            </div>
          </div>
          <div className={`px-2.5 py-1 rounded-md border text-xs font-bold ${statusColor}`}>
            {Math.round(percentAvailable)}% FREE
          </div>
        </div>
        
        <div className="mt-4 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${100 - percentAvailable}%` }}
          />
        </div>
        
        <Link href={`/lots/${lot.id}`} className="mt-5 flex">
          <Button variant="secondary" className="w-full text-xs font-bold uppercase tracking-wider h-9">
            View Spots
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
