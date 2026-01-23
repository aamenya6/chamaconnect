import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { getChamaById, getChamaMembers } from "../../lib/api";

function RolePill({ role }) {
  const map = {
    Admin: "bg-indigo-500/15 border-indigo-500/30 text-indigo-200",
    Treasurer: "bg-amber-500/15 border-amber-500/30 text-amber-200",
    Member: "bg-emerald-500/15 border-emerald-500/30 text-emerald-200",
  };
  const cls = map[role] || "t-panel border-white/15 text-white/80";
  return <span className={`px-2 py-1 rounded-full border text-xs ${cls}`}>{role}</span>;
}

export default function Members() {
  const { chamaId } = useParams();
  const [loading, setLoading] = useState(true);
  const [chama, setChama] = useState(null);
  const [members, setMembers] = useState([]);
  const [err, setErr] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const [c, m] = await Promise.all([getChamaById(chamaId), getChamaMembers(chamaId)]);
        setChama(c.chama);
        setMembers(m.members || []);
      } catch {
        setErr("Failed to load members.");
      } finally {
        setLoading(false);
      }
    })();
  }, [chamaId]);

  const openActions = (member) => setSelected(member);
  const closeActions = () => setSelected(null);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Members</h1>
          <p className="t-muted mt-1">
            Chama: <span className="text-white">{chama?.name || chamaId}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button as={Link} to={`/app/chamas/${chamaId}`} variant="ghost">
            Back to overview
          </Button>
          <Button variant="secondary" disabled>
            Invite member (UI later)
          </Button>
        </div>
      </div>

      {loading && <div className="text-white/60">Loading...</div>}
      {err && <div className="text-red-300">{err}</div>}

      {!loading && !err && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {members.map((m) => (
            <Card key={m.id} className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold">{m.name}</div>
                  <div className="t-muted text-sm">{m.email}</div>
                </div>
                <RolePill role={m.role} />
              </div>

              <div className="pt-2">
                <Button variant="ghost" onClick={() => openActions(m)}>
                  Actions
                </Button>
              </div>
            </Card>
          ))}

          {members.length === 0 && (
            <Card className="sm:col-span-2 lg:col-span-3">
              <div className="font-medium">No members yet</div>
              <div className="t-muted text-sm mt-1">Invite members to grow the chama.</div>
            </Card>
          )}
        </div>
      )}

      {/* Simple actions panel (UI only) */}
      {selected && (
        <Card className="space-y-3">
          <div className="font-semibold">Member actions (UI only)</div>
          <div className="t-muted text-sm">
            Selected: <span className="text-white">{selected.name}</span> — {selected.role}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" disabled>
              Promote to Admin
            </Button>
            <Button variant="secondary" disabled>
              Make Treasurer
            </Button>
            <Button variant="danger" disabled>
              Remove member
            </Button>
            <Button variant="ghost" onClick={closeActions}>
              Close
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
