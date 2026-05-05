import React, { createContext, useContext, useEffect, useState } from "react";
import { ParkingLot } from "../data/types";
import { buildInitialLots, simulateRefresh } from "../data/parking";

interface ParkingContextType {
  lots: ParkingLot[];
  autoTickCount: number;
  toggleFavorite: (id: string) => void;
  refresh: () => void;
}

const ParkingContext = createContext<ParkingContextType | undefined>(undefined);

export function ParkingProvider({ children }: { children: React.ReactNode }) {
  const [lots, setLots] = useState<ParkingLot[]>([]);
  const [autoTickCount, setAutoTickCount] = useState(0);

  useEffect(() => {
    setLots(buildInitialLots());
  }, []);

  useEffect(() => {
    if (lots.length === 0) return;
    
    const interval = setInterval(() => {
      setLots(prev => simulateRefresh(prev));
      setAutoTickCount(prev => prev + 1);
    }, 30000);
    
    return () => clearInterval(interval);
  }, [lots.length]);

  const toggleFavorite = (id: string) => {
    setLots(prev => prev.map(lot => lot.id === id ? { ...lot, isFavorite: !lot.isFavorite } : lot));
  };

  const refresh = () => {
    setLots(prev => simulateRefresh(prev));
    setAutoTickCount(prev => prev + 1);
  };

  return (
    <ParkingContext.Provider value={{ lots, autoTickCount, toggleFavorite, refresh }}>
      {children}
    </ParkingContext.Provider>
  );
}

export function useParking() {
  const context = useContext(ParkingContext);
  if (context === undefined) {
    throw new Error("useParking must be used within a ParkingProvider");
  }
  return context;
}
