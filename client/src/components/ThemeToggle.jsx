import React, { useEffect, useState } from "react";
import { getInitialTheme, toggleTheme, applyTheme } from "../lib/theme";
import { Moon, Sun } from "lucide-react";
import Button from "./ui/Button";


export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const t = getInitialTheme();
    setTheme(t);
    applyTheme(t);
  }, []);

  const onToggle = () => {
    const next = toggleTheme(theme);
    setTheme(next);
  };

  const Icon = theme === "dark" ? Sun : Moon;
  const label = theme === "dark" ? "Light" : "Dark";

  return (
    <Button
      onClick={onToggle}
      className="interactive hover-lift focus-ring inline-flex items-center gap-2 px-3 py-2 rounded-lg border"
      style={{
        background: "var(--panel)",
        borderColor: "var(--border)",
      }}
      aria-label={`Switch to ${label} mode`}
    >
      <Icon size={18} />
      <span className="text-sm" style={{ color: "var(--muted)" }}>
        {label}
      </span>
    </Button>
  );
}
