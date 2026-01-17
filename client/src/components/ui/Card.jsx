import React from "react";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Card({ className = "", style = {}, children, ...props }) {
  return (
    <div
      className={cx("rounded-2xl border p-5", className)}
      style={{
        background: "var(--panel)",
        borderColor: "var(--border)",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
