import React, { useEffect, useState } from "react";
import { useParking } from "@/context/ParkingContext";
import { RefreshCw, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function getStoredName(): string {
  try { return localStorage.getItem("parkpulse_name") || ""; } catch { return ""; }
}

function getStoredUniversity(): string {
  try { return localStorage.getItem("parkpulse_university") || "Ohio State University"; } catch { return "Ohio State University"; }
}

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { autoTickCount, refresh } = useParking();
  const [isPulsing, setIsPulsing] = useState(false);
  const [greeting] = useState(getGreeting);
  const [name, setNameState] = useState(getStoredName);
  const [university, setUniversityState] = useState(getStoredUniversity);

  useEffect(() => {
    setIsPulsing(true);
    const t = setTimeout(() => setIsPulsing(false), 1000);
    return () => clearTimeout(t);
  }, [autoTickCount]);

  useEffect(() => {
    const onStorage = () => {
      setNameState(getStoredName());
      setUniversityState(getStoredUniversity());
    };
    window.addEventListener("parkpulse_profile_updated", onStorage);
    return () => window.removeEventListener("parkpulse_profile_updated", onStorage);
  }, []);

  const displayName = name ? name : null;

  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-4 shrink-0 gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="flex items-center justify-center h-9 w-9 rounded-md hover:bg-secondary/60 transition-colors text-muted-foreground hover:text-foreground shrink-0"
          title="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold tracking-tight text-foreground leading-none">
              {greeting}{displayName ? (
                <>, <span className="text-primary">{displayName}.</span></>
              ) : "."}
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-medium mt-0.5">
            Campus Parking — {university}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-secondary/50 border border-border/50 text-xs font-mono font-medium">
          <div className={`h-2 w-2 rounded-full bg-green-500 ${isPulsing ? "animate-ping" : ""}`} />
          <span className="text-muted-foreground uppercase tracking-wider">Live</span>
        </div>
        <Button variant="outline" size="sm" onClick={refresh} className="h-8 text-xs font-mono group">
          <RefreshCw className="mr-2 h-3 w-3 group-active:animate-spin" />
          SYNC
        </Button>
      </div>
    </header>
  );
}
