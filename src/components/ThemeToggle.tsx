"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Évite les problèmes d'hydratation avec next-themes
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800">
        <span className="sr-only">Chargement du sélecteur de thème</span>
      </div>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors"
      aria-label={
        theme === "dark" ? "Passer au mode clair" : "Passer au mode sombre"
      }
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-yellow-500" />
      ) : (
        <Moon className="h-4 w-4 text-gray-700" />
      )}
    </button>
  );
}
