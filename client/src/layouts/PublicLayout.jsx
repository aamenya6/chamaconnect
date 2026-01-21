import React from "react";
import { Outlet, Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function PublicLayout({ user, onLogout }) {
  return (
    <div className="min-h-screen">
     <header
  className="sticky top-0 z-50 backdrop-blur border-b"
  style={{
    borderColor: "var(--border)",
    background: "color-mix(in srgb, var(--bg) 75%, transparent)",
  }}
>
  {/* Inner header container */}
  <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
    
    {/* Logo (LEFT) */}
    <Link
      to="/"
      className="font-semibold tracking-wide shrink-0"
    >
      Chama<span className="t-muted">Connect</span>
    </Link>

    {/* Flexible spacer */}
    <div className="flex-1" />

    {/* Navigation actions (RIGHT) */}
    <nav className="flex items-center gap-2 flex-wrap justify-end max-w-[70%] sm:max-w-none">
      <ThemeToggle />

      {user ? (
        <>
          <Link
            to="/app"
            className="interactive hover-lift focus-ring px-2.5 py-2 sm:px-3 rounded-lg border t-border t-panel whitespace-nowrap"
          >
            Open App
          </Link>

          <button
            onClick={onLogout}
            className="interactive hover-lift focus-ring px-2.5 py-2 sm:px-3 rounded-lg border t-border whitespace-nowrap"
            style={{ background: "transparent" }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="interactive hover-lift focus-ring px-2.5 py-2 sm:px-3 rounded-lg border t-border whitespace-nowrap"
            style={{ background: "transparent" }}
          >
            Login
          </Link>

          <Link
            to="/register"
            className="interactive hover-lift focus-ring px-2.5 py-2 sm:px-3 rounded-lg border t-border t-panel whitespace-nowrap"
          >
            Sign Up
          </Link>
        </>
      )}
    </nav>
  </div>
</header>


      <main className="mx-auto max-w-6xl px-4 py-10">
        <Outlet />
      </main>

      <footer className="border-t t-border t-text">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm flex items-center gap-3">
          <span>© {new Date().getFullYear()} ChamaConnect</span>
          <span>A gateway to transparent savings.</span>
        </div>
      </footer>
    </div>
  );
}
