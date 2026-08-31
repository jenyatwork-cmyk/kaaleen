"use client";

import { useTheme } from "@/lib/theme-context";
import BoldHomePage    from "@/components/bold/BoldHomePage";
import VintageHomePage from "@/components/vintage/VintageHomePage";
import LightDarkHomePage from "./LightDarkHomePage";

export default function HomeClient() {
  const { theme } = useTheme();
  if (theme === "bold")  return <BoldHomePage />;
  if (theme === "light") return <VintageHomePage />;
  return <LightDarkHomePage />;
}
