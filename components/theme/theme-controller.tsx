"use client";

import { useEffect } from "react";
import { readLocalProgress, subscribeToProgress } from "@/lib/progress/repository";
import { selectedTheme, THEME_CSS_VARIABLES } from "@/lib/themes/registry";

export function ThemeController() {
  useEffect(() => {
    const sync = () => applyCurrentTheme();
    sync();
    return subscribeToProgress(sync);
  }, []);
  return null;
}

export function applyCurrentTheme() {
  if (typeof document === "undefined") return;
  const theme = selectedTheme(readLocalProgress().data);
  document.documentElement.dataset.theme = theme.id;
  for (const [token, value] of Object.entries(theme.tokens)) {
    document.documentElement.style.setProperty(THEME_CSS_VARIABLES[token as keyof typeof theme.tokens], value);
  }
}
