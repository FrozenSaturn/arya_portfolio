import React from "react";
import {
  BadgeCheck,
  Feather,
  Home,
  Search as SearchIcon,
  Bell,
  Mail,
  Sparkles,
  Bookmark,
  BriefcaseBusiness as Briefcase,
  Users,
  ShieldCheck,
  User2,
  MoreHorizontal,
  X as XIcon,
  BookOpen,
  FileUser,
} from "lucide-react";
import Avatar from "./common/Avatar";
import { RESUME_PROFILE } from "../constants/profile";

const NAV = [
  { label: "Profile", icon: User2 },
  { label: "Home", icon: Home },
  { label: "Experience", icon: Briefcase },
  { label: "AI", icon: Sparkles },
  { label: "Contact Me", icon: Mail },
  { label: "Lore", icon: BookOpen },
  { label: "Communities", icon: Users },
  { label: "Resume", icon: FileUser },
];

export default function LeftNav({ activeTab, onSelect }) {
  return (
    <aside className="hidden xl:flex flex-col items-stretch w-[275px] shrink-0 px-2">
      <div className="sticky top-0 pt-2">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onSelect?.("Home");
          }}
          className="inline-flex items-center gap-2 p-3 mt-1 text-white/90 font-semibold"
          aria-label="X"
        >
          <XIcon className="h-7 w-7" />
        </a>

        <nav className="mt-1 space-y-1">
          {NAV.map(({ label, icon: Icon }) => {
            const isActive = activeTab === label;
            return (
              <button
                type="button"
                key={label}
                onClick={() => onSelect?.(label)}
                aria-current={isActive ? "page" : undefined}
                className="w-full text-left flex items-center gap-4 px-4 py-2.5 rounded-full hover:bg-white/5 text-[20px] font-semibold text-white/90"
              >
                <span
                  className={`grid place-items-center h-10 w-10 rounded-full ${
                    isActive ? " text-white fill-white" : ""
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-3 px-2">
          <button className="w-full rounded-full bg-white py-3 text-[17px] font-semibold text-black hover:bg-sky-600 transition inline-flex items-center justify-center gap-2">
            Post
          </button>
        </div>

        <div className="mt-4 px-2">
          <div className="flex items-center gap-3 rounded-2xl p-3 hover:bg-white/5 cursor-pointer">
            <Avatar name={RESUME_PROFILE.name} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-sm">
                <span className="font-semibold text-white truncate">
                  {RESUME_PROFILE.name}
                </span>
                {RESUME_PROFILE.verified && (
                  <BadgeCheck className="h-4 w-4 text-sky-400" />
                )}
              </div>
              <div className="text-xs text-zinc-400 truncate">
                {RESUME_PROFILE.handle}
              </div>
            </div>
            <MoreHorizontal className="h-5 w-5 text-zinc-400" />
          </div>
        </div>
      </div>
    </aside>
  );
}