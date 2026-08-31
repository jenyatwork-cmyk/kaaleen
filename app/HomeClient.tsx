"use client";

import { useTheme } from "@/lib/theme-context";
import BoldHomePage from "@/components/bold/BoldHomePage";
import LightDarkHomePage from "./LightDarkHomePage";

export default function HomeClient() {
  const { theme } = useTheme();
  if (theme === "bold") return <BoldHomePage />;
  return <LightDarkHomePage />;
}
