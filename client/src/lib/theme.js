const KEY = "cc_theme"; // "dark" | "light"

export function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export function getInitialTheme() {
  const stored = localStorage.getItem(KEY);
  if (stored === "dark" || stored === "light") return stored;

  // fallback to OS preference
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  return prefersDark ? "dark" : "light";
}

export function setTheme(theme) {
  localStorage.setItem(KEY, theme);
  applyTheme(theme);
}

export function toggleTheme(current) {
  const next = current === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}
