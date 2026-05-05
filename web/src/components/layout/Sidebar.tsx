import React from "react";
import { Link, useLocation } from "wouter";
import { Map, LayoutDashboard, List, Bookmark, Car, ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const [location] = useLocation();

  const links = [
    { href: "/dashboard", label: "Overview",    icon: LayoutDashboard },
    { href: "/map",       label: "Campus Map",  icon: Map },
    { href: "/lots",      label: "All Lots",    icon: List },
    { href: "/saved",     label: "Saved Lots",  icon: Bookmark },
  ];

  return (
    <div
      className="border-r bg-sidebar text-sidebar-foreground flex flex-col h-full shrink-0 overflow-hidden"
      style={{
        width: collapsed ? 64 : 256,
        transition: "width 280ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Logo */}
      <div
        className="border-b border-sidebar-border flex items-center shrink-0 overflow-hidden"
        style={{
          height: 64,
          padding: collapsed ? "0 16px" : "0 24px",
          transition: "padding 280ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight min-w-0">
          <Car className="h-6 w-6 shrink-0" />
          <span
            className="whitespace-nowrap overflow-hidden"
            style={{
              opacity: collapsed ? 0 : 1,
              width: collapsed ? 0 : "auto",
              transition: "opacity 200ms ease, width 280ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            ParkPulse
          </span>
        </Link>
      </div>

      {/* Nav links */}
      <div className="flex-1 py-4 flex flex-col gap-1 overflow-hidden"
        style={{ padding: collapsed ? "16px 8px" : "16px 12px", transition: "padding 280ms cubic-bezier(0.4, 0, 0.2, 1)" }}
      >
        {links.map(link => {
          const isActive = location === link.href || (location.startsWith(link.href) && link.href !== "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              title={collapsed ? link.label : undefined}
              className={`flex items-center gap-3 rounded-md transition-colors text-sm font-medium shrink-0 overflow-hidden ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
              style={{
                height: 40,
                padding: collapsed ? "0 10px" : "0 12px",
                justifyContent: collapsed ? "center" : "flex-start",
                transition: "padding 280ms cubic-bezier(0.4, 0, 0.2, 1), justify-content 280ms",
              }}
            >
              <link.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              <span
                className="whitespace-nowrap overflow-hidden"
                style={{
                  opacity: collapsed ? 0 : 1,
                  width: collapsed ? 0 : "auto",
                  transition: "opacity 150ms ease, width 280ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Collapse toggle button */}
      <div className="border-t border-sidebar-border p-2 shrink-0">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center h-9 rounded-md hover:bg-sidebar-accent/50 transition-colors text-muted-foreground hover:text-sidebar-foreground"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
