import React, { useMemo } from "react";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function Avatar({ name = "?", className = "", src }) {
  const initials = useMemo(
    () =>
      name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    [name]
  );
  if (src) {
    return (
      <img
        alt={name}
        src={src}
        className={cx(
          "h-10 w-10 rounded-full object-cover ring-1 ring-white/10",
          className
        )}
      />
    );
  }
  return (
    <div
      className={cx(
        "h-10 w-10 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 grid place-items-center text-sm font-semibold text-white",
        className
      )}
      aria-hidden
    >
      {initials}
    </div>
  );
}
