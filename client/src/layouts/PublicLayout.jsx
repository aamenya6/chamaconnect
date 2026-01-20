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
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold tracking-wide">
            Chama<span className="t-muted">Connect</span>
          </Link>

          <nav className="flex items-center gap-2">
            <ThemeToggle />
            {user ? (
              <>
                <Link
                  to="/app"
                  className="px-3 py-2 rounded-lg t-panel hover:bg-white/15 border border-white/10"
                >
                  Open App
                </Link>
                <button
                  onClick={onLogout}
                  className="px-3 py-2 rounded-lg bg-white/5 hover:t-panel border border-white/10"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-lg bg-white/5 hover:t-panel border border-white/10"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-lg t-panel hover:bg-white/15 border border-white/10"
                >
                  Create account
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 pb-24">
        <Outlet />
      </main>

      <footer className="border-t t-border t-text">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm flex justify-between">
          <span>© {new Date().getFullYear()} ChamaConnect</span>
          <span>Transparent savings, calm UI.</span>
        </div>
      </footer>
    </div>
  );
}
