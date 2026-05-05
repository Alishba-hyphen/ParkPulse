import React from "react";
import { Layout } from "@/components/layout/Layout";
import { useParking } from "@/context/ParkingContext";
import { useRoute, Link } from "wouter";
import { SpotGrid } from "@/components/SpotGrid";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function LotDetail() {
  const [, params] = useRoute("/lots/:id");
  const { lots, toggleFavorite } = useParking();
  const id = params?.id;
  
  const lot = lots.find(l => l.id === id);

  if (!lot) {
    return (
      <Layout>
        <div className="p-6 max-w-4xl mx-auto text-center py-20">
          <h2 className="text-xl font-bold mb-4">Lot Not Found</h2>
          <Link href="/lots">
            <Button variant="outline">Return to Directory</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const total = lot.spots.length;
  const avail = lot.spots.filter(s => !s.isOccupied).length;
  const evAvail = lot.spots.filter(s => s.type === "ev" && !s.isOccupied).length;
  const handicapAvail = lot.spots.filter(s => s.type === "handicap" && !s.isOccupied).length;

  return (
    <Layout>
      <div className="p-6 max-w-5xl mx-auto flex flex-col gap-6">
        <div>
          <Link href="/lots">
            <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground h-8 px-2 -ml-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Lots
            </Button>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-black tracking-tight uppercase">{lot.name}</h1>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => toggleFavorite(lot.id)}
                >
                  <Bookmark className={`h-5 w-5 ${lot.isFavorite ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                </Button>
              </div>
              <p className="text-muted-foreground flex items-center gap-2 font-mono text-sm">
                <MapPin className="h-4 w-4" /> {lot.building} • {lot.distance}
              </p>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-card border rounded-lg p-4 min-w-[120px] text-center">
                <div className="text-xs text-muted-foreground font-mono uppercase mb-1">Total Free</div>
                <div className="text-3xl font-black tabular-nums text-primary">{avail}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-mono uppercase">
          <Badge variant="outline" className="border-border px-3 py-1 bg-secondary text-foreground">
            {total} Total Spots
          </Badge>
          <Badge variant="outline" className="border-blue-500/30 px-3 py-1 bg-blue-500/10 text-blue-500">
            {handicapAvail} ADA Free
          </Badge>
          <Badge variant="outline" className="border-green-400/30 px-3 py-1 bg-green-400/10 text-green-400">
            {evAvail} EV Free
          </Badge>
        </div>

        <SpotGrid spots={lot.spots} />
      </div>
    </Layout>
  );
}
