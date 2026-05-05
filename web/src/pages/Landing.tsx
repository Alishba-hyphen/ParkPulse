import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { Car, ChevronRight, Activity, Map, Zap, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const PULSE_CSS = `
@keyframes parkpulse-ring {
  0%   { transform: scale(0.3); opacity: 0.75; }
  100% { transform: scale(1);   opacity: 0; }
}
@keyframes parkpulse-glow {
  0%, 100% { transform: scale(0.92); opacity: 0.32; }
  50%       { transform: scale(1.14); opacity: 0.68; }
}
.pp-ring {
  position: absolute;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  border: 2.5px solid #FF6B00;
  animation: parkpulse-ring 2.2s ease-out infinite;
  pointer-events: none;
}
.pp-ring-2 { animation-delay: 0.73s; }
.pp-ring-3 { animation-delay: 1.46s; }
.pp-glow {
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: #FF6B00;
  filter: blur(72px);
  animation: parkpulse-glow 1.8s ease-in-out infinite;
  pointer-events: none;
  opacity: 0.45;
}
`;

const UNIVERSITIES = [
  "Ohio State University",
  "University of Michigan",
  "Penn State University",
  "University of Texas",
  "UCLA",
  "University of Florida",
  "Michigan State University",
  "Indiana University",
  "Purdue University",
  "University of Illinois",
];

function LoginModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState(() => { try { return localStorage.getItem("parkpulse_name") || ""; } catch { return ""; } });
  const [university, setUniversity] = useState(() => { try { return localStorage.getItem("parkpulse_university") || "Ohio State University"; } catch { return "Ohio State University"; } });
  const [, navigate] = useLocation();

  function save() {
    try {
      localStorage.setItem("parkpulse_name", name.trim());
      localStorage.setItem("parkpulse_university", university);
      window.dispatchEvent(new Event("parkpulse_profile_updated"));
    } catch {}
    onClose();
    navigate("/dashboard");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#111] border border-border rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-primary" />
            <span className="font-bold text-base">Sign in to ParkPulse</span>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1.5 block">Your Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Alex"
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/60"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1.5 block">Your University</label>
            <div className="relative">
              <select
                value={university}
                onChange={e => setUniversity(e.target.value)}
                className="w-full appearance-none bg-secondary/50 border border-border rounded-lg px-4 py-3 pr-10 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/60"
              >
                {UNIVERSITIES.map(u => (
                  <option key={u} value={u} style={{ background: "#111" }}>{u}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={save}
              className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold text-sm rounded-lg py-3 hover:bg-white/90 transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
            <button
              onClick={save}
              className="w-full flex items-center justify-center gap-2 bg-primary text-black font-semibold text-sm rounded-lg py-3 hover:bg-primary/90 transition-colors"
            >
              Continue with Email
            </button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            By continuing you agree to ParkPulse's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export function Landing() {
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = PULSE_CSS;
    document.head.appendChild(el);
    styleRef.current = el;
    return () => el.remove();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 text-primary font-bold text-2xl tracking-tight">
          <Car className="h-7 w-7" />
          ParkPulse
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLogin(true)}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-lg hover:bg-secondary/50"
          >
            Sign in
          </button>
          <button
            onClick={() => setShowLogin(true)}
            className="text-sm font-semibold text-black bg-primary hover:bg-primary/90 transition-colors px-4 py-2 rounded-lg"
          >
            Get started
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="relative flex items-center justify-center mb-12" style={{ width: 340, height: 340 }}>
          <div className="pp-glow" />
          <div className="pp-ring" />
          <div className="pp-ring pp-ring-2" />
          <div className="pp-ring pp-ring-3" />

          <div className="relative z-10 flex flex-col items-center gap-3">
            <div
              className="flex items-center justify-center rounded-full border-2"
              style={{ width: 90, height: 90, background: "rgba(255,107,0,0.15)", borderColor: "rgba(255,107,0,0.4)" }}
            >
              <div className="flex items-center justify-center rounded-full" style={{ width: 64, height: 64, background: "#FF6B00" }}>
                <Car className="h-8 w-8 text-black" />
              </div>
            </div>
            <div className="text-3xl font-black tracking-tight" style={{ letterSpacing: "-0.04em" }}>
              <span style={{ color: "#FF6B00" }}>Park</span>
              <span className="text-foreground">Pulse</span>
            </div>
            <div className="text-sm text-muted-foreground font-medium">Know before you park.</div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-medium mb-6 text-muted-foreground uppercase tracking-widest">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          Any Campus, Any University
        </div>

        <p className="text-lg text-muted-foreground max-w-md mb-10 leading-relaxed">
          Live, spot-by-spot parking intelligence for every major lot on campus.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLogin(true)}
            className="h-14 px-10 text-base font-bold uppercase tracking-wider flex items-center gap-3 rounded-lg text-black bg-primary hover:bg-primary/90 transition-colors"
            style={{ boxShadow: "0 0 40px -10px rgba(255,107,0,0.55)" }}
          >
            Get Started <ChevronRight className="h-5 w-5" />
          </button>
          <Link href="/dashboard">
            <button className="h-14 px-6 text-base font-medium text-muted-foreground hover:text-foreground border border-border hover:border-border/80 rounded-lg transition-colors">
              Demo →
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-left w-full max-w-4xl border-t border-border/50 pt-14 mx-auto">
          {[
            { icon: Activity, label: "Live Telemetry", desc: "Real-time availability for every spot, updated every 30 seconds." },
            { icon: Map, label: "Interactive Map", desc: "Full campus map with color-coded lot overlays and car-level grids." },
            { icon: Zap, label: "Any University", desc: "Sign in and select your university. ParkPulse works wherever you park." },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex flex-col gap-3">
              <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center border border-border">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-base">{label}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </main>

      <div className="h-16" />

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}
