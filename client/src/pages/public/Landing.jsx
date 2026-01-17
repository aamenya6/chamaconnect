import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Users, Sparkles } from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

function Pill({ children, tint = "warm" }) {
  const tints = {
    warm: "rgba(255,106,61,0.16)",
    gold: "rgba(255,176,32,0.14)",
    cool: "rgba(76,201,240,0.14)",
    blue: "rgba(109,94,252,0.14)",
  };

  return (
    <span
      className="interactive hover-lift inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm"
      style={{
        background: tints[tint] || "var(--panel)",
        borderColor: "var(--border)",
        color: "var(--text)",
      }}
    >
      {children}
    </span>
  );
}

export default function Landing() {
  return (
    <div className="grid lg:grid-cols-2 gap-10 items-center">
      <div>
        <div className="flex flex-wrap gap-2 mb-6">
          <Pill tint="warm">
            <ShieldCheck size={16} /> Trust-first
          </Pill>
          <Pill tint="cool">
            <Users size={16} /> Member clarity
          </Pill>
          <Pill tint="blue">
            <Sparkles size={16} /> Simple workflow
          </Pill>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
          Run your Chama transparently, from anywhere.
        </h1>

        <p className="mt-4 t-muted text-base sm:text-lg leading-relaxed">
          Track members, decisions, and contributions in one calm dashboard.
          Built for focus — friendly theme, clear actions, no clutter.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button as={Link} to="/register" variant="gradient">
            Create a Chama
          </Button>

          <Button as={Link} to="/login" variant="secondary">
            Join a Chama
          </Button>
        </div>

        <div className="mt-8 grid sm:grid-cols-3 gap-3">
          <div className="gborder">
            <Card>
              <div className="text-sm t-muted">Get Invite Codes</div>
              <div className="mt-1 font-medium">Join Faster</div>
            </Card>
          </div>

          <div className="gborder">
            <Card>
              <div className="text-sm t-muted">Pick Roles</div>
              <div className="mt-1 font-medium">Admin/Member</div>
            </Card>
          </div>

          <div className="gborder">
            <Card>
              <div className="text-sm t-muted">Mobile Ready</div>
              <div className="mt-1 font-medium">Bottom nav</div>
            </Card>
          </div>
        </div>
      </div>

      <div className="preview-shell">
  <div className="preview-inner p-6 sm:p-7">

    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm t-muted">Chama Example</div>
        <div className="text-xl font-semibold text-accent-blue">
          Watu Wa Nguvu
        </div>
      </div>

      <div className="px-3 py-1 rounded-full border border-white/20 bg-white/10">
        Currency: KES
      </div>
    </div>

    <div className="mt-6 grid grid-cols-2 gap-4">
      <div className="stat-card p-4">
        <div className="text-sm t-muted">Members</div>
        <div className="text-2xl font-semibold text-accent-gold mt-1">
          10
        </div>
      </div>

      <div className="stat-card p-4">
        <div className="text-sm t-muted">This month</div>
        <div className="text-2xl font-semibold text-accent-gold mt-1">
          KES 100,000
        </div>
      </div>
    </div>

    <div className="mt-5 action-card p-5">
      <div className="text-sm t-muted">Next action</div>
      <div className="mt-1 font-medium text-accent-warm">
        Confirm contributions & approve payout
      </div>

      <button
        className="interactive hover-lift focus-ring mt-4 px-4 py-2 rounded-xl font-medium"
        style={{
          background:
            "linear-gradient(135deg, var(--accent-warm), var(--accent-gold))",
          color: "#0b0f17",
        }}
      >
        View details
      </button>
    </div>
  </div>
</div>


        <p className="mt-4 text-sm t-muted">
          This is a preview card to show the vibe: clear numbers, simple
          actions, no noise.
        </p>
      </div>
  );
}
