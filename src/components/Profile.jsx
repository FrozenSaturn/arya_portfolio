import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  BadgeCheck,
  CalendarDays,
  Link as LinkIcon,
  MapPin,
  MoreHorizontal,
  Ghost,
  MessageCircle,
  Repeat2,
  Heart,
  Share,
  BarChart2,
  Bookmark,
} from "lucide-react";
import { RESUME_PROFILE } from "../constants/profile";
import Avatar from "./common/Avatar";

// Local utility (same as Feed.jsx)
const cx = (...c) => c.filter(Boolean).join(" ");

// Local Stat and TweetCard (mirrors Feed.jsx styling)
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

const Pill = ({ children, active = false }) => (
  <button
    className={`flex-1 py-4 text-sm font-semibold transition whitespace-nowrap ${
      active
        ? "text-white border-b-4 border-sky-500"
        : "text-zinc-400 hover:bg-white/10"
    }`}
    aria-pressed={active}
  >
    {children}
  </button>
);

// New MapBanner component
const MapBanner = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // Coordinates for Michael Nagar, Kolkata
  const lng = 88.444389;
  const lat = 22.670417;

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/toner-v2/style.json?key=jTWWOa8PbirDEVet2vIr`,
      center: [lng, lat],
      zoom: 15,
      attributionControl: false,
      navigationControl: false,
    });

    // Add a marker to the map
    new maplibregl.Marker({ color: "black" })
      .setLngLat([lng, lat])
      .addTo(map.current);

    map.current.on("load", () => {
      map.current?.easeTo({ zoom: 5, duration: 2000 });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full">
      <div ref={mapContainer} className="h-48 w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/100 pointer-events-none" />
    </div>
  );
};

// Profile-specific feed with different static tweets
function ProfileFeed() {
  const [feed] = useState([
    {
      id: "p1",
      author: {
        name: RESUME_PROFILE.name,
        handle: RESUME_PROFILE.handle,
        verified: RESUME_PROFILE.verified,
      },
      time: "Aug 19",
      text:
        "Enjoy your stay on my portfolio stranger",
      media: null,
      stats: { replies: 69, reposts: 69, likes: 69, views: "69" },
    },
    {
      id: "p2",
      author: {
        name: "Arya's Mum",
        handle: "@god",
        verified: RESUME_PROFILE.verified,
      },
      time: "Aug 19",
      text:
        "GET BACK TO STUDIES!!!!",
      media: null,
      stats: { replies: 3, reposts: 21, likes: 96, views: "5,304" },
    },
    {
      id: "p3",
      author: {
        name: "Arya's Friend",
        handle: "@kaushik",
        verified: true,
      },
      time: "Aug 19",
      text:
        "Cool",
      media: null,
      stats: { replies: 11, reposts: 37, likes: 210, views: "17.6K" },
    },
  ]);

  return (
    <div>
      {feed.map((t) => (
        <TweetCard key={t.id} t={t} />
      ))}
    </div>
  );
}

export default function Profile() {
  return (
    <main className="min-w-0 flex-1 border-x border-white/10">
      {/* Sticky header */}
      <div className="sticky top-0 z-20 backdrop-blur bg-zinc-950/80">
        <div className="flex items-center gap-6 px-4 py-1">
          <Ghost className="h-8 w-8" strokeWidth={1.25} />
          <div>
            <div className="text-lg font-bold">{RESUME_PROFILE.name}</div>
            <div className="text-xs text-zinc-400">123 Posts</div>
          </div>
        </div>
      </div>

      {/* Profile content */}
      <div>
        {/* Map Banner */}
        <MapBanner />

        {/* Profile details */}
        <div className="px-4 pb-4">
          <div className="flex justify-between items-start -mt-16">
            <Avatar
              name={RESUME_PROFILE.name}
              className="h-32 z-10 w-32 border-4 border-zinc-950"
            />
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-1">
              <span className="text-xl font-bold">{RESUME_PROFILE.name}</span>
              {RESUME_PROFILE.verified && (
                <BadgeCheck className="h-5 w-5 text-sky-400" />
              )}
            </div>
            <div className="text-zinc-400 text-sm">{RESUME_PROFILE.handle}</div>
          </div>

          <div className="mt-3 text-sm">{RESUME_PROFILE.bio}</div>

          <div className="mt-3 text-zinc-400 text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{RESUME_PROFILE.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <LinkIcon className="h-4 w-4" />
                <a
                  href={RESUME_PROFILE.links.portfolio}
                  className="text-sky-400 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {RESUME_PROFILE.links.portfolio.replace("https://", "")}
                </a>
              </div>
            </div>
            <div className="mt-1 flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <span>Joined October 2003</span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-4 text-sm">
            <div>
              <span className="font-bold text-white">33</span>
              <span className="text-zinc-400"> Repositories</span>
            </div>
            <div>
              <span className="font-bold text-white">3</span>
              <span className="text-zinc-400"> Real Friends</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <Pill active>Posts</Pill>
        <Pill>Replies</Pill>
        <Pill>Media</Pill>
        <Pill>Likes</Pill>
      </div>

      {/* Profile-specific feed (same look as Feed.jsx, different content) */}
      <ProfileFeed />
    </main>
  );
}