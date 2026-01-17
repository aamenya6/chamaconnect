import React from "react";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Textarea({ className = "", style = {}, ...props }) {
  return (
    <textarea
      className={cx(
        "interactive focus-ring w-full px-4 py-3 rounded-xl border outline-none",
        className
      )}
      style={{
        background: "var(--panel)",
        borderColor: "var(--border)",
        color: "var(--text)",
        ...style,
      }}
      {...props}
    />
  );
}
