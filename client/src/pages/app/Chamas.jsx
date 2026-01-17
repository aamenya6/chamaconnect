import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";

export default function Chamas() {
  const [chamas, setChamas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/chamas");
        setChamas(data.chamas || []);
      } catch (e) {
        setErr(e?.response?.data?.message || "Failed to load chamas");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">My Chamas</h1>
          <p className="text-white/60 mt-1">Groups you belong to.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/app/chamas/join" className="px-3 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15">
            Join
          </Link>
          <Link to="/app/chamas/create" className="px-3 py-2 rounded-xl bg-white text-black font-medium hover:opacity-90">
            Create
          </Link>
        </div>
      </div>

      {loading && <div className="text-white/60">Loading...</div>}
      {err && <div className="text-red-300">{err}</div>}

      {!loading && !err && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chamas.map((c) => (
            <Link
              key={c._id}
              to={`/app/chamas/${c._id}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
            >
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm text-white/60 mt-1 line-clamp-2">{c.description || "No description"}</div>
              <div className="mt-3 text-xs text-white/60 flex justify-between">
                <span>{c.currency}</span>
                <span className="px-2 py-1 rounded-full bg-white/10 border border-white/10">
                  {c.inviteCode}
                </span>
              </div>
            </Link>
          ))}

          {chamas.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:col-span-2 lg:col-span-3">
              <div className="font-medium">No chamas yet</div>
              <div className="text-white/60 text-sm mt-1">
                Create one or join with an invite code.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
