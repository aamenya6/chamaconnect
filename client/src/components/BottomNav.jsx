import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Bell, User, Settings } from "lucide-react";

const item = "flex flex-col items-center justify-center py-2 text-xs";
const iconWrap = "p-2 rounded-xl border border-white/10";

export default function BottomNav() {
  const base = "bg-black/60 backdrop-blur border-t border-white/10";

  return (
    <nav className={base}>
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-5">
        <NavLink
          to="/app/dashboard"
          end
          className={({ isActive }) => `${item} ${isActive ? "text-white" : "text-white/70"}`}
        >
          <span className={`${iconWrap} ${isActive ? "bg-white/10" : "bg-white/5"}`}>
            <LayoutDashboard size={18} />
          </span>
          Home
        </NavLink>

        <NavLink
          to="/app/chamas"
          className={({ isActive }) => `${item} ${isActive ? "text-white" : "text-white/70"}`}
        >
          <span className={`${iconWrap} ${isActive ? "bg-white/10" : "bg-white/5"}`}>
            <Users size={18} />
          </span>
          Chamas
        </NavLink>

        <NavLink
          to="/app/notifications"
          className={({ isActive }) => `${item} ${isActive ? "text-white" : "text-white/70"}`}
        >
          <span className={`${iconWrap} ${isActive ? "bg-white/10" : "bg-white/5"}`}>
            <Bell size={18} />
          </span>
          Alerts
        </NavLink>

        <NavLink
          to="/app/profile"
          className={({ isActive }) => `${item} ${isActive ? "text-white" : "text-white/70"}`}
        >
          <span className={`${iconWrap} ${isActive ? "bg-white/10" : "bg-white/5"}`}>
            <User size={18} />
          </span>
          Profile
        </NavLink>

        <NavLink
          to="/app/settings"
          className={({ isActive }) => `${item} ${isActive ? "text-white" : "text-white/70"}`}
        >
          <span className={`${iconWrap} ${isActive ? "bg-white/10" : "bg-white/5"}`}>
            <Settings size={18} />
          </span>
          Settings
        </NavLink>
      </div>
    </nav>
  );
}
