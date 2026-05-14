import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const TOTAL_SLIDES = 7;

const TOP_TRACKS = [
  { rank: 1, title: "Blinding Lights", artist: "The Weeknd", plays: 287 },
  { rank: 2, title: "As It Was", artist: "Harry Styles", plays: 241 },
  { rank: 3, title: "Flowers", artist: "Miley Cyrus", plays: 198 },
  { rank: 4, title: "Anti-Hero", artist: "Taylor Swift", plays: 176 },
  { rank: 5, title: "Unholy", artist: "Sam Smith", plays: 154 },
];

const TOP_ARTISTS = [
  { rank: 1, name: "The Weeknd", hours: 48 },
  { rank: 2, name: "Taylor Swift", hours: 36 },
  { rank: 3, name: "Harry Styles", hours: 29 },
];

const GENRES = [
  { name: "Pop", pct: 42, color: "#1DB954" },
  { name: "R&B", pct: 28, color: "#E07B5D" },
  { name: "Indie", pct: 18, color: "#7EC8C8" },
  { name: "Hip-Hop", pct: 12, color: "#9B8FC4" },
];

const MOODS = [
  { emoji: "🔥", label: "Энергия", pct: 38 },
  { emoji: "🌙", label: "Меланхолия", pct: 31 },
  { emoji: "✨", label: "Радость", pct: 21 },
  { emoji: "💤", label: "Спокойствие", pct: 10 },
];

// Vinyl record
function VinylDisc({ size = 260, spin = true }: { size?: number; spin?: boolean }) {
  return (
    <div
      className={spin ? "animate-spin-slow" : ""}
      style={{ width: size, height: size, position: "relative", flexShrink: 0 }}
    >
      <div
        className="vinyl-record rounded-full absolute inset-0"
        style={{ boxShadow: "0 0 80px rgba(0,0,0,0.9), 0 0 30px rgba(29,185,84,0.1)" }}
      />
      {/* Label */}
      <div
        className="absolute rounded-full flex flex-col items-center justify-center gap-0.5"
        style={{
          width: size * 0.38,
          height: size * 0.38,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "linear-gradient(135deg, #1DB954 0%, #0f8f3c 100%)",
        }}
      >
        <span className="font-display font-black text-black leading-none" style={{ fontSize: size * 0.07 }}>spot</span>
        <span className="font-display font-black text-black leading-none" style={{ fontSize: size * 0.1 }}>IRA</span>
        <div className="rounded-full bg-black mt-0.5" style={{ width: size * 0.07, height: size * 0.07 }} />
      </div>
      {/* Shine */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: 0,
          background: "radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.07) 0%, transparent 55%)",
        }}
      />
    </div>
  );
}

// Sound wave
function SoundWave({ active = true, color = "#1DB954" }: { active?: boolean; color?: string }) {
  const heights = [25, 55, 40, 75, 30, 65, 45, 85, 35, 60, 28, 50];
  return (
    <div className="flex items-end gap-[3px]" style={{ height: 44 }}>
      {heights.map((h, i) => (
        <div
          key={i}
          className={active ? "wave-bar" : ""}
          style={{
            width: 4,
            height: `${h}%`,
            background: color,
            borderRadius: 2,
            opacity: active ? 0.9 : 0.2,
            "--dur": `${0.5 + (i % 4) * 0.15}s`,
            animationDelay: `${i * 0.06}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// Progress bar
function ProgressBar({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex gap-1.5 items-center">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-400"
          style={{
            width: i === current ? 24 : 6,
            height: 4,
            background: i === current ? "#1DB954" : i < current ? "rgba(29,185,84,0.35)" : "rgba(255,255,255,0.15)",
          }}
        />
      ))}
    </div>
  );
}

// Slide wrapper with enter animation
function Slide({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`absolute inset-0 flex flex-col items-center justify-center px-8 slide-enter ${className}`}>
      {children}
    </div>
  );
}

// ── SLIDE 0: Intro ──────────────────────────────────────────
function SlideIntro() {
  return (
    <Slide>
      {/* Glow blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(29,185,84,0.12) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          filter: "blur(40px)",
        }}
      />

      <VinylDisc size={240} spin />

      <div className="text-center mt-8 animate-fade-up delay-200">
        <p className="font-body text-xs tracking-[0.4em] text-white/35 uppercase mb-4">
          музыкальный итог года
        </p>
        <div className="flex items-baseline justify-center gap-0 leading-none mb-1">
          <span className="font-display font-black text-white" style={{ fontSize: 52 }}>spot</span>
          <span className="font-display font-black" style={{ fontSize: 52, color: "#1DB954" }}>IRA</span>
        </div>
        <div
          className="font-display font-black text-white/10 leading-none tracking-tighter animate-fade-up delay-400"
          style={{ fontSize: 120 }}
        >
          30
        </div>
        <p className="font-body text-white/30 -mt-2 text-sm animate-fade-up delay-500">2024</p>
      </div>
    </Slide>
  );
}

// ── SLIDE 1: Minutes ────────────────────────────────────────
function SlideMinutes() {
  const [counted, setCounted] = useState(0);
  const target = 52480;

  useEffect(() => {
    const duration = 1800;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounted(Math.floor(eased * target));
      if (progress >= 1) { setCounted(target); clearInterval(timer); }
    }, 16);
    return () => clearInterval(timer);
  }, []);

  return (
    <Slide>
      <div className="text-center">
        <p className="font-body text-xs tracking-[0.35em] text-white/35 uppercase mb-10 animate-fade-up">
          в этом году ты слушала
        </p>
        <div className="animate-scale-in">
          <span
            className="font-display font-black block leading-none tabular-nums"
            style={{ fontSize: 88, color: "#1DB954", letterSpacing: "-0.02em" }}
          >
            {counted.toLocaleString("ru")}
          </span>
        </div>
        <p className="font-display font-semibold text-4xl text-white/70 mt-3 animate-fade-up delay-300">
          минут музыки
        </p>

        <div className="flex justify-center mt-10 animate-fade-up delay-500">
          <SoundWave active color="#1DB954" />
        </div>

        <p className="font-body text-white/25 text-sm mt-8 animate-fade-up delay-700">
          Это <span className="text-white/55 font-medium">{Math.round(target / 60)} часов</span> — твоя личная саундтрек-лента
        </p>
      </div>
    </Slide>
  );
}

// ── SLIDE 2: Top Tracks ─────────────────────────────────────
function SlideTopTracks() {
  return (
    <Slide>
      <p className="font-body text-xs tracking-[0.35em] text-white/35 uppercase mb-1 animate-fade-up">
        твои треки
      </p>
      <p className="font-display font-bold text-2xl text-white mb-7 animate-fade-up delay-100">
        Топ-5 этого года
      </p>

      <div className="w-full max-w-sm space-y-2.5">
        {TOP_TRACKS.map((track, i) => (
          <div
            key={track.rank}
            className={`flex items-center gap-3 animate-fade-up`}
            style={{ animationDelay: `${0.1 + i * 0.08}s`, opacity: 0, animationFillMode: "forwards" }}
          >
            <span
              className="font-display font-black w-5 text-right shrink-0 text-lg"
              style={{ color: i === 0 ? "#1DB954" : "rgba(255,255,255,0.2)" }}
            >
              {track.rank}
            </span>
            <div
              className="flex-1 flex items-center justify-between rounded-2xl px-4 py-3"
              style={{
                background: i === 0 ? "rgba(29,185,84,0.1)" : "rgba(255,255,255,0.04)",
                border: i === 0 ? "1px solid rgba(29,185,84,0.28)" : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="min-w-0">
                <p className="font-body font-medium text-sm text-white leading-tight truncate">{track.title}</p>
                <p className="font-body text-xs text-white/38 truncate">{track.artist}</p>
              </div>
              <span
                className="font-display font-bold text-xs ml-3 shrink-0"
                style={{ color: i === 0 ? "#1DB954" : "rgba(255,255,255,0.25)" }}
              >
                {track.plays}×
              </span>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

// ── SLIDE 3: Top Artists ────────────────────────────────────
function SlideTopArtists() {
  const podium = [TOP_ARTISTS[1], TOP_ARTISTS[0], TOP_ARTISTS[2]];
  const podiumHeights = [100, 140, 80];
  const medals = ["🥈", "🥇", "🥉"];

  return (
    <Slide>
      <p className="font-body text-xs tracking-[0.35em] text-white/35 uppercase mb-1 animate-fade-up">
        любимые артисты
      </p>
      <p className="font-display font-bold text-2xl text-white mb-10 animate-fade-up delay-100">
        Кто звучал чаще всех?
      </p>

      <div className="flex gap-5 items-end justify-center animate-fade-up delay-200">
        {podium.map((artist, pos) => {
          const isFirst = pos === 1;
          return (
            <div key={artist.rank} className="flex flex-col items-center gap-2">
              <span className="text-2xl">{medals[pos]}</span>
              <div
                className="rounded-full flex items-center justify-center font-display font-black text-sm"
                style={{
                  width: isFirst ? 64 : 50,
                  height: isFirst ? 64 : 50,
                  background: isFirst
                    ? "linear-gradient(135deg, #1DB954, #0f8f3c)"
                    : "rgba(255,255,255,0.07)",
                  color: isFirst ? "#000" : "rgba(255,255,255,0.5)",
                  border: isFirst ? "none" : "1px solid rgba(255,255,255,0.1)",
                  boxShadow: isFirst ? "0 0 30px rgba(29,185,84,0.4)" : "none",
                  fontSize: isFirst ? 22 : 18,
                }}
              >
                {artist.name.charAt(0)}
              </div>
              <div
                style={{
                  height: podiumHeights[pos],
                  width: 80,
                  background: isFirst
                    ? "linear-gradient(180deg, rgba(29,185,84,0.22) 0%, rgba(29,185,84,0.06) 100%)"
                    : "rgba(255,255,255,0.04)",
                  border: isFirst ? "1px solid rgba(29,185,84,0.3)" : "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "12px 12px 0 0",
                }}
              />
              <p
                className="font-body text-xs text-center text-white/55 leading-tight"
                style={{ maxWidth: 80 }}
              >
                {artist.name}
              </p>
              <p className="font-display font-bold text-xs" style={{ color: "#1DB954" }}>
                {artist.hours}ч
              </p>
            </div>
          );
        })}
      </div>
    </Slide>
  );
}

// ── SLIDE 4: Genres ─────────────────────────────────────────
function SlideGenres() {
  return (
    <Slide>
      <p className="font-body text-xs tracking-[0.35em] text-white/35 uppercase mb-1 animate-fade-up">
        твой звук
      </p>
      <p className="font-display font-bold text-2xl text-white mb-8 animate-fade-up delay-100">
        Жанры года
      </p>

      <div className="w-full max-w-xs space-y-5">
        {GENRES.map((genre, i) => (
          <div
            key={genre.name}
            className="animate-fade-up"
            style={{ animationDelay: `${0.1 + i * 0.1}s`, opacity: 0, animationFillMode: "forwards" }}
          >
            <div className="flex justify-between items-baseline mb-2">
              <span className="font-body font-medium text-sm text-white/80">{genre.name}</span>
              <span className="font-display font-bold text-sm" style={{ color: genre.color }}>{genre.pct}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${genre.pct}%`,
                  background: genre.color,
                  animation: `bar-grow 1.1s ${0.15 + i * 0.12}s cubic-bezier(0.16,1,0.3,1) forwards`,
                  transformOrigin: "left",
                  transform: "scaleX(0)",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="font-body text-white/22 text-xs mt-8 animate-fade-up delay-700">
        Главный жанр — <span className="text-white/50">Pop</span>
      </p>
    </Slide>
  );
}

// ── SLIDE 5: Mood ───────────────────────────────────────────
function SlideMood() {
  return (
    <Slide>
      <p className="font-body text-xs tracking-[0.35em] text-white/35 uppercase mb-1 animate-fade-up">
        твоё настроение
      </p>
      <p className="font-display font-bold text-2xl text-white mb-2 animate-fade-up delay-100">
        Каждый трек — эмоция
      </p>
      <p className="font-body text-white/30 text-sm mb-8 animate-fade-up delay-150">
        Мы посчитали их все
      </p>

      <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
        {MOODS.map((mood, i) => (
          <div
            key={mood.label}
            className="rounded-2xl p-5 text-center animate-scale-in"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              animationDelay: `${0.1 + i * 0.08}s`,
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            <div className="text-3xl mb-2">{mood.emoji}</div>
            <p className="font-display font-black text-white" style={{ fontSize: 28 }}>{mood.pct}%</p>
            <p className="font-body text-xs text-white/38 mt-1">{mood.label}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
}

// ── SLIDE 6: Finale ─────────────────────────────────────────
function SlideFinale() {
  return (
    <Slide>
      <div className="relative flex items-center justify-center mb-8">
        <div
          className="absolute rounded-full"
          style={{
            width: 280,
            height: 280,
            background: "radial-gradient(circle, rgba(29,185,84,0.15) 0%, transparent 70%)",
            animation: "pulse-ring 2.5s ease-in-out infinite",
          }}
        />
        <VinylDisc size={180} spin />
      </div>

      <div className="text-center animate-fade-up delay-200">
        <p className="font-body text-xs tracking-[0.4em] text-white/35 uppercase mb-5">
          до встречи в 2025
        </p>
        <h2 className="font-display font-black text-white leading-tight" style={{ fontSize: 48 }}>
          ИРА, ТЫ<br />
          <span style={{ color: "#1DB954" }}>СЛУШАЛА</span><br />
          С ДУШОЙ
        </h2>
        <p className="font-body text-white/30 text-sm mt-6 leading-relaxed max-w-[260px] mx-auto">
          52 480 минут.<br />5 любимых треков.<br />
          Один неповторимый год.
        </p>
        <div className="mt-8 flex justify-center">
          <SoundWave active color="#1DB954" />
        </div>
        <p className="font-body text-white/18 text-xs mt-6">
          с любовью к твоим 30 ✨
        </p>
      </div>
    </Slide>
  );
}

const SLIDE_COMPONENTS = [
  SlideIntro,
  SlideMinutes,
  SlideTopTracks,
  SlideTopArtists,
  SlideGenres,
  SlideMood,
  SlideFinale,
];

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [slideKey, setSlideKey] = useState(0);

  const go = useCallback(
    (dir: 1 | -1) => {
      const next = current + dir;
      if (next < 0 || next >= TOTAL_SLIDES) return;
      setCurrent(next);
      setSlideKey((k) => k + 1);
    },
    [current]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") go(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") go(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  useEffect(() => {
    let startY = 0;
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onEnd = (e: TouchEvent) => {
      const dy = startY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 45) go(dy > 0 ? 1 : -1);
    };
    window.addEventListener("touchstart", onStart);
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [go]);

  const SlideComponent = SLIDE_COMPONENTS[current];

  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none"
      style={{ background: "#0a0a0a" }}
    >
      {/* Ambient glow at center */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(29,185,84,0.04) 0%, transparent 65%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Slide */}
      <SlideComponent key={slideKey} />

      {/* Bottom: progress + nav */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4 z-10">
        <ProgressBar total={TOTAL_SLIDES} current={current} />

        <div className="flex items-center gap-4 mt-1">
          <button
            onClick={() => go(-1)}
            disabled={current === 0}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity duration-200 disabled:opacity-15"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}
          >
            <Icon name="ChevronUp" size={16} className="text-white/50" />
          </button>
          <button
            onClick={() => go(1)}
            disabled={current === TOTAL_SLIDES - 1}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity duration-200 disabled:opacity-15"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}
          >
            <Icon name="ChevronDown" size={16} className="text-white/50" />
          </button>
        </div>
      </div>

      {/* Slide counter top-right */}
      <div className="absolute top-7 right-7 z-10">
        <span className="font-display text-xs text-white/18 font-semibold">
          {current + 1} / {TOTAL_SLIDES}
        </span>
      </div>

      {/* spotIRA badge top-left */}
      <div className="absolute top-7 left-7 z-10 flex items-baseline gap-0.5">
        <span className="font-display font-black text-white/30 text-sm">spot</span>
        <span className="font-display font-black text-sm" style={{ color: "rgba(29,185,84,0.5)" }}>IRA</span>
      </div>
    </div>
  );
}
