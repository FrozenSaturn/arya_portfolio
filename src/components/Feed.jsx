import React, { useEffect, useState } from "react";
import {
  BadgeCheck,
  MessageCircle,
  Repeat2,
  Heart,
  Share,
  BarChart2,
  Bookmark,
  Image as ImageIcon,
  FileText,
  Smile,
  Calendar,
  MapPin,
  MoreHorizontal,
} from "lucide-react";
import RightRail from "./RightRail";
import Avatar from "./common/Avatar";
import { RESUME_PROFILE } from "../constants/profile";

const cx = (...c) => c.filter(Boolean).join(" ");

// Backend plumbing – swap these with real API calls later
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function loadFeed() {
  return Promise.resolve([
    {
      id: "1",
      author: { name: "Mark V.", handle: "@markv", verified: true },
      time: "Aug 14",
      text:
        "Switching my stack: lower fees, crypto transfers, more features — shipping this week.",
      media: {
        kind: "image",
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
              "rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black transition disabled:opacity-60 disabled:cursor-not-allowed"
            )}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Feed() {
  const [feed, setFeed] = useState([]);
  const [trends, setTrends] = useState([]);
  const [who, setWho] = useState([]);

  useEffect(() => {
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
    setFeed((f) => [newTweet, ...f]);
    // fetch(`${API_BASE_URL}/tweet`, { method: 'POST', body: JSON.stringify({ text }) })
  }

  return (
    <main className="min-w-0 flex-1 border-x border-white/10">
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

      <div>
        {feed.map((t) => (
          <TweetCard key={t.id} t={t} />
        ))}
      </div>

      <div className="lg:hidden p-3">
        <RightRail trends={trends} who={who} />
      </div>
    </main>
  );
}
