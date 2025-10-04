// src/components/AI.jsx
import React, { useState } from "react";
import {
  Sparkles,
  ArrowUp,
  ImageIcon,
  Edit,
  Mic,
  Paperclip,
  Maximize2,
  Zap,
  ChevronDown,
  History as HistoryIcon,
} from "lucide-react";

export default function AI() {
  const [prompt, setPrompt] = useState("");

  const handleTextareaInput = (e) => {
    setPrompt(e.target.value);
    // Auto-resize the textarea
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <main className="min-w-0 flex-1 border-x border-white/10 flex flex-col bg-black">
      {/* Canvas */}
      <div className="relative flex-1 overflow-hidden">
        {/* Starry background (3 layered radial-dot fields) */}
        <div className="absolute inset-0 bg-[#0b0d10]" />
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(1px_1px_at_25px_35px,rgba(255,255,255,0.35)_1px,transparent_1px),radial-gradient(1px_1px_at_60px_75px,rgba(255,255,255,0.25)_1px,transparent_1px),radial-gradient(1px_1px_at_90%_20%,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:72px_72px,110px_110px,160px_160px]" />
        {/* Soft vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_40%,rgba(21,24,30,0.65)_0%,rgba(11,12,16,0.95)_60%,#0b0d10_100%)]" />

        {/* Center stack */}
        <div className="relative z-10 h-full w-full px-4">
          <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center pb-24 pt-10">
            {/* Logo */}
            <div className="mb-8 flex items-center gap-3">
              <Sparkles className="h-10 w-10 text-white" />
              <span className="text-4xl font-bold tracking-tight text-white">
                Aria
              </span>
            </div>

            {/* Prompt input */}
            <div className="relative w-full">
              {/* Input shell (matches Grok’s pill look) */}
              <div className="rounded-2xl border border-white/10 bg-zinc-900/80 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] backdrop-blur supports-[backdrop-filter]:bg-zinc-900/70">
                <textarea
                  value={prompt}
                  onChange={handleTextareaInput}
                  placeholder="Ask anything about Arya"
                  rows={1}
                  className="w-full resize-none overflow-hidden bg-transparent px-4 pb-12 pt-4 text-[15px] leading-6 text-white placeholder:text-zinc-500 focus:outline-none"
                />
                {/* Bottom controls inside the shell */}
                <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2">
                  
                  <span className="pointer-events-auto inline-grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-zinc-800/70 hover:bg-zinc-700/70">
                    <Mic className="h-4 w-4 text-zinc-300" />
                  </span>
                </div>

                <button
                  disabled={!prompt.trim()}
                  className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-zinc-700 text-white hover:bg-zinc-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ArrowUp className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
