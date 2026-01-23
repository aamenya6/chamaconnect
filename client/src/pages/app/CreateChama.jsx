import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";


export default function CreateChama() {
  const [form, setForm] = useState({ name: "", description: "", currency: "KES" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const { data } = await api.post("/chamas", form);
      nav(`/app/chamas/${data.chama._id}`);
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to create chama");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-semibold">Create a Chama</h1>

      <form onSubmit={submit} className="rounded-2xl border t-border t-panel p-5 space-y-3">
      <Card className="space-y-3">
        <Input
          className="w-full px-4 py-3 rounded-xl t-panel border t-border outline-none focus:border-white/30"
          placeholder="Chama name"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
        />
        <Textarea
          className="w-full px-4 py-3 rounded-xl t-panel border t-border outline-none focus:border-white/30"
          placeholder="Description (optional)"
          rows={4}
          value={form.description}
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
        />
        <Input
          className="w-full px-4 py-3 rounded-xl t-panel border t-border outline-none focus:border-white/30"
          placeholder="Currency (e.g. KES)"
          value={form.currency}
          onChange={(e) => setForm((p) => ({ ...p, currency: e.target.value }))}
        />

        {err && <div className="text-red-300 text-sm">{err}</div>}

        <Button
          disabled={loading}
          className="px-4 py-3 rounded-xl bg-white text-black font-medium hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create"}
        </Button>
        </Card>
      </form>
    </div>
  );
}
