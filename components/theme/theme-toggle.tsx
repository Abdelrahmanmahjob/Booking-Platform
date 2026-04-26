"use client";

import { useTheme } from "./theme-provider";
import { MoonIcon, SunIcon, DesktopIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { value: "light", label: "Light", icon: SunIcon },
    { value: "dark", label: "Dark", icon: MoonIcon },
    { value: "system", label: "System", icon: DesktopIcon },
  ] as const;

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          inline-flex items-center justify-center
          w-10 h-10
          rounded-full
          bg-card hover:bg-accent
          border-2 border-border
          text-foreground
          transition-all duration-200
          shadow-lg
          hover:shadow-xl
          hover:scale-110
          focus:outline-none focus:ring-4 focus:ring-primary/30
        "
        aria-label="Toggle theme"
      >
        <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div
            className="
            absolute right-0 mt-2 w-36
            bg-card
            border border-border
            rounded-xl
            shadow-2xl
            overflow-hidden
            animate-scale-in
            z-50
          "
          >
            {themes.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.value}
                  onClick={() => {
                    setTheme(t.value);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full px-4 py-3
                    flex items-center gap-3
                    text-sm
                    transition-colors
                    ${
                      theme === t.value
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent text-foreground"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span>{t.label}</span>
                  {theme === t.value && (
                    <svg
                      className="h-4 w-4 ml-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
