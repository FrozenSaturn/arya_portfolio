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
import { fetchTweets, createTweet, likeTweet, repostTweet, addComment, incrementView } from "../services/tweets";

const cx = (...c) => c.filter(Boolean).join(" ");

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

function Stat({ icon: Icon, text, onClick, ariaLabel }) {
  return (
    <button
      className="group inline-flex items-center gap-1.5 text-zinc-400 hover:text-sky-400 transition"
      aria-label={ariaLabel || (typeof text === "string" ? text : undefined)}
      onClick={onClick}
      type="button"
    >
      <Icon className="h-4 w-4" />
      <span className="text-xs tabular-nums">{text}</span>
    </button>
  );
}

function TweetCard({ t, onLike, onRepost, onView, onReply }) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [reply, setReply] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
          <Stat icon={MessageCircle} text={t.stats.replies} ariaLabel="Reply" onClick={() => setReplyOpen((v) => !v)} />
          <Stat icon={Repeat2} text={t.stats.reposts} ariaLabel="Repost" onClick={onRepost} />
          <Stat icon={Heart} text={t.stats.likes} ariaLabel="Like" onClick={onLike} />
          <Stat icon={BarChart2} text={t.stats.views} ariaLabel="View" onClick={onView} />
          <Stat icon={Bookmark} text="Save" ariaLabel="Save" />
          <Stat icon={Share} text="Share" ariaLabel="Share" />
        </div>

        {replyOpen && (
          <div className="mt-2 flex items-start gap-2 max-w-[520px]">
            <Avatar name={RESUME_PROFILE.name} />
            <div className="flex-1">
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Post your reply"
                className="w-full resize-none bg-transparent placeholder:text-zinc-500 text-[15px] outline-none text-white min-h-[40px]"
                rows={2}
              />
              <div className="mt-2 flex justify-end">
                <button
                  disabled={!reply.trim() || submitting}
                  onClick={async () => {
                    if (!reply.trim()) return;
                    setSubmitting(true);
                    try {
                      await onReply(reply);
                      setReply("");
                      setReplyOpen(false);
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                  className={cx(
                    "rounded-full bg-white px-3 py-1 text-sm font-semibold text-black transition disabled:opacity-60 disabled:cursor-not-allowed"
                  )}
                >
                  {submitting ? "Replying..." : "Reply"}
                </button>
              </div>
            </div>
          </div>
        )}
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
  const [posting, setPosting] = useState(false);
  const canPost = value.trim().length > 0 && !posting;
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
            onClick={async () => {
              if (!canPost) return;
              try {
                setPosting(true);
                const created = await createTweet(value, RESUME_PROFILE);
                onPost(created);
                setValue("");
              } finally {
                setPosting(false);
              }
            }}
            className={cx(
              "rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black transition disabled:opacity-60 disabled:cursor-not-allowed"
            )}
          >
            {posting ? "Posting..." : "Post"}
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
    fetchTweets().then(setFeed);
    loadTrends().then(setTrends);
    loadWhoToFollow().then(setWho);
  }, []);

  function handlePost(createdTweet) {
    setFeed((f) => [createdTweet, ...f]);
  }

  async function updateWith(serverUpdated) {
    setFeed((f) => f.map((t) => (t.id === serverUpdated.id ? serverUpdated : t)));
  }

  function optimisticUpdate(id, changeFn) {
    setFeed((f) => f.map((t) => (t.id === id ? changeFn(t) : t)));
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
          <TweetCard
            key={t.id}
            t={t}
            onLike={async () => {
              optimisticUpdate(t.id, (cur) => ({
                ...cur,
                stats: { ...cur.stats, likes: (cur.stats.likes ?? 0) + 1 },
              }));
              try {
                const updated = await likeTweet(t.id, 1);
                await updateWith(updated);
              } catch (e) {
                // revert
                optimisticUpdate(t.id, (cur) => ({
                  ...cur,
                  stats: { ...cur.stats, likes: Math.max(0, (cur.stats.likes ?? 1) - 1) },
                }));
                console.error("like error", e);
              }
            }}
            onRepost={async () => {
              optimisticUpdate(t.id, (cur) => ({
                ...cur,
                stats: { ...cur.stats, reposts: (cur.stats.reposts ?? 0) + 1 },
              }));
              try {
                const updated = await repostTweet(t.id, 1);
                await updateWith(updated);
              } catch (e) {
                optimisticUpdate(t.id, (cur) => ({
                  ...cur,
                  stats: { ...cur.stats, reposts: Math.max(0, (cur.stats.reposts ?? 1) - 1) },
                }));
                console.error("repost error", e);
              }
            }}
            onView={async () => {
              // optional: bump views
              try {
                const updated = await incrementView(t.id, 1);
                await updateWith(updated);
              } catch (e) {
                console.error("view error", e);
              }
            }}
            onReply={async (text) => {
              // optimistic bump replies
              optimisticUpdate(t.id, (cur) => ({
                ...cur,
                stats: { ...cur.stats, replies: (cur.stats.replies ?? 0) + 1 },
              }));
              try {
                const updated = await addComment(t.id, text, RESUME_PROFILE);
                await updateWith(updated);
              } catch (e) {
                // revert replies bump
                optimisticUpdate(t.id, (cur) => ({
                  ...cur,
                  stats: { ...cur.stats, replies: Math.max(0, (cur.stats.replies ?? 1) - 1) },
                }));
                console.error("reply error", e);
                throw e;
              }
            }}
          />
        ))}
      </div>

      <div className="lg:hidden p-3">
        <RightRail trends={trends} who={who} />
      </div>
    </main>
  );
}