import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden selection:bg-primary/30">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      <div className="flex flex-col flex-1 min-w-0">
        <Header onToggleSidebar={() => setCollapsed(c => !c)} />
        <main className="flex-1 overflow-auto bg-background/50 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
