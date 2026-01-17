import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, PlusCircle, Settings } from "lucide-react";

const item = "flex flex-col items-center justify-center py-2 text-xs";
const iconWrap = "p-2 rounded-xl border border-white/10";

export default function BottomNav() {
  const base = "bg-black/60 backdrop-blur border-t border-white/10";
  return (
    <nav className={base}>
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-4">
        <NavLink to="/app" end className={({ isActive }) => `${item} ${isActive ? "text-white" : "text-white/70"}`}>
          <span className={`${iconWrap} ${isActive ? "bg-white/10" : "bg-white/5"}`}>
            <LayoutDashboard size={18} />
          </span>
          Home
        </NavLink>

        <NavLink to="/app/chamas" className={({ isActive }) => `${item} ${isActive ? "text-white" : "text-white/70"}`}>
          <span className={`${iconWrap} ${isActive ? "bg-white/10" : "bg-white/5"}`}>
            <Users size={18} />
          </span>
          Chamas
        </NavLink>

        <NavLink
          to="/app/chamas/create"
          className={({ isActive }) => `${item} ${isActive ? "text-white" : "text-white/70"}`}
        >
          <span className={`${iconWrap} ${isActive ? "bg-white/10" : "bg-white/5"}`}>
            <PlusCircle size={18} />
          </span>
          Create
        </NavLink>

        <NavLink to="/app/settings" className={({ isActive }) => `${item} ${isActive ? "text-white" : "text-white/70"}`}>
          <span className={`${iconWrap} ${isActive ? "bg-white/10" : "bg-white/5"}`}>
            <Settings size={18} />
          </span>
          Settings
        </NavLink>
      </div>
    </nav>
  );
}
