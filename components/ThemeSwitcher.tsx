"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "bold";

const themes: { id: Theme; label: string; desc: string; dot: string }[] = [
  { id: "light", label: "V1", desc: "Light", dot: "#FDFAF5" },
  { id: "dark",  label: "V2", desc: "Luxury", dot: "#C9A44C" },
  { id: "bold",  label: "V3", desc: "Bold", dot: "#E8320A" },
];

export default function ThemeSwitcher() {
  const [active, setActive] = useState<Theme>("light");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = (localStorage.getItem("kaaleen-theme") as Theme) || "light";
    setActive(stored);
    applyTheme(stored);
  }, []);

  function applyTheme(theme: Theme) {
    const root = document.documentElement;
    if (theme === "light") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }
    localStorage.setItem("kaaleen-theme", theme);
  }

  function select(theme: Theme) {
    setActive(theme);
    applyTheme(theme);
    setOpen(false);
  }

  const current = themes.find((t) => t.id === active)!;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Expanded options */}
      {open && (
        <div className="flex flex-col gap-1.5 mb-1">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => select(t.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-medium shadow-lg transition-all duration-200 ${
                active === t.id
                  ? "bg-espresso text-cream-50 scale-105"
                  : "bg-cream-50 text-espresso border border-cream-300 hover:border-espresso"
              }`}
              style={
                active === t.id
                  ? { backgroundColor: "var(--color-espresso)", color: "var(--color-cream-50)" }
                  : { backgroundColor: "var(--color-cream-50)", color: "var(--color-espresso)", borderColor: "var(--color-cream-300)" }
              }
            >
              <span
                className="w-2.5 h-2.5 rounded-full border border-cream-300 flex-shrink-0"
                style={{ backgroundColor: t.dot, borderColor: "var(--color-cream-300)" }}
              />
              <span>{t.label}</span>
              <span className="text-xs opacity-60">{t.desc}</span>
            </button>
          ))}
        </div>
      )}

      {/* Trigger tab */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full shadow-xl text-sm font-medium transition-all duration-200 hover:scale-105"
        style={{
          backgroundColor: "var(--color-espresso)",
          color: "var(--color-cream-50)",
        }}
      >
        <span
          className="w-2.5 h-2.5 rounded-full border-2 flex-shrink-0"
          style={{ backgroundColor: current.dot, borderColor: "var(--color-cream-400)" }}
        />
        {current.label} · {current.desc}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <path d="M2 8L6 4L10 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
