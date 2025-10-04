import React, { useMemo } from "react";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function Avatar({
  name = "?",
  className = "",
  src = "/Arya_DP.png",
  hoverSrc = "/Arya_DP_Hover.png",
}) {
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

  // Fallback to initials only if no images are provided
  if (!src && !hoverSrc) {
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

  // Default: image avatar with hover swap and subtle fade
  return (
    <div
      className={cx(
        "relative h-10 w-10 rounded-full overflow-hidden group ring-1 ring-white/10",
        className
      )}
      aria-label={name}
    >
      <img
        alt={name}
        src={src}
        className="object-fill transition-opacity duration-100 opacity-100 group-hover:opacity-90"
      />
      <img
        alt="sunglasses"
        aria-hidden
        src={hoverSrc}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-100 opacity-0 group-hover:opacity-100"
      />
    </div>
  );
}