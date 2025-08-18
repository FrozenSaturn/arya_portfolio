import React from "react";
import { Search as SearchIcon, BadgeCheck } from "lucide-react";
import OutlineButton from "./common/OutlineButton";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function RightRail({ trends, who }) {
  return (
    <aside className="hidden lg:block w-[350px] shrink-0 pr-4">
      <div className="sticky top-0 pt-2">
        <div className="px-3">
          <label className="relative block">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
              <SearchIcon className="h-5 w-5" />
            </span>
            <input
              aria-label="Search"
              placeholder="Search"
              className="w-full rounded-full bg-zinc-900/70 pl-12 pr-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none border border-white/10 focus:border-sky-500"
            />
          </label>
        </div>

        <div className="mt-3 space-y-3">
          <div className="mx-3 rounded-2xl bg-zinc-900/60 border border-white/10">
            <div className="p-4">
              <div className="text-xl font-extrabold">Subscribe to Premium</div>
              <p className="text-sm text-zinc-400 mt-1">
                Unlock new features and, if eligible, receive a share of revenue.
              </p>
              <button className="mt-3 rounded-full bg-sky-500 px-4 py-1.5 text-sm font-semibold hover:bg-sky-600">
                Subscribe
              </button>
            </div>
          </div>

          <div className="mx-3 rounded-2xl bg-zinc-900/60 border border-white/10">
            <div className="p-4">
              <div className="text-xl font-extrabold">What’s happening</div>
              <div className="mt-2 divide-y divide-white/10">
                {trends.map((t) => (
                  <div key={t.topic} className="py-3">
                    <div className="text-[13px] text-zinc-400">{t.category}</div>
                    <div className="font-semibold text-[15px]">{t.topic}</div>
                    <div className="text-[13px] text-zinc-500">{t.posts}</div>
                  </div>
                ))}
              </div>
              <button className="mt-2 text-sky-500 text-sm font-semibold">Show more</button>
            </div>
          </div>

          <div className="mx-3 rounded-2xl bg-zinc-900/60 border border-white/10">
            <div className="p-4">
              <div className="text-xl font-extrabold">Who to follow</div>
              <div className="mt-2 space-y-3">
                {who.map((p) => (
                  <div key={p.handle} className="flex items-center gap-3">
                    <div className={cx("h-10 w-10 rounded-full", p.avatarColor)} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1 text-[15px]">
                        <span className="font-semibold text-white truncate">
                          {p.name}
                        </span>
                        {p.verified && (
                          <BadgeCheck className="h-4 w-4 text-sky-400 shrink-0" />
                        )}
                      </div>
                      <div className="text-[13px] text-zinc-400 truncate">{p.handle}</div>
                    </div>
                    <OutlineButton>Follow</OutlineButton>
                  </div>
                ))}
              </div>
              <button className="mt-3 text-sky-500 text-sm font-semibold">Show more</button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
