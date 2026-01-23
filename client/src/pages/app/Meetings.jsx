import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { getChamaById, getChamaMeetings } from "../../lib/api";

function isFutureDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const now = new Date();
  return d.getTime() >= new Date(now.toDateString()).getTime();
}

export default function Meetings() {
  const { chamaId } = useParams();
  const [loading, setLoading] = useState(true);
  const [chama, setChama] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [err, setErr] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: "", date: "", time: "", location: "" });

  useEffect(() => {
    (async () => {
      try {
        const [c, m] = await Promise.all([getChamaById(chamaId), getChamaMeetings(chamaId)]);
        setChama(c.chama);
        setMeetings(m.meetings || []);
      } catch {
        setErr("Failed to load meetings.");
      } finally {
        setLoading(false);
      }
    })();
  }, [chamaId]);

  const upcoming = useMemo(
    () => meetings.filter((x) => x.status === "Upcoming" || isFutureDate(x.date)),
    [meetings]
  );
  const past = useMemo(
    () => meetings.filter((x) => x.status === "Past" || !isFutureDate(x.date)),
    [meetings]
  );

  const toggleCreate = () => setShowCreate((s) => !s);

  const createMeetingUIOnly = (e) => {
    e.preventDefault();
    const id = `mt_${Date.now()}`;
    const next = {
      id,
      title: form.title || "Untitled meeting",
      date: form.date || "2026-02-10",
      time: form.time || "19:00",
      location: form.location || "TBD",
      status: "Upcoming",
    };
    setMeetings((prev) => [next, ...prev]);
    setForm({ title: "", date: "", time: "", location: "" });
    setShowCreate(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Meetings</h1>
          <p className="t-muted mt-1">
            Chama: <span className="text-white">{chama?.name || chamaId}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button as={Link} to={`/app/chamas/${chamaId}`} variant="ghost">
            Back to overview
          </Button>
          <Button variant="secondary" onClick={toggleCreate}>
            {showCreate ? "Close" : "Create meeting"}
          </Button>
        </div>
      </div>

      {loading && <div className="t-muted">Loading...</div>}
      {err && <div className="text-red-300">{err}</div>}

      {!loading && !err && showCreate && (
        <Card className="space-y-3">
          <div className="font-semibold">Create meeting (UI only)</div>

          <form onSubmit={createMeetingUIOnly} className="grid sm:grid-cols-2 gap-3">
            <Input
              placeholder="Meeting title"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            />
            <Input
              placeholder="Location (e.g. Google Meet)"
              value={form.location}
              onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
            />
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
            />
            <Input
              type="time"
              value={form.time}
              onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
            />

            <div className="sm:col-span-2 flex gap-2">
              <Button variant="primary" type="submit">
                Save meeting
              </Button>
              <Button variant="ghost" type="button" onClick={() => setShowCreate(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {!loading && !err && (
        <div className="grid lg:grid-cols-2 gap-4">
          <Card className="space-y-3">
            <div className="font-semibold">Upcoming</div>
            {upcoming.map((m) => (
              <div key={m.id} className="rounded-xl border t-border t-panel p-4">
                <div className="font-medium">{m.title}</div>
                <div className="t-muted text-sm mt-1">
                  {m.date} • {m.time} • {m.location}
                </div>
              </div>
            ))}
            {upcoming.length === 0 && <div className="t-muted text-sm">No upcoming meetings.</div>}
          </Card>

          <Card className="space-y-3">
            <div className="font-semibold">Past</div>
            {past.map((m) => (
              <div key={m.id} className="rounded-xl border t-border t-panel p-4">
                <div className="font-medium">{m.title}</div>
                <div className="t-muted text-sm mt-1">
                  {m.date} • {m.time} • {m.location}
                </div>
              </div>
            ))}
            {past.length === 0 && <div className="t-muted text-sm">No past meetings.</div>}
          </Card>
        </div>
      )}
    </div>
  );
}
