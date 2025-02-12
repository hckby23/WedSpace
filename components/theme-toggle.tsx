"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-full"
    >
      <Sun className="h-6 w-6 text-gray-200 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-6 w-6 text-gray-200 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
} 