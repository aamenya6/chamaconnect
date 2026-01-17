import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, PlusCircle, LogOut, Settings } from "lucide-react";

const linkBase =
  "flex items-center gap-3 px-3 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition";
const active = "bg-white/10";

export default function Sidebar({ user, onLogout }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="px-3 py-3">
        <div className="font-semibold">ChamaConnect</div>
        <div className="text-sm text-white/60">
          {user?.name ? `Hi, ${user.name}` : "Welcome"}
        </div>
      </div>

      <div className="space-y-2">
        <NavLink to="/app" end className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/app/chamas" className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}>
          <Users size={18} />
          My Chamas
        </NavLink>

        <NavLink
          to="/app/chamas/create"
          className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}
        >
          <PlusCircle size={18} />
          Create Chama
        </NavLink>

        <NavLink
          to="/app/settings"
          className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}
        >
          <Settings size={18} />
          Settings
        </NavLink>
      </div>

      <button
        onClick={onLogout}
        className="mt-4 w-full flex items-center gap-3 px-3 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
