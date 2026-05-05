import React, { useState } from "react";

/* ─── colours ─────────────────────────────────────────── */
const V1 = { bg: "#EFF6FF", nav: "#3B82F6", dark: "#1E3A5F", gray: "#64748B", border: "#E2E8F0", light: "#F1F5F9" };
const V2 = { bg: "#0A0A0A", panel: "#111", border: "#1e1e1e", orange: "#FF6B00", muted: "#555", dim: "#888" };

/* ─── shared phone shell ───────────────────────────────── */
function Phone({ children, v2 }: { children: React.ReactNode; v2?: boolean }) {
  return (
    <div style={{
      width: 260, height: 540,
      background: v2 ? V2.bg : V1.bg,
      borderRadius: 34,
      border: `7px solid ${v2 ? "#2a2a2a" : "#1a1a1a"}`,
      boxShadow: v2
        ? "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px #333"
        : "0 24px 60px rgba(0,0,0,0.35), 0 0 0 1px #444",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      fontFamily: "system-ui, -apple-system, sans-serif",
      position: "relative",
    }}>
      {/* notch */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 80, height: 14, background: v2 ? "#1a1a1a" : "#111", borderBottomLeftRadius: 10, borderBottomRightRadius: 10, zIndex: 10 }} />
      {/* status bar */}
      <div style={{ height: 32, background: v2 ? V2.bg : V1.nav, display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 14px 4px", flexShrink: 0 }}>
        <span style={{ color: v2 ? V2.muted : "#fff", fontSize: 9, fontWeight: 600 }}>9:41</span>
        <span style={{ color: v2 ? V2.muted : "#fff", fontSize: 9 }}>●▮</span>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>{children}</div>
      {/* home bar */}
      <div style={{ height: 22, display: "flex", alignItems: "center", justifyContent: "center", background: v2 ? "#0d0d0d" : V1.bg, flexShrink: 0 }}>
        <div style={{ width: 70, height: 4, background: v2 ? "#2a2a2a" : "#CBD5E1", borderRadius: 2 }} />
      </div>
    </div>
  );
}

/* ─── V1 screens ───────────────────────────────────────── */
function V1Landing() {
  return (
    <div style={{ flex: 1, background: V1.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px 20px", gap: 12 }}>
      <div style={{ width: 58, height: 58, background: V1.nav, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>🅿️</div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: V1.dark }}>Campus Parking</div>
        <div style={{ fontSize: 11, color: V1.gray, marginTop: 2 }}>Ohio State University</div>
      </div>
      <div style={{ fontSize: 11, color: V1.gray, textAlign: "center", lineHeight: 1.5 }}>Find available parking spots on campus in real time.</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", marginTop: 8 }}>
        <div style={{ background: V1.nav, color: "#fff", borderRadius: 10, padding: "12px 0", textAlign: "center", fontWeight: 700, fontSize: 13 }}>View Parking Map</div>
        <div style={{ background: "#fff", color: V1.nav, borderRadius: 10, padding: "11px 0", textAlign: "center", fontWeight: 600, fontSize: 13, border: `1.5px solid ${V1.nav}` }}>All Lots</div>
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
        {[{ v: "6", l: "Lots" }, { v: "38%", l: "Open" }, { v: "Live", l: "Updates" }].map(({ v, l }) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: V1.dark }}>{v}</div>
            <div style={{ fontSize: 10, color: V1.gray }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function V1Dashboard() {
  const lots = [
    { name: "Lot A", loc: "South Oval", pct: 37, color: "#F59E0B" },
    { name: "Lot B", loc: "St. John Arena", pct: 65, color: "#22C55E" },
    { name: "Lot C", loc: "North Campus", pct: 8, color: "#EF4444" },
    { name: "Lot D", loc: "Ohio Stadium", pct: 75, color: "#22C55E" },
  ];
  return (
    <div style={{ flex: 1, background: "#fff", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: V1.nav, padding: "10px 14px", flexShrink: 0 }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Dashboard</div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 10 }}>Ohio State University</div>
      </div>
      <div style={{ display: "flex", background: V1.light, borderBottom: `1px solid ${V1.border}`, flexShrink: 0 }}>
        {[{ v: "38%", l: "Available" }, { v: "6", l: "Lots" }, { v: "149", l: "Free" }].map(({ v, l }) => (
          <div key={l} style={{ flex: 1, textAlign: "center", padding: "8px 0", borderRight: `1px solid ${V1.border}` }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: V1.dark }}>{v}</div>
            <div style={{ fontSize: 9, color: V1.gray }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 6, overflowY: "auto" }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: V1.gray, textTransform: "uppercase", letterSpacing: "0.08em" }}>Parking Lots</div>
        {lots.map(({ name, loc, pct, color }) => (
          <div key={name} style={{ background: "#fff", border: `1px solid ${V1.border}`, borderRadius: 8, padding: "7px 10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <div><div style={{ fontWeight: 700, fontSize: 12, color: V1.dark }}>{name}</div><div style={{ fontSize: 10, color: V1.gray }}>{loc}</div></div>
              <span style={{ fontSize: 11, fontWeight: 700, color }}>{pct}%</span>
            </div>
            <div style={{ height: 4, background: V1.border, borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function V1Map() {
  return (
    <div style={{ flex: 1, background: "#fff", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: V1.nav, padding: "10px 14px", flexShrink: 0 }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Campus Map</div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 10 }}>Live lot availability</div>
      </div>
      <div style={{ flex: 1, background: "#F8FAFC", position: "relative", overflow: "hidden" }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.35 }}>
          {[...Array(7)].map((_, i) => <line key={`h${i}`} x1="0" y1={`${(i + 1) * 14}%`} x2="100%" y2={`${(i + 1) * 14}%`} stroke="#CBD5E1" strokeWidth="1" />)}
          {[...Array(7)].map((_, i) => <line key={`v${i}`} x1={`${(i + 1) * 14}%`} y1="0" x2={`${(i + 1) * 14}%`} y2="100%" stroke="#CBD5E1" strokeWidth="1" />)}
          <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#94A3B8" strokeWidth="4" />
          <line x1="0" y1="45%" x2="100%" y2="45%" stroke="#94A3B8" strokeWidth="4" />
        </svg>
        {[{ x: "26%", y: "18%", w: "20%", h: "14%" }, { x: "52%", y: "52%", w: "18%", h: "14%" }].map((b, i) => (
          <div key={i} style={{ position: "absolute", left: b.x, top: b.y, width: b.w, height: b.h, background: "#CBD5E1", borderRadius: 3, opacity: 0.6 }} />
        ))}
        {[
          { x: "36%", y: "62%", label: "A", pct: 37, color: "#F59E0B" },
          { x: "26%", y: "24%", label: "B", pct: 65, color: "#22C55E" },
          { x: "55%", y: "32%", label: "C", pct: 8, color: "#EF4444" },
          { x: "68%", y: "70%", label: "D", pct: 75, color: "#22C55E" },
        ].map(({ x, y, label, pct, color }) => (
          <div key={label} style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,-100%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ background: color, borderRadius: 6, padding: "3px 7px", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ color: "#fff", fontSize: 9, fontWeight: 700 }}>Lot {label}</span>
              <span style={{ color: "#fff", fontSize: 8 }}>{pct}%</span>
            </div>
            <div style={{ width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: `6px solid ${color}` }} />
          </div>
        ))}
        <div style={{ position: "absolute", bottom: 8, left: 8, background: "#fff", borderRadius: 6, padding: "5px 8px", border: `1px solid ${V1.border}`, display: "flex", flexDirection: "column", gap: 2 }}>
          {[["#22C55E", "Open"], ["#F59E0B", "Moderate"], ["#EF4444", "Full"]].map(([c, l]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
              <span style={{ fontSize: 9, color: V1.gray }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── V2 screens ───────────────────────────────────────── */
function V2Landing() {
  return (
    <div style={{ flex: 1, background: V2.bg, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* grid bg */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "20px 20px", pointerEvents: "none" }} />
      {/* nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", zIndex: 1, flexShrink: 0 }}>
        <span style={{ fontWeight: 800, fontSize: 14, color: V2.orange }}>ParkPulse</span>
        <div style={{ background: V2.orange, color: "#000", borderRadius: 6, padding: "4px 10px", fontSize: 10, fontWeight: 700 }}>Sign in</div>
      </div>
      {/* hero */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 18px 16px", gap: 8, position: "relative" }}>
        {/* glow */}
        <div style={{ position: "absolute", width: "70%", height: "60%", background: "radial-gradient(circle,rgba(255,107,0,0.14) 0%,transparent 70%)", borderRadius: "50%", top: "30%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
        {/* rings */}
        {[90, 120, 150].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: s, height: s, borderRadius: "50%", border: "1.5px solid rgba(255,107,0,0.4)", left: "50%", top: "38%", transform: "translate(-50%,-50%)", animation: "none" }} />
        ))}
        {/* icon */}
        <div style={{ zIndex: 1, width: 46, height: 46, borderRadius: "50%", background: "rgba(255,107,0,0.15)", border: "1.5px solid rgba(255,107,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: V2.orange, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🚗</div>
        </div>
        <div style={{ zIndex: 1, fontWeight: 900, fontSize: 22, letterSpacing: "-0.03em" }}>
          <span style={{ color: V2.orange }}>Park</span><span style={{ color: "#fff" }}>Pulse</span>
        </div>
        <div style={{ zIndex: 1, fontSize: 10, color: V2.muted }}>Know before you park.</div>
        <div style={{ zIndex: 1, display: "flex", alignItems: "center", gap: 5, background: V2.panel, border: `1px solid #222`, borderRadius: 99, padding: "4px 10px", marginTop: 4 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: V2.orange }} />
          <span style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: "0.12em" }}>Any Campus, Any University</span>
        </div>
        <div style={{ zIndex: 1, display: "flex", flexDirection: "column", gap: 6, width: "100%", marginTop: 8 }}>
          <div style={{ background: V2.orange, color: "#000", borderRadius: 10, padding: "11px 0", textAlign: "center", fontWeight: 700, fontSize: 12, boxShadow: "0 0 20px -4px rgba(255,107,0,0.5)" }}>GET STARTED →</div>
          <div style={{ border: `1px solid #222`, color: V2.dim, borderRadius: 10, padding: "10px 0", textAlign: "center", fontSize: 12 }}>Demo →</div>
        </div>
      </div>
    </div>
  );
}

function V2Dashboard() {
  const lots = [
    { name: "Lot A", loc: "South Oval", spots: 23, pct: 38, color: "#F59E0B" },
    { name: "Lot B", loc: "St. John Arena", spots: 27, pct: 68, color: "#22C55E" },
    { name: "Lot C", loc: "N. Campus", spots: 5, pct: 6, color: "#EF4444" },
    { name: "Lot D", loc: "Ohio Stadium", spots: 45, pct: 75, color: "#22C55E" },
  ];
  return (
    <div style={{ flex: 1, background: V2.bg, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* header */}
      <div style={{ borderBottom: `1px solid #1a1a1a`, padding: "10px 12px", flexShrink: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 12, color: "#fff" }}>Good morning.</div>
        <div style={{ fontSize: 9, color: V2.muted }}>Campus Parking — Ohio State University</div>
      </div>
      {/* stat card */}
      <div style={{ margin: "8px 10px", background: V2.panel, border: `1px solid #1e1e1e`, borderRadius: 10, padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 9, color: V2.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Campus Availability</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>39%</div>
          <div style={{ fontSize: 9, color: V2.muted }}>149 of 380 spots free</div>
        </div>
        <div style={{ fontSize: 24, color: V2.orange, opacity: 0.6 }}>〜</div>
      </div>
      {/* lot list */}
      <div style={{ flex: 1, padding: "0 10px 8px", display: "flex", flexDirection: "column", gap: 5, overflowY: "auto" }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: "#fff" }}>Live Status</div>
        {lots.map(({ name, loc, spots, pct, color }) => (
          <div key={name} style={{ background: V2.panel, border: `1px solid #1e1e1e`, borderRadius: 8, padding: "7px 10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <div><div style={{ fontWeight: 700, fontSize: 11, color: "#fff" }}>{name}</div><div style={{ fontSize: 9, color: V2.muted }}>{loc}</div></div>
              <div style={{ background: color, borderRadius: 4, padding: "2px 5px", fontSize: 8, fontWeight: 700, color: "#000" }}>{pct}% FREE</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{spots} <span style={{ fontSize: 8, color: V2.muted, fontWeight: 400 }}>spots avail.</span></div>
            <div style={{ height: 3, background: "#222", borderRadius: 2, overflow: "hidden", marginTop: 4 }}>
              <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function V2Map() {
  const spotGrid = (cols: number, rows: number, pct: number) =>
    Array.from({ length: cols * rows }, (_, i) => {
      const taken = (100 - pct) / 100;
      if (i / (cols * rows) < taken * 0.4) return "#9333EA";
      if (i / (cols * rows) < taken) return "#EF4444";
      return Math.random() < 0.25 ? "#F59E0B" : "#22C55E";
    });

  const lots = [
    { x: "38%", y: "22%", label: "G1", count: "44/96", pct: 46, color: "#FF6B00", cols: 8, rows: 3 },
    { x: "22%", y: "52%", label: "", count: "23/40", pct: 58, color: "#FF6B00", cols: 5, rows: 3 },
    { x: "60%", y: "60%", label: "A", count: "23/60", pct: 38, color: "#22C55E", cols: 7, rows: 4 },
  ];

  return (
    <div style={{ flex: 1, background: "#111", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Dark map bg */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.3 }}>
          {[...Array(8)].map((_, i) => <line key={`h${i}`} x1="0" y1={`${(i + 1) * 12}%`} x2="100%" y2={`${(i + 1) * 12}%`} stroke="#333" strokeWidth="1" />)}
          {[...Array(8)].map((_, i) => <line key={`v${i}`} x1={`${(i + 1) * 12}%`} y1="0" x2={`${(i + 1) * 12}%`} y2="100%" stroke="#333" strokeWidth="1" />)}
        </svg>
        {/* Roads */}
        <div style={{ position: "absolute", left: "18%", top: 0, bottom: 0, width: 10, background: "#1e1e1e" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: "40%", height: 8, background: "#1e1e1e" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: "70%", height: 6, background: "#1a1a1a" }} />
        {/* Buildings */}
        {[{ x: "26%", y: "48%", w: "16%", h: "12%" }, { x: "55%", y: "25%", w: "14%", h: "10%" }].map((b, i) => (
          <div key={i} style={{ position: "absolute", left: b.x, top: b.y, width: b.w, height: b.h, background: "#181818", borderRadius: 2 }} />
        ))}
        {/* Lot grids */}
        {lots.map(({ x, y, label, count, pct, color, cols, rows }) => (
          <div key={count} style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,-50%)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: color }} />
              <span style={{ fontSize: 8, color: "#fff", fontWeight: 600 }}>{label ? `${label} ` : ""}{count}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 1.5, padding: 2.5, background: "#0d0d0d", border: `1.5px solid ${color}`, borderRadius: 3 }}>
              {spotGrid(cols, rows, pct).map((c, i) => (
                <div key={i} style={{ width: 7, height: 7, background: c, borderRadius: 1 }} />
              ))}
            </div>
          </div>
        ))}
        {/* LIVE badge */}
        <div style={{ position: "absolute", top: 8, left: 8, display: "flex", alignItems: "center", gap: 4, background: "#111", border: "1px solid #2a2a2a", borderRadius: 6, padding: "4px 8px" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E" }} />
          <span style={{ fontSize: 8, color: "#fff", fontWeight: 600, letterSpacing: "0.08em" }}>LIVE</span>
        </div>
        {/* zoom controls */}
        <div style={{ position: "absolute", bottom: 8, right: 8, display: "flex", flexDirection: "column", gap: 2 }}>
          {["+", "−"].map(c => (
            <div key={c} style={{ width: 22, height: 22, background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#888" }}>{c}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── row layout ───────────────────────────────────────── */
function CompRow({ label, v1, v2 }: { label: string; v1: React.ReactNode; v2: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ height: 1, flex: 1, background: "#2a2a2a" }} />
        <span style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 600, whiteSpace: "nowrap" }}>{label}</span>
        <div style={{ height: 1, flex: 1, background: "#2a2a2a" }} />
      </div>
      <div style={{ display: "flex", gap: 32, alignItems: "flex-start", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600 }}>Prototype v1</div>
          <Phone>{v1}</Phone>
        </div>
        {/* Arrow */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 40, height: 2, background: "linear-gradient(90deg,#3B82F6,#FF6B00)" }} />
            <div style={{ fontSize: 18, color: "#FF6B00" }}>→</div>
            <div style={{ fontSize: 9, color: "#444", textTransform: "uppercase", letterSpacing: "0.12em", textAlign: "center" }}>OSU<br />Rebrand</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 10, color: "#FF6B00", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600 }}>v2 Final</div>
          <Phone v2>{v2}</Phone>
        </div>
      </div>
    </div>
  );
}

/* ─── page ─────────────────────────────────────────────── */
export function Comparison() {
  const [activeTab, setActiveTab] = useState<"all" | "landing" | "dashboard" | "map">("all");
  const tabs = [
    { key: "all", label: "All Screens" },
    { key: "landing", label: "Landing" },
    { key: "dashboard", label: "Dashboard" },
    { key: "map", label: "Map" },
  ] as const;

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", padding: "40px 24px 60px", fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.22em", marginBottom: 10 }}>ParkPulse · Design Evolution</div>
        <div style={{ fontSize: 36, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>
          Before <span style={{ color: "#3B82F6" }}>v1</span> → After <span style={{ color: "#FF6B00" }}>v2</span>
        </div>
        <div style={{ fontSize: 14, color: "#555", marginTop: 8 }}>Blue/white prototype → Dark OSU-branded final product</div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 40 }}>
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            style={{
              padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
              background: activeTab === key ? "#FF6B00" : "#111",
              color: activeTab === key ? "#000" : "#555",
              outline: activeTab === key ? "none" : "1px solid #222",
              transition: "all 0.15s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Comparison rows */}
      <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: 48 }}>
        {(activeTab === "all" || activeTab === "landing") && (
          <CompRow label="Landing Page" v1={<V1Landing />} v2={<V2Landing />} />
        )}
        {(activeTab === "all" || activeTab === "dashboard") && (
          <CompRow label="Dashboard" v1={<V1Dashboard />} v2={<V2Dashboard />} />
        )}
        {(activeTab === "all" || activeTab === "map") && (
          <CompRow label="Campus Map" v1={<V1Map />} v2={<V2Map />} />
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: 56, color: "#333", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em" }}>
        ParkPulse · Built for Replit Buildathon · Ohio State University
      </div>
    </div>
  );
}
