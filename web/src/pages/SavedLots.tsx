import React from "react";
import { Layout } from "@/components/layout/Layout";
import { useParking } from "@/context/ParkingContext";
import { LotCard } from "@/components/LotCard";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BookmarkPlus } from "lucide-react";

export default function SavedLots() {
  const { lots } = useParking();
  const savedLots = lots.filter(lot => lot.isFavorite);

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Saved Lots</h1>
          <p className="text-sm text-muted-foreground mt-1">Quick access to your frequently used parking locations.</p>
        </div>

        {savedLots.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedLots.map(lot => (
              <LotCard key={lot.id} lot={lot} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-dashed rounded-lg bg-card/50">
            <div className="h-16 w-16 bg-secondary rounded-full flex items-center justify-center mb-4 border">
              <BookmarkPlus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold mb-2">No saved lots</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Bookmark lots you frequently use to see their live availability here.
            </p>
            <Link href="/lots">
              <Button>Browse All Lots</Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
