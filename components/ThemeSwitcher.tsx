"use client";

import { useState } from "react";
import { useTheme, type Theme } from "@/lib/theme-context";

const themes: { id: Theme; label: string; desc: string; dot: string }[] = [
  { id: "light", label: "V1", desc: "Light",  dot: "#C4622D" },
  { id: "dark",  label: "V2", desc: "Luxury", dot: "#C9A44C" },
  { id: "bold",  label: "V3", desc: "Bold",   dot: "#E8320A" },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const current = themes.find((t) => t.id === theme)!;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="flex flex-col gap-1.5 mb-1">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTheme(t.id); setOpen(false); }}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium shadow-xl transition-all duration-150"
              style={{
                background: theme === t.id ? "var(--color-espresso)" : "var(--color-cream-50)",
                color: theme === t.id ? "var(--color-cream-50)" : "var(--color-espresso)",
                border: `2px solid var(--color-espresso)`,
                transform: theme === t.id ? "scale(1.04)" : "scale(1)",
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: t.dot }} />
              <span>{t.label}</span>
              <span className="text-xs opacity-50">{t.desc}</span>
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium shadow-2xl transition-transform duration-150 hover:scale-105"
        style={{
          background: "var(--color-espresso)",
          color: "var(--color-cream-50)",
          border: "2px solid var(--color-espresso)",
        }}
      >
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: current.dot }} />
        {current.label} · {current.desc}
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <path d="M2 8L6 4L10 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
