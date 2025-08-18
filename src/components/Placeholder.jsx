// src/components/Placeholder.jsx
import React from "react";

export default function Placeholder({ title }) {
  return (
    <main className="min-w-0 flex-1 border-x border-white/10">
      <div className="sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60 bg-zinc-950/80 z-10">
        <div className="px-4 py-3 text-xl font-extrabold">{title}</div>
      </div>
      <div className="p-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <div className="text-2xl font-semibold">{title}</div>
          <p className="text-zinc-400 mt-2">Coming soon…</p>
        </div>
      </div>
    </main>
  );
}

