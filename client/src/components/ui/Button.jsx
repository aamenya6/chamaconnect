import React from "react";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

const variants = {
  primary: {
    base: "border",
    style: {
      background: "var(--text)",
      color: "var(--bg)",
      borderColor: "transparent",
    },
  },
  secondary: {
    base: "border",
    style: {
      background: "var(--panel)",
      color: "var(--text)",
      borderColor: "var(--border)",
    },
  },
  ghost: {
    base: "border",
    style: {
      background: "transparent",
      color: "var(--text)",
      borderColor: "var(--border)",
    },
  },
  danger: {
    base: "border",
    style: {
      background: "rgba(239,68,68,0.12)",
      color: "var(--text)",
      borderColor: "rgba(239,68,68,0.25)",
    },
  },
  gradient: {
    base: "border",
    style: {
      color: "#0b0f17",
      borderColor: "transparent",
      background:
        "linear-gradient(135deg, var(--accent-warm) 0%, var(--accent-gold) 25%, var(--accent-cool) 70%, var(--accent-blue) 100%)",
      boxShadow:
        "0 12px 35px rgba(255,106,61,0.18), 0 10px 28px rgba(76,201,240,0.12)",
    },
  },
};

export default function Button({
  as: Comp = "button",
  variant = "secondary",
  className = "",
  style = {},
  children,
  ...props
}) {
  const v = variants[variant] || variants.secondary;

  return (
    <Comp
      className={cx(
        "interactive hover-lift focus-ring inline-flex items-center justify-center gap-2",
        "px-4 py-3 rounded-xl font-medium",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        v.base,
        className,
      )}
      style={{ ...v.style, ...style }}
      {...props}
    >
      {children}
    </Comp>
  );
}
