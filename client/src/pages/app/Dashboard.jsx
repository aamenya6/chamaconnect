import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-white/60 mt-1">
          A calm overview. Start by creating or joining a chama.
        </p>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <Link to="/app/chamas/create" className="px-4 py-3 rounded-xl bg-white text-black font-medium text-center">
            Create a Chama
          </Link>
          <Link to="/app/chamas/join" className="px-4 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 text-center">
            Join a Chama
          </Link>
          <Link to="/app/chamas" className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-center">
            View My Chamas
          </Link>
        </div>
      </div>
    </div>
  );
}
