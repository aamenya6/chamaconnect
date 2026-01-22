import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { getChamaById, getChamaMembers } from "../../lib/api";

export default function ChamaDetails() {
  const { chamaId } = useParams();

  const [loading, setLoading] = useState(true);
  const [chama, setChama] = useState(null);
  const [members, setMembers] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const [cRes, mRes] = await Promise.all([
          getChamaById(chamaId),        // GET /api/chamas/:chamaId
          getChamaMembers(chamaId)      // GET /api/chamas/:chamaId/members
        ]);

        setChama(cRes?.chama || null);
        setMembers(mRes?.members || []);
      } catch (e) {
        setErr(e?.response?.data?.message || "Failed to load chama details.");
      } finally {
        setLoading(false);
      }
    })();
  }, [chamaId]);

  return (
    <div className="space-y-5">
      {/* Chama sub-nav */}
      <div className="flex flex-wrap gap-2">
        <Button as={Link} to={`/app/chamas/${chamaId}`} variant="secondary">
          Overview
        </Button>
        <Button as={Link} to={`/app/chamas/${chamaId}/contributions`} variant="secondary">
          Contributions
        </Button>
        <Button as={Link} to={`/app/chamas/${chamaId}/members`} variant="secondary">
          Members
        </Button>
        <Button as={Link} to={`/app/chamas/${chamaId}/meetings`} variant="secondary">
          Meetings
        </Button>
      </div>

      {loading && <div className="text-white/60">Loading chama…</div>}

      {err && (
        <Card>
          <div className="text-red-300 font-medium">Error</div>
          <div className="text-white/60 text-sm mt-1">{err}</div>
        </Card>
      )}

      {!loading && !err && chama && (
        <>
          <Card>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-semibold">{chama.name}</h1>
                <p className="text-white/60 mt-1">{chama.description || "No description"}</p>
              </div>

              <div className="flex items-center gap-2">
                {chama.cycle && (
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm">
                    {chama.cycle}
                  </span>
                )}
                {typeof chama.contributionAmount === "number" && (
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm">
                    KES {chama.contributionAmount.toLocaleString()}
                  </span>
                )}
                {chama.myRole && (
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm">
                    Role: <span className="font-semibold">{chama.myRole}</span>
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-sm text-white/70">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                Members: <span className="text-white">{chama.memberCount ?? members.length}</span>
              </span>
              {chama.inviteCode && (
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  Invite: <span className="text-white font-semibold">{chama.inviteCode}</span>
                </span>
              )}
            </div>
          </Card>

          <Card>
            <h2 className="font-semibold">Members</h2>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              {members.map((m) => (
                <div key={m.memberId || m.userId} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="font-medium">{m.name}</div>
                  <div className="text-sm text-white/60">{m.email}</div>
                  <div className="mt-2 text-xs text-white/60">
                    Role: <span className="text-white">{m.role}</span>
                  </div>
                </div>
              ))}
            </div>

            {members.length === 0 && (
              <div className="text-white/60 text-sm mt-2">No members found.</div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
