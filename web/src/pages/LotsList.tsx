import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useParking } from "@/context/ParkingContext";
import { LotCard } from "@/components/LotCard";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LotsList() {
  const { lots } = useParking();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"name" | "availability">("name");

  const filteredLots = lots
    .filter(lot => 
      lot.name.toLowerCase().includes(search.toLowerCase()) || 
      lot.building.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      const aAvail = a.spots.filter(s => !s.isOccupied).length;
      const bAvail = b.spots.filter(s => !s.isOccupied).length;
      return bAvail - aAvail;
    });

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">All Parking Lots</h1>
            <p className="text-sm text-muted-foreground mt-1">Browse and filter all campus lots.</p>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search lots or buildings..." 
                className="pl-9 h-9"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              className={`h-9 w-9 shrink-0 ${sort === "availability" ? "border-primary text-primary bg-primary/10" : ""}`}
              onClick={() => setSort(s => s === "name" ? "availability" : "name")}
              title="Sort by availability"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLots.map(lot => (
            <LotCard key={lot.id} lot={lot} />
          ))}
          {filteredLots.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground border border-dashed rounded-lg">
              No lots found matching "{search}".
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
