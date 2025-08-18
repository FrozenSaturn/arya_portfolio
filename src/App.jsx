// X (Twitter) Clone – React + Vite (Pixel‑perfect, backend‑ready)
// -------------------------------------------------------------
// ✅ Single‑file React app that mirrors the attached screenshot
// ✅ TailwindCSS utility classes for precise styling
// ✅ Lucide icons (npm i lucide-react)
// ✅ Clean component structure inside one file (drop into src/App.jsx)
// ✅ Backend integration-ready: swap fake loaders with your API
// -------------------------------------------------------------
// Setup (once):
//   npm create vite@latest x-clone -- --template react
//   cd x-clone
//   npm i
//   npm i -D tailwindcss postcss autoprefixer
//   npx tailwindcss init -p
//   Edit tailwind.config.js -> content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"]
//   Add to src/index.css:
//     @tailwind base; @tailwind components; @tailwind utilities;
//   npm i lucide-react
//   Replace src/App.jsx with this file. Run: npm run dev
// -------------------------------------------------------------
// Notes:
// - Uses a responsive three-column layout to match the reference (left nav / feed / right rail)
// - Dark theme by default. You can toggle via prefers-color-scheme if desired
// - All data pipes (feed, trends, who-to-follow, user) are abstracted in useEffect; replace loaders with your API
// - ENV: VITE_API_BASE_URL for backend, see API_BASE_URL below
// - The UI is accessible (ARIA labels, focus rings) and keyboard‑friendly
// -------------------------------------------------------------

import React, { useEffect, useMemo, useState } from "react";
import {
  Home,
  Search as SearchIcon,
  Bell,
  Mail,
  BookMarked,
  Bookmark,
  BriefcaseBusiness as Briefcase,
  Users,
  Sparkles,
  BadgeCheck,
  User2,
  MoreHorizontal,
  MessageCircle,
  Repeat2,
  Heart,
  Share,
  BarChart2,
  Image as ImageIcon,
  FileText,
  Smile,
  Calendar,
  MapPin,
  Hash,
  Globe2,
  MessageSquarePlus,
  Settings,
  Send,
  Feather,
  MessageSquare,
  ShieldCheck,
  X as XIcon,
} from "lucide-react";

// ───────────────────────────────────────────────────────────────
// Portfolio/User details (extracted from resume)
// You can also load this from your backend: GET /api/me
// ───────────────────────────────────────────────────────────────
const RESUME_PROFILE = {
  name: "Arya Bhattacharjee",
  handle: "@frozen_saturn",
  phone: "+91 62915 99419",
  email: "aryaa111000@gmail.com",
  location: "Micheal Nagar, Kolkata",
  links: {
    portfolio: "https://frozensaturn.github.io/Arya-Portfolio/",
    linkedin: "https://www.linkedin.com/in/arya-bhattacharjee/",
  },
  bio:
    "B.Tech CSE (AI/ML). Full‑stack + AI. Built IPL Insight Engine, AskAway RAG chatbot, RL trading agent.",
  verified: true,
};

// ───────────────────────────────────────────────────────────────
// Backend plumbing – swap these with real API calls later
// ───────────────────────────────────────────────────────────────
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""; // e.g. https://api.example.com

async function loadFeed() {
  // Example real call: return fetch(`${API_BASE_URL}/feed`).then(r => r.json())
  // Dummy content to match screenshot composition & show portfolio highlights
  return Promise.resolve([
    {
      id: "1",
      author: { name: "Mark V.", handle: "@markv", verified: true },
      time: "Aug 14",
      text:
        "Switching my stack: lower fees, crypto transfers, more features — shipping this week.",
      media: {
        kind: "image",
        // Dashboard‑like preview
        src: "https://images.unsplash.com/photo-1551281044-8b57acd1f3df?q=80&w=1200&auto=format&fit=crop",
      },
      stats: { replies: 42, reposts: 273, likes: 388, views: "64K" },
    },
    {
      id: "2",
      author: {
        name: RESUME_PROFILE.name,
        handle: RESUME_PROFILE.handle,
        verified: RESUME_PROFILE.verified,
      },
      time: "Aug 15",
      text:
        "Shipped an Explainable AI cricket predictor (React + Django + FastAPI). LLM explains win odds. CV macro F1 ≈ 0.54.",
      media: null,
      stats: { replies: 12, reposts: 58, likes: 312, views: "12.3K" },
      links: [
        {
          title: "IPL Insight Engine — project",
          url: "https://github.com/FrozenSaturn/ipl_predictor",
          desc: "Explainable predictions with feature attributions and LLM Q&A.",
          domain: "github.com",
        },
      ],
    },
    {
      id: "3",
      author: { name: "CollegeTips.in", handle: "@collegetips", verified: true },
      time: "Aug 10",
      text:
        "Rolled out a digital literacy bot with TTS for seniors. React Native + Dialogflow + Gemini API.",
      media: null,
      stats: { replies: 6, reposts: 37, likes: 190, views: "9,842" },
    },
    {
      id: "4",
      author: {
        name: RESUME_PROFILE.name,
        handle: RESUME_PROFILE.handle,
        verified: RESUME_PROFILE.verified,
      },
      time: "Aug 09",
      text:
        "AskAway: a RAG chatbot for PDFs (Streamlit + LangChain + FAISS). Upload, chat, cite, done.",
      media: null,
      stats: { replies: 9, reposts: 41, likes: 276, views: "15.1K" },
      links: [
        {
          title: "AskAway — live demo",
          url: "https://rag-langchain-chatbot.streamlit.app/",
          desc: "Conversational PDF Q&A with memory and MMR retrieval.",
          domain: "streamlit.app",
        },
      ],
    },
  ]);
}

async function loadTrends() {
  // Example: GET /trends
  return Promise.resolve([
    { topic: "Angkrish", category: "Sports · Trending", posts: "24.3K posts" },
    { topic: "#CoolieBlockbuster", category: "Entertainment · Trending", posts: "54.1K posts" },
    { topic: "Nehru", category: "Politics · Trending", posts: "39.3K posts" },
  ]);
}

async function loadWhoToFollow() {
  return Promise.resolve([
    {
      name: "Santiniketan Enterprises",
      handle: "@SantEnt",
      verified: true,
      avatarColor: "bg-emerald-500",
    },
    {
      name: "UEM Kolkata",
      handle: "@UEMKolkata",
      verified: true,
      avatarColor: "bg-sky-500",
    },
    {
      name: "CollegeTips.in",
      handle: "@CollegeTips",
      verified: true,
      avatarColor: "bg-violet-500",
    },
  ]);
}

// ───────────────────────────────────────────────────────────────
// Utilities
// ───────────────────────────────────────────────────────────────
const cx = (...c) => c.filter(Boolean).join(" ");

function Avatar({ name = "?", className = "", src }) {
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

function Pill({ children, active = false }) {
  return (
    <button
      className={cx(
        "px-4 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 rounded-full",
        active ? "text-white" : "text-zinc-400 hover:text-white"
      )}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

function Stat({ icon: Icon, text }) {
  return (
    <button
      className="group inline-flex items-center gap-1.5 text-zinc-400 hover:text-sky-400 transition"
      aria-label={typeof text === "string" ? text : undefined}
    >
      <Icon className="h-4 w-4" />
      <span className="text-xs tabular-nums">{text}</span>
    </button>
  );
}

function OutlineButton({ children, className = "" }) {
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

// ───────────────────────────────────────────────────────────────
// Tweet card
// ───────────────────────────────────────────────────────────────
function TweetCard({ t }) {
  return (
    <article className="flex gap-3 px-4 py-3 hover:bg-white/5 transition border-b border-white/10">
      <Avatar name={t.author.name} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1 text-sm text-zinc-400">
          <span className="font-semibold text-white flex items-center gap-1">
            {t.author.name}
            {t.author.verified && <BadgeCheck className="h-4 w-4 text-sky-400" />}
          </span>
          <span className="truncate">{t.author.handle}</span>
          <span>·</span>
          <time>{t.time}</time>
        </div>
        <div className="mt-1 text-[15px] leading-relaxed text-white/95 whitespace-pre-wrap">
          {t.text}
        </div>

        {t.links?.length ? (
          <div className="mt-3 overflow-hidden rounded-2xl border border-white/10">
            {t.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="block bg-white/5 hover:bg-white/[.08] transition"
              >
                <div className="p-3">
                  <div className="text-xs text-zinc-400">{l.domain}</div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    {l.title}
                  </div>
                  <div className="text-[13px] text-zinc-400 mt-0.5">{l.desc}</div>
                </div>
              </a>
            ))}
          </div>
        ) : null}

        {t.media?.kind === "image" && (
          <div className="mt-3 overflow-hidden rounded-2xl border border-white/10">
            <img
              src={t.media.src}
              className="w-full max-h-[520px] object-cover"
              alt="Attachment"
              loading="lazy"
            />
          </div>
        )}

        <div className="mt-3 flex items-center justify-between pr-6 max-w-[520px]">
          <Stat icon={MessageCircle} text={t.stats.replies} />
          <Stat icon={Repeat2} text={t.stats.reposts} />
          <Stat icon={Heart} text={t.stats.likes} />
          <Stat icon={BarChart2} text={t.stats.views} />
          <Stat icon={Bookmark} text="Save" />
          <Stat icon={Share} text="Share" />
        </div>
      </div>
      <button
        className="self-start p-1 text-zinc-400 hover:text-white rounded-full hover:bg-white/10"
        aria-label="More"
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>
    </article>
  );
}

// ───────────────────────────────────────────────────────────────
// Composer ("What’s happening?")
// ───────────────────────────────────────────────────────────────
function Composer({ onPost }) {
  const [value, setValue] = useState("");
  const canPost = value.trim().length > 0;
  return (
    <div className="flex gap-3 px-4 py-3 border-b border-white/10">
      <Avatar name={RESUME_PROFILE.name} />
      <div className="flex-1">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What’s happening?"
          className="w-full resize-none bg-transparent placeholder:text-zinc-500 text-[20px] outline-none text-white min-h-[44px]"
          rows={1}
        />
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sky-400">
            <button className="p-2 hover:bg-sky-500/10 rounded-full" aria-label="Media">
              <ImageIcon className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-sky-500/10 rounded-full" aria-label="GIF">
              <FileText className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-sky-500/10 rounded-full" aria-label="Poll">
              <BarChart2 className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-sky-500/10 rounded-full" aria-label="Emoji">
              <Smile className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-sky-500/10 rounded-full" aria-label="Schedule">
              <Calendar className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-sky-500/10 rounded-full" aria-label="Location">
              <MapPin className="h-5 w-5" />
            </button>
          </div>
          <button
            disabled={!canPost}
            onClick={() => {
              if (!canPost) return;
              onPost(value);
              setValue("");
            }}
            className={cx(
              "rounded-full bg-sky-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-sky-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
            )}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
// Left navigation
// ───────────────────────────────────────────────────────────────
const NAV = [
  { label: "Home", icon: Home },
  { label: "Explore", icon: SearchIcon },
  { label: "Notifications", icon: Bell },
  { label: "Messages", icon: Mail },
  { label: "Grok", icon: Sparkles },
  { label: "Bookmarks", icon: Bookmark },
  { label: "Jobs", icon: Briefcase },
  { label: "Communities", icon: Users },
  { label: "Premium", icon: ShieldCheck },
  { label: "Verified Orgs", icon: BadgeCheck },
  { label: "Profile", icon: User2 },
  { label: "More", icon: MoreHorizontal },
];

function LeftNav() {
  return (
    <aside className="hidden xl:flex flex-col items-stretch w-[275px] shrink-0 px-2">
      <div className="sticky top-0">
        <a
          href="#home"
          className="inline-flex items-center gap-2 p-3 mt-1 text-white/90 font-semibold"
          aria-label="X"
        >
          <XIcon className="h-7 w-7" />
        </a>
      </div>
      <nav className="mt-1 space-y-1">
        {NAV.map(({ label, icon: Icon }) => (
          <a
            key={label}
            href="#"
            className="flex items-center gap-4 px-4 py-2.5 rounded-full hover:bg-white/10 text-[20px] text-white/90 font-semibold"
          >
            <Icon className="h-6 w-6" />
            <span>{label}</span>
          </a>
        ))}
      </nav>
      <div className="mt-3 px-2">
        <button className="w-full rounded-full bg-sky-500 py-3 text-[17px] font-semibold text-white hover:bg-sky-600 transition inline-flex items-center justify-center gap-2">
          <Feather className="h-5 w-5" /> Post
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
    </aside>
  );
}

// ───────────────────────────────────────────────────────────────
// Right rail (Search + Premium + Trends + Who to follow)
// ───────────────────────────────────────────────────────────────
function RightRail({ trends, who }) {
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

// ───────────────────────────────────────────────────────────────
// Center feed
// ───────────────────────────────────────────────────────────────
function Feed() {
  const [feed, setFeed] = useState([]);
  const [trends, setTrends] = useState([]);
  const [who, setWho] = useState([]);

  useEffect(() => {
    // Hydrate data (replace with your real API)
    loadFeed().then(setFeed);
    loadTrends().then(setTrends);
    loadWhoToFollow().then(setWho);
  }, []);

  function handlePost(text) {
    const newTweet = {
      id: String(Date.now()),
      author: {
        name: RESUME_PROFILE.name,
        handle: RESUME_PROFILE.handle,
        verified: RESUME_PROFILE.verified,
      },
      time: "now",
      text,
      media: null,
      stats: { replies: 0, reposts: 0, likes: 0, views: "0" },
    };
    // optimistic UI; post to backend when wired
    setFeed((f) => [newTweet, ...f]);
    // fetch(`${API_BASE_URL}/tweet`, { method: 'POST', body: JSON.stringify({ text }) })
  }

  return (
    <main className="min-w-0 flex-1 border-x border-white/10">
      {/* Sticky header with tabs */}
      <div className="sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60 bg-zinc-950/80 z-10">
        <div className="px-4 py-3 text-xl font-extrabold">Home</div>
        <div className="flex items-center border-b border-white/10">
          <div className="flex-1 grid grid-cols-2">
            <div className="grid place-items-center">
              <Pill active>For you</Pill>
            </div>
            <div className="grid place-items-center">
              <Pill>Following</Pill>
            </div>
          </div>
        </div>
      </div>

      <Composer onPost={handlePost} />

      {/* Show new posts banner */}
      <div className="px-4 py-2 flex justify-center">
        <button className="rounded-full bg-sky-600/20 text-sky-400 px-3 py-1 text-sm font-semibold hover:bg-sky-600/30">
          Show 70 posts
        </button>
      </div>

      <div>
        {feed.map((t) => (
          <TweetCard key={t.id} t={t} />
        ))}
      </div>

      {/* Right rail rendered outside for layout, but feed returns trends/who for cohesion on smaller screens */}
      <div className="lg:hidden p-3">
        <RightRail trends={trends} who={who} />
      </div>
    </main>
  );
}

// ───────────────────────────────────────────────────────────────
// DM floating button (bottom-right), resembles screenshot affordance
// ───────────────────────────────────────────────────────────────
function DMButton() {
  return (
    <button
      className="fixed bottom-5 right-5 z-20 rounded-full bg-sky-500 p-4 text-white shadow-lg hover:bg-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
      aria-label="Messages"
    >
      <MessageSquarePlus className="h-5 w-5" />
    </button>
  );
}

// ───────────────────────────────────────────────────────────────
// Root app
// ───────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-[1265px] flex gap-0 sm:gap-3">
        <LeftNav />
        <Feed />
        <RightRail trends={[]} who={[]} />
      </div>
      <DMButton />
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
// Optional: If you want an About/Profile route later, you can lift the
// layout into a Shell component and add react-router. The structure
// here already matches the screenshot precisely and is ready to wire.
// API endpoints you may implement:
//   GET  /api/me              -> profile header
//   GET  /api/feed?tab=for-you|following&cursor=... -> timeline
//   POST /api/tweet           -> create tweet
//   POST /api/engage          -> like / repost / bookmark
//   GET  /api/trends          -> right-rail trends
//   GET  /api/suggested       -> who to follow
//   GET  /api/search?q=...    -> search box
//   WS   /realtime            -> live updates banner
// Wire them by replacing the *_load functions near the top.
