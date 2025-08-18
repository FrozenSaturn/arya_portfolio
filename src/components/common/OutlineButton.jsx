import React from "react";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function OutlineButton({ children, className = "" }) {
  return (
    <button
      className={cx(
        "rounded-full border border-white/10 px-4 py-1.5 text-sm font-semibold text-white/90 hover:bg-white/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600",
        className
      )}
    >
      {children}
    </button>
  );
}
