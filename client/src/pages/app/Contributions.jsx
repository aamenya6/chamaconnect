import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { getChamaById, getChamaContributions } from "../../lib/api";

function StatusBadge({ status }) {
  const styles =
    status === "Paid"
      ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-200"
      : status === "Pending"
      ? "bg-amber-500/15 border-amber-500/30 text-amber-200"
      : "bg-red-500/15 border-red-500/30 text-red-200";

  return (
    <span className={`px-2 py-1 rounded-full border text-xs ${styles}`}>
      {status}
    </span>
  );
}

export default function Contributions() {
  const { chamaId } = useParams();
  const [loading, setLoading] = useState(true);
  const [chama, setChama] = useState(null);
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [c, r] = await Promise.all([
          getChamaById(chamaId),
          getChamaContributions(chamaId),
        ]);
        setChama(c.chama);
        setRows(r.contributions || []);
      } catch {
        setErr("Failed to load contributions.");
      } finally {
        setLoading(false);
      }
    })();
  }, [chamaId]);

  const totals = useMemo(() => {
    const paid = rows.filter((x) => x.status === "Paid").reduce((s, x) => s + x.amount, 0);
    const pending = rows.filter((x) => x.status === "Pending").reduce((s, x) => s + x.amount, 0);
    const late = rows.filter((x) => x.status === "Late").reduce((s, x) => s + x.amount, 0);
    return { paid, pending, late };
  }, [rows]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Contributions</h1>
          <p className="t-muted mt-1">
            Chama: <span className="text-white">{chama?.name || chamaId}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button as={Link} to={`/app/chamas/${chamaId}`} variant="ghost">
            Back to overview
          </Button>
          <Button variant="secondary" disabled>
            Add contribution (UI later)
          </Button>
        </div>
      </div>

      {loading && <div className="t-muted">Loading...</div>}
      {err && <div className="text-red-300">{err}</div>}

      {!loading && !err && (
        <>
          <div className="grid sm:grid-cols-3 gap-3">
            <Card>
              <div className="t-muted text-sm">Paid</div>
              <div className="text-xl font-semibold mt-1">KES {totals.paid.toLocaleString()}</div>
            </Card>
            <Card>
              <div className="t-muted text-sm">Pending</div>
              <div className="text-xl font-semibold mt-1">KES {totals.pending.toLocaleString()}</div>
            </Card>
            <Card>
              <div className="t-muted text-sm">Late</div>
              <div className="text-xl font-semibold mt-1">KES {totals.late.toLocaleString()}</div>
            </Card>
          </div>

          <Card className="overflow-x-auto">
            <div className="font-semibold mb-3">Recent payments</div>

            <table className="w-full text-sm">
              <thead className="t-muted">
                <tr className="text-left">
                  <th className="py-2 pr-4">Member</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t t-border">
                    <td className="py-3 pr-4">{r.member}</td>
                    <td className="py-3 pr-4">KES {r.amount.toLocaleString()}</td>
                    <td className="py-3 pr-4">{r.date}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {rows.length === 0 && (
              <div className="t-muted text-sm mt-2">No contributions yet.</div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
