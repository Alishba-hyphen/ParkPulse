import React from "react";

const BG = "#EFF6FF";
const BLUE = "#3B82F6";
const DARK = "#1E3A5F";
const GRAY = "#64748B";
const LIGHT = "#F1F5F9";
const BORDER = "#E2E8F0";

function Phone({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{
        width: 320, height: 640,
        background: BG,
        borderRadius: 40,
        border: "8px solid #1a1a1a",
        boxShadow: "0 32px 64px rgba(0,0,0,0.35), inset 0 0 0 2px #333",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        position: "relative",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}>
        {/* Status bar */}
        <div style={{ height: 40, background: BLUE, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", flexShrink: 0 }}>
          <span style={{ color: "#fff", fontSize: 11, fontWeight: 600 }}>9:41</span>
          <div style={{ width: 80, height: 16, background: "rgba(0,0,0,0.3)", borderRadius: 8 }} />
          <span style={{ color: "#fff", fontSize: 11 }}>● ▮</span>
        </div>
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {children}
        </div>
        {/* Home indicator */}
        <div style={{ height: 28, display: "flex", alignItems: "center", justifyContent: "center", background: BG, flexShrink: 0 }}>
          <div style={{ width: 100, height: 5, background: "#CBD5E1", borderRadius: 3 }} />
        </div>
      </div>
      <div style={{ fontFamily: "system-ui", fontSize: 13, color: "#888", fontWeight: 500, textAlign: "center" }}>{label}</div>
    </div>
  );
}

// Screen 1: Landing
function LandingScreen() {
  return (
    <div style={{ flex: 1, background: BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 24px", gap: 16 }}>
      <div style={{ width: 72, height: 72, background: BLUE, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 32 }}>🅿️</span>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: DARK }}>Campus Parking</div>
        <div style={{ fontSize: 13, color: GRAY, marginTop: 4 }}>Ohio State University</div>
      </div>
      <div style={{ fontSize: 13, color: GRAY, textAlign: "center", lineHeight: 1.5, marginTop: 4 }}>
        Find available parking spots on campus in real time.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", marginTop: 12 }}>
        <div style={{ background: BLUE, color: "#fff", borderRadius: 10, padding: "14px 0", textAlign: "center", fontWeight: 700, fontSize: 15 }}>
          View Parking Map
        </div>
        <div style={{ background: "#fff", color: BLUE, borderRadius: 10, padding: "13px 0", textAlign: "center", fontWeight: 600, fontSize: 15, border: `1.5px solid ${BLUE}` }}>
          All Lots
        </div>
      </div>
      <div style={{ display: "flex", gap: 20, marginTop: 8 }}>
        {[{ v: "6", l: "Lots" }, { v: "38%", l: "Available" }, { v: "Live", l: "Updates" }].map(({ v, l }) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: DARK }}>{v}</div>
            <div style={{ fontSize: 11, color: GRAY }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Screen 2: Dashboard
function DashboardScreen() {
  const lots = [
    { name: "Lot A", loc: "South Oval", pct: 37, free: 22, color: "#F59E0B" },
    { name: "Lot B", loc: "St. John Arena", pct: 65, free: 27, color: "#22C55E" },
    { name: "Lot C", loc: "North Campus", pct: 8, free: 5, color: "#EF4444" },
    { name: "Lot D", loc: "Ohio Stadium", pct: 75, free: 45, color: "#22C55E" },
  ];
  return (
    <div style={{ flex: 1, background: "#fff", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ background: BLUE, padding: "14px 16px", flexShrink: 0 }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Dashboard</div>
        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, marginTop: 2 }}>Ohio State University</div>
      </div>
      {/* Stats bar */}
      <div style={{ display: "flex", background: LIGHT, borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
        {[{ v: "38%", l: "Available" }, { v: "6", l: "Active Lots" }, { v: "149", l: "Free Spots" }].map(({ v, l }) => (
          <div key={l} style={{ flex: 1, textAlign: "center", padding: "10px 0", borderRight: `1px solid ${BORDER}` }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: DARK }}>{v}</div>
            <div style={{ fontSize: 10, color: GRAY }}>{l}</div>
          </div>
        ))}
      </div>
      {/* Lot list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: GRAY, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>Parking Lots</div>
        {lots.map(({ name, loc, pct, free, color }) => (
          <div key={name} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: DARK }}>{name}</div>
                <div style={{ fontSize: 11, color: GRAY }}>{loc}</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color }}>{pct}% free</div>
            </div>
            <div style={{ height: 5, background: "#E2E8F0", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 3 }} />
            </div>
            <div style={{ fontSize: 11, color: GRAY, marginTop: 4 }}>{free} spots available</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Screen 3: Map
function MapScreen() {
  return (
    <div style={{ flex: 1, background: "#fff", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: BLUE, padding: "14px 16px", flexShrink: 0 }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Campus Map</div>
        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, marginTop: 2 }}>Live lot availability</div>
      </div>
      {/* Fake map */}
      <div style={{ flex: 1, background: "#F8FAFC", position: "relative", overflow: "hidden" }}>
        {/* Grid */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.4 }}>
          {[...Array(8)].map((_, i) => <line key={`h${i}`} x1="0" y1={`${i*14}%`} x2="100%" y2={`${i*14}%`} stroke="#CBD5E1" strokeWidth="1" />)}
          {[...Array(8)].map((_, i) => <line key={`v${i}`} x1={`${i*14}%`} y1="0" x2={`${i*14}%`} y2="100%" stroke="#CBD5E1" strokeWidth="1" />)}
          <path d="M 20% 0% L 20% 100%" stroke="#94A3B8" strokeWidth="4" fill="none" />
          <path d="M 0% 45% L 100% 45%" stroke="#94A3B8" strokeWidth="4" fill="none" />
          <path d="M 0% 75% L 100% 75%" stroke="#94A3B8" strokeWidth="3" fill="none" />
        </svg>
        {/* Building blocks */}
        {[
          { x: "25%", y: "18%", w: "22%", h: "14%" },
          { x: "52%", y: "12%", w: "18%", h: "12%" },
          { x: "60%", y: "50%", w: "20%", h: "16%" },
          { x: "25%", y: "54%", w: "24%", h: "12%" },
        ].map((b, i) => (
          <div key={i} style={{ position: "absolute", left: b.x, top: b.y, width: b.w, height: b.h, background: "#CBD5E1", borderRadius: 4, opacity: 0.7 }} />
        ))}
        {/* Lot pins */}
        {[
          { x: "36%", y: "60%", label: "Lot A", pct: 37, color: "#F59E0B" },
          { x: "25%", y: "22%", label: "Lot B", pct: 65, color: "#22C55E" },
          { x: "55%", y: "35%", label: "Lot C", pct: 8, color: "#EF4444" },
          { x: "68%", y: "68%", label: "Lot D", pct: 75, color: "#22C55E" },
        ].map(({ x, y, label, pct, color }) => (
          <div key={label} style={{ position: "absolute", left: x, top: y, transform: "translate(-50%, -100%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ background: color, borderRadius: 8, padding: "4px 8px", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>{label}</span>
              <span style={{ color: "#fff", fontSize: 9 }}>{pct}%</span>
            </div>
            <div style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `7px solid ${color}` }} />
          </div>
        ))}
        {/* Legend */}
        <div style={{ position: "absolute", bottom: 10, left: 10, background: "#fff", borderRadius: 8, padding: "6px 10px", border: `1px solid ${BORDER}`, display: "flex", flexDirection: "column", gap: 3 }}>
          {[{ c: "#22C55E", l: "Available" }, { c: "#F59E0B", l: "Moderate" }, { c: "#EF4444", l: "Full" }].map(({ c, l }) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
              <span style={{ fontSize: 10, color: GRAY }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Screen 4: Lot Grid
function LotGridScreen() {
  const cols = 8;
  const rows = 6;
  const spots = Array.from({ length: cols * rows }, (_, i) => {
    if (i < 22) return "#EF4444";
    if (i < 28) return "#F59E0B";
    return "#22C55E";
  });
  return (
    <div style={{ flex: 1, background: "#fff", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: BLUE, padding: "14px 16px", flexShrink: 0 }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Lot A — Detail</div>
        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, marginTop: 2 }}>South Oval · Engineering Tower</div>
      </div>
      <div style={{ padding: "12px 14px", borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: DARK }}>22</div>
            <div style={{ fontSize: 11, color: GRAY }}>available spots</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#F59E0B" }}>37%</div>
            <div style={{ fontSize: 11, color: GRAY }}>free</div>
          </div>
        </div>
        <div style={{ height: 5, background: "#E2E8F0", borderRadius: 3, overflow: "hidden", marginTop: 8 }}>
          <div style={{ height: "100%", width: "37%", background: "#F59E0B", borderRadius: 3 }} />
        </div>
      </div>
      <div style={{ flex: 1, padding: "12px 14px", overflow: "hidden" }}>
        <div style={{ fontSize: 11, color: GRAY, marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Live Spot Grid</div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 5 }}>
          {spots.map((color, i) => (
            <div key={i} style={{ aspectRatio: "1", background: color, borderRadius: 3 }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 12, justifyContent: "center" }}>
          {[{ c: "#22C55E", l: "Free" }, { c: "#F59E0B", l: "Reserved" }, { c: "#EF4444", l: "Taken" }].map(({ c, l }) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
              <span style={{ fontSize: 10, color: GRAY }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PrototypeMobile() {
  return (
    <div style={{ minHeight: "100vh", background: "#1a1a1a", padding: "40px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 48, fontFamily: "system-ui, sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 13, color: "#666", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8 }}>Prototype v1</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>Campus Parking — First Build</div>
        <div style={{ fontSize: 14, color: "#888", marginTop: 6 }}>Blue/white theme before the OSU rebrand</div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 36, justifyContent: "center" }}>
        <Phone label="Screen 1 — Landing">
          <LandingScreen />
        </Phone>
        <Phone label="Screen 2 — Dashboard">
          <DashboardScreen />
        </Phone>
        <Phone label="Screen 3 — Campus Map">
          <MapScreen />
        </Phone>
        <Phone label="Screen 4 — Lot Grid">
          <LotGridScreen />
        </Phone>
      </div>

      <div style={{ color: "#555", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em" }}>
        ParkPulse · Prototype v1 · Ohio State University
      </div>
    </div>
  );
}
