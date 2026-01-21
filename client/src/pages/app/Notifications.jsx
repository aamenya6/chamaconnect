import React, { useEffect, useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { getNotifications } from "../../lib/api";

export default function Notifications() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getNotifications();
        setNotifications(res.notifications || []);
      } catch {
        setErr("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Notifications</h1>
          <p className="text-white/60 mt-1">
            You have <span className="text-white">{unreadCount}</span> unread notification(s).
          </p>
        </div>

        <Button variant="secondary" onClick={markAllRead} disabled={loading || notifications.length === 0}>
          Mark all as read
        </Button>
      </div>

      {loading && <div className="text-white/60">Loading...</div>}
      {err && <div className="text-red-300">{err}</div>}

      {!loading && !err && (
        <div className="space-y-3">
          {notifications.map((n) => (
            <Card key={n.id} className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    {!n.read && <span className="inline-block w-2 h-2 rounded-full bg-orange-400" />}
                    {n.title}
                  </div>
                  <div className="text-white/60 text-sm mt-1">{n.message}</div>
                  <div className="text-white/50 text-xs mt-2">{n.date}</div>
                </div>

                {!n.read && (
                  <Button variant="ghost" onClick={() => markRead(n.id)}>
                    Mark read
                  </Button>
                )}
              </div>
            </Card>
          ))}

          {notifications.length === 0 && (
            <Card>
              <div className="font-medium">All caught up</div>
              <div className="text-white/60 text-sm mt-1">No notifications available.</div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
