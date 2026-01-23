import React from "react";

export default function Settings({ user }) {
  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="rounded-2xl border t-border t-panel p-5">
        <div className="t-muted text-sm">Signed in as</div>
        <div className="mt-1 font-medium">{user?.name || "User"}</div>
        <div className="t-muted">{user?.email || ""}</div>

        <div className="mt-4 text-sm t-muted">
          Next upgrades: profile edit, notifications, 2FA, and activity logs.
        </div>
      </div>
    </div>
  );
}
