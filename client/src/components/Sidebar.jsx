import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Bell, User, Settings, LogOut, PlusCircle } from "lucide-react";

const linkBase =
  "flex items-center gap-3 px-3 py-2 rounded-xl border t-border hover:t-panel transition";
const active = "t-panel";

export default function Sidebar({ user, onLogout }) {
  return (
    <div className="rounded-2xl border t-border t-panel p-3">
      <div className="px-3 py-3">
        <div className="font-semibold">ChamaConnect</div>
        <div className="text-sm t-muted">
          {user?.name ? `Hi, ${user.name}` : "Welcome"}
        </div>
      </div>

      <div className="space-y-2">
        <NavLink
          to="/app/dashboard"
          end
          className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/app/chamas"
          className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}
        >
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
          to="/app/notifications"
          className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}
        >
          <Bell size={18} />
          Notifications
        </NavLink>

        <NavLink
          to="/app/profile"
          className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}
        >
          <User size={18} />
          Profile
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
        className="mt-4 w-full flex items-center gap-3 px-3 py-2 rounded-xl border t-border hover:t-panel transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
