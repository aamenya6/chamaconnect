import React from "react";

export default function Settings({ user }) {
  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="text-white/60 text-sm">Signed in as</div>
        <div className="mt-1 font-medium">{user?.name || "User"}</div>
        <div className="text-white/60">{user?.email || ""}</div>

        <div className="mt-4 text-sm text-white/60">
          Next upgrades: profile edit, notifications, 2FA, and activity logs.
        </div>
      </div>
    </div>
  );
}
