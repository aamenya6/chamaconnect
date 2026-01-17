import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";


export default function JoinChama() {
  const [inviteCode, setInviteCode] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const { data } = await api.post("/chamas/join", { inviteCode });
      nav(`/app/chamas/${data.chamaId}`);
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to join");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Join a Chama</h1>

      <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
      <Card className="space-y-3">
        <Input
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-white/30 uppercase tracking-wider"
          placeholder="Invite code (e.g. A1B2C3D4)"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
        />

        {err && <div className="text-red-300 text-sm">{err}</div>}

        <Button
          disabled={loading}
          className="px-4 py-3 rounded-xl bg-white text-black font-medium hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Joining..." : "Join"}
        </Button>
        </Card>
      </form>
    </div>
  );
}
