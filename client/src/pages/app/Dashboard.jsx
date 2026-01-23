import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border t-border t-panel p-5">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="t-muted mt-1">
          A calm overview. Start by creating or joining a chama.
        </p>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <Link to="/app/chamas/create" className="px-4 py-3 rounded-xl bg-white text-black font-medium text-center">
            Create a Chama
          </Link>
          <Link to="/app/chamas/join" className="px-4 py-3 rounded-xl t-panel border t-border hover:bg-white/15 text-center">
            Join a Chama
          </Link>
          <Link to="/app/chamas" className="px-4 py-3 rounded-xl t-panel border t-border hover:t-panel text-center">
            View My Chamas
          </Link>
        </div>
      </div>
    </div>
  );
}
