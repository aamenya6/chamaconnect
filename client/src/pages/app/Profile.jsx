import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { getMyProfile } from "../../lib/api";

export default function Profile({ onLogout }) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getMyProfile();
        setProfile(res.profile || null);
      } catch {
        setErr("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const hardLogout = () => {
    // Ensure token-based spec works, plus existing auth helper keys.
    localStorage.removeItem("token");
    localStorage.removeItem("cc_token");
    localStorage.removeItem("cc_user");
    onLogout?.();
    window.location.href = "/login";
  };

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="text-white/60 mt-1">Your account information (mock for now).</p>
        </div>

        <Button variant="danger" onClick={hardLogout}>
          Logout
        </Button>
      </div>

      {loading && <div className="text-white/60">Loading...</div>}
      {err && <div className="text-red-300">{err}</div>}

      {!loading && !err && profile && (
        <Card className="space-y-4">
          <div>
            <div className="text-white/60 text-sm">Name</div>
            <div className="font-semibold">{profile.name}</div>
          </div>

          <div>
            <div className="text-white/60 text-sm">Email</div>
            <div className="font-medium">{profile.email}</div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <div className="text-white/60 text-sm">Phone</div>
              <div className="font-medium">{profile.phone}</div>
            </div>
            <div>
              <div className="text-white/60 text-sm">Location</div>
              <div className="font-medium">{profile.location}</div>
            </div>
          </div>

          <div>
            <div className="text-white/60 text-sm">Joined</div>
            <div className="font-medium">{profile.joinedAt}</div>
          </div>

          <div className="text-white/60 text-sm">
            Next upgrades: edit profile, avatar, security settings, and account deletion flow.
          </div>
        </Card>
      )}
    </div>
  );
}
