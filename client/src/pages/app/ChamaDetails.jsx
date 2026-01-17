import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";

export default function ChamaDetails() {
  const { chamaId } = useParams();
  const [chama, setChama] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/chamas/${chamaId}`);
        setChama(data.chama);
      } catch (e) {
        setErr(e?.response?.data?.message || "Failed to load chama");
      } finally {
        setLoading(false);
      }
    })();
  }, [chamaId]);

  if (loading) return <div className="text-white/60">Loading...</div>;
  if (err) return <div className="text-red-300">{err}</div>;
  if (!chama) return null;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">{chama.name}</h1>
            <p className="text-white/60 mt-1">{chama.description || "No description"}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm">
              {chama.currency}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm">
              Invite: <span className="font-semibold">{chama.inviteCode}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="font-semibold">Members</h2>
        <div className="mt-3 grid sm:grid-cols-2 gap-3">
          {chama.members.map((m, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="font-medium">{m.user?.name || "Member"}</div>
              <div className="text-sm text-white/60">{m.user?.email || ""}</div>
              <div className="mt-2 text-xs text-white/60">
                Role: <span className="text-white">{m.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
