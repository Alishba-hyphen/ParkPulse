import React, { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useParking } from "@/context/ParkingContext";
import { buildMapHTML, LOT_COORDS } from "@/data/mapUtils";
import { Button } from "@/components/ui/button";
import { X, Navigation, ExternalLink, MapPin } from "lucide-react";
import { Link } from "wouter";

export default function MapPage() {
  const { lots, autoTickCount } = useParking();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mapReady, setMapReady] = useState(false);
  const [selectedLotId, setSelectedLotId] = useState<string | null>(null);

  const lotsWithCoords = useMemo(() => {
    return lots.map((l) => ({
      ...l,
      lat: LOT_COORDS[l.id]?.lat ?? null,
      lng: LOT_COORDS[l.id]?.lng ?? null,
    }));
  }, [lots]);

  // Receive messages from Leaflet iframe
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      try {
        const data =
          typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (data.type === "READY") setMapReady(true);
        else if (data.type === "LOT_SELECT") setSelectedLotId(data.id);
        else if (data.type === "DESELECT") setSelectedLotId(null);
      } catch {}
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Push live updates to the iframe on every auto-tick
  useEffect(() => {
    if (!mapReady) return;
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ type: "REFRESH", lots: lotsWithCoords }),
      "*"
    );
  }, [autoTickCount, mapReady, lotsWithCoords]);

  const selectedLot = lots.find((l) => l.id === selectedLotId);
  const available = selectedLot
    ? selectedLot.spots.filter((s) => !s.isOccupied).length
    : 0;
  const total = selectedLot ? selectedLot.spots.length : 0;
  const pct = total > 0 ? available / total : 0;
  const statusLabel =
    pct >= 0.5 ? "Available" : pct >= 0.2 ? "Limited" : "Full";
  const statusColor =
    pct >= 0.5 ? "#22C55E" : pct >= 0.2 ? "#F59E0B" : "#EF4444";

  return (
    <Layout>
      {/* absolute inset-0 fills the `relative` main container perfectly */}
      <div className="absolute inset-0 flex overflow-hidden">
        {/* Map iframe — fills all remaining width */}
        <div className="flex-1 relative overflow-hidden">
          <iframe
            ref={iframeRef}
            srcDoc={buildMapHTML(JSON.stringify(lotsWithCoords))}
            title="Campus Map"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
              background: "#0F0F10",
            }}
          />

          {/* LIVE badge */}
          {mapReady && (
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur border border-white/10">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "#22C55E" }}
              />
              <span style={{ color: "#22C55E" }}>Live</span>
            </div>
          )}
        </div>

        {/* Side panel — slides in when a lot is selected */}
        <div
          className={`h-full bg-card border-l border-border flex flex-col shadow-2xl transition-all duration-300 ease-in-out overflow-hidden ${
            selectedLot ? "w-80" : "w-0"
          }`}
        >
          {selectedLot && (
            <>
              <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-bold text-base">{selectedLot.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => {
                    iframeRef.current?.contentWindow?.postMessage(
                      JSON.stringify({ type: "DESELECT" }),
                      "*"
                    );
                    setSelectedLotId(null);
                  }}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>

              <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-5">
                <div>
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                    Building
                  </p>
                  <p className="text-sm">{selectedLot.building}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-secondary rounded-lg p-3 border border-border">
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                      Distance
                    </p>
                    <p className="text-xl font-black tabular-nums">
                      {selectedLot.distance}
                    </p>
                  </div>
                  <div className="bg-secondary rounded-lg p-3 border border-border">
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                      Free
                    </p>
                    <p
                      className="text-xl font-black tabular-nums"
                      style={{ color: statusColor }}
                    >
                      {available}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                      Availability
                    </p>
                    <span
                      className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
                      style={{
                        color: statusColor,
                        backgroundColor: statusColor + "20",
                      }}
                    >
                      {statusLabel}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.round(pct * 100)}%`,
                        backgroundColor: statusColor,
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 text-right tabular-nums">
                    {available}/{total}
                  </p>
                </div>

                <div className="flex flex-col gap-2 mt-auto pt-2">
                  <Link href={`/lots/${selectedLot.id}`}>
                    <Button className="w-full font-bold uppercase tracking-wider text-xs h-9">
                      <ExternalLink className="h-3 w-3 mr-2" />
                      View Spot Grid
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full font-bold uppercase tracking-wider text-xs h-9"
                  >
                    <Navigation className="h-3 w-3 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
