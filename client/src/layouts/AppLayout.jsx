import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";

export default function AppLayout({ user, onLogout }) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-6 lg:py-8 flex gap-6">
        <aside className="hidden lg:block w-64">
          <Sidebar user={user} onLogout={onLogout} />
        </aside>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0">
        <BottomNav />
      </div>

      <div className="lg:hidden h-16" />
    </div>
  );
}
