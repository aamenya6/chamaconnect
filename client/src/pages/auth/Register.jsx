import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../../lib/api";
import { saveSession } from "../../lib/auth";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";


export default function Register({ onAuthed }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", form);
      saveSession(data);
      setAuthToken(data.token);
      onAuthed?.(data.user);
      nav("/app");
    } catch (e) {
      setErr(e?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold">Create your account</h2>
      <p className="text-white/60 mt-1">Start a chama or join one with an invite code.</p>

      <form onSubmit={submit} className="mt-6 space-y-3">
        <Input
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-white/30"
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
        />
        <Input
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-white/30"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
        />
        <Input
          type="password"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-white/30"
          placeholder="Password (min 6 chars)"
          value={form.password}
          onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
        />

        {err && <div className="text-red-300 text-sm">{err}</div>}

        <Button
          disabled={loading}
          className="w-full px-4 py-3 rounded-xl bg-white text-black font-medium hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create account"}
        </Button>
      </form>

      <p className="mt-4 text-sm text-white/60">
        Already have an account? <Link className="text-white underline" to="/login">Login</Link>
      </p>
    </div>
  );
}
