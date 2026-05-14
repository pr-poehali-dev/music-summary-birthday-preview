import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const SLIDES = [
  { id: "intro" },
  { id: "minutes" },
  { id: "top-tracks" },
  { id: "top-artists" },
  { id: "genres" },
  { id: "mood" },
  { id: "finale" },
];

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
  { name: "Pop", pct: 42, color: "#F5A623" },
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

// Vinyl disc component
function VinylDisc({ size = 280, spin = true }: { size?: number; spin?: boolean }) {
  return (
    <div
      className={spin ? "animate-spin-slow" : ""}
      style={{ width: size, height: size, position: "relative" }}
    >
      <div
        className="vinyl-record rounded-full absolute inset-0"
        style={{ boxShadow: "0 0 60px rgba(0,0,0,0.8), 0 0 20px rgba(245,166,35,0.15)" }}
      />
      {/* Label */}
      <div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          width: size * 0.36,
          height: size * 0.36,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, #F5A623 0%, #C47D10 100%)",
        }}
      >
        <div className="rounded-full bg-black" style={{ width: size * 0.08, height: size * 0.08 }} />
      </div>
      {/* Shine */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: 0,
          background: "radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.08) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}

// Sound wave bars
function SoundWave({ active = true }: { active?: boolean }) {
  const heights = [30, 60, 45, 80, 35, 70, 50, 90, 40, 65, 30, 55];
  return (
    <div className="flex items-end gap-[3px]" style={{ height: 48 }}>
      {heights.map((h, i) => (
        <div
          key={i}
          className={active ? "wave-bar" : ""}
          style={{
            width: 4,
            height: `${h}%`,
            background: "var(--gold)",
            borderRadius: 2,
            opacity: active ? 0.85 : 0.25,
            "--dur": `${0.5 + (i % 4) * 0.15}s`,
            animationDelay: `${i * 0.06}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// Progress dots
function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex gap-2 items-center">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === current ? 20 : 6,
            height: 6,
            background: i === current ? "var(--gold)" : "rgba(255,255,255,0.2)",
          }}
        />
      ))}
    </div>
  );
}

// Slide wrapper
function Slide({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center px-8 slide-enter noise ${className}`}
    >
      {children}
    </div>
  );
}

// ── SLIDE 0: Intro ───────────────────────────────────────
function SlideIntro() {
  return (
    <Slide>
      <div className="relative flex items-center justify-center mb-10">
        <div
          className="animate-pulse-ring absolute rounded-full"
          style={{ width: 360, height: 360, background: "radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 70%)" }}
        />
        <VinylDisc size={260} spin />
      </div>
      <div className="text-center animate-fade-up delay-200">
        <p className="font-body text-sm tracking-[0.3em] text-white/40 uppercase mb-3">Твой год в музыке</p>
        <h1 className="font-display text-7xl font-bold leading-none tracking-tight text-white mb-2">
          MUSIC
        </h1>
        <h1 className="font-display text-7xl font-bold leading-none tracking-tight" style={{ color: "var(--gold)" }}>
          WRAPPED
        </h1>
        <p className="font-body text-white/40 mt-5 text-sm">2024</p>
      </div>
    </Slide>
  );
}

// ── SLIDE 1: Minutes ─────────────────────────────────────
function SlideMinutes() {
  const [counted, setCounted] = useState(0);
  const target = 52480;

  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCounted(target); clearInterval(timer); }
      else setCounted(start);
    }, 25);
    return () => clearInterval(timer);
  }, []);

  return (
    <Slide>
      <div className="text-center">
        <p className="font-body text-sm tracking-[0.3em] text-white/40 uppercase mb-8 animate-fade-up">
          В этом году ты прослушал
        </p>
        <div className="animate-scale-in">
          <span className="font-display font-bold block leading-none" style={{ fontSize: 96, color: "var(--gold)" }}>
            {counted.toLocaleString("ru")}
          </span>
        </div>
        <p className="font-display text-4xl font-light text-white/80 mt-2 animate-fade-up delay-300">
          минут музыки
        </p>
        <div className="mt-10 flex justify-center animate-fade-up delay-500">
          <SoundWave active />
        </div>
        <p className="font-body text-white/30 text-sm mt-8 animate-fade-up delay-600">
          Это примерно <span className="text-white/60">{Math.round(counted / 60)} часов</span> удовольствия
        </p>
      </div>
    </Slide>
  );
}

// ── SLIDE 2: Top Tracks ──────────────────────────────────
function SlideTopTracks() {
  return (
    <Slide>
      <p className="font-body text-xs tracking-[0.3em] text-white/40 uppercase mb-6 animate-fade-up">
        Топ треков
      </p>
      <div className="w-full max-w-sm space-y-3">
        {TOP_TRACKS.map((track, i) => (
          <div
            key={track.rank}
            className={`flex items-center gap-4 animate-slide-left delay-${(i + 1) * 100}`}
            style={{ animationFillMode: "forwards" }}
          >
            <span
              className="font-display text-xl w-6 text-right shrink-0"
              style={{ color: i === 0 ? "var(--gold)" : "rgba(255,255,255,0.25)" }}
            >
              {track.rank}
            </span>
            <div
              className="flex-1 flex items-center justify-between rounded-xl px-4 py-3"
              style={{ background: i === 0 ? "rgba(245,166,35,0.12)" : "rgba(255,255,255,0.04)", border: i === 0 ? "1px solid rgba(245,166,35,0.3)" : "1px solid rgba(255,255,255,0.06)" }}
            >
              <div>
                <p className="font-body font-medium text-sm text-white leading-tight">{track.title}</p>
                <p className="font-body text-xs text-white/40">{track.artist}</p>
              </div>
              <span className="font-display text-xs" style={{ color: "var(--gold)", opacity: 0.7 }}>
                {track.plays}×
              </span>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

// ── SLIDE 3: Top Artists ─────────────────────────────────
function SlideTopArtists() {
  return (
    <Slide>
      <p className="font-body text-xs tracking-[0.3em] text-white/40 uppercase mb-2 animate-fade-up">
        Твои любимые артисты
      </p>
      <p className="font-body text-white/30 text-sm mb-10 animate-fade-up delay-100">
        Ты проводил с ними каждый день
      </p>

      <div className="flex gap-6 items-end justify-center animate-scale-in delay-200">
        {[TOP_ARTISTS[1], TOP_ARTISTS[0], TOP_ARTISTS[2]].map((artist, pos) => {
          const isFirst = pos === 1;
          const heights = [110, 150, 90];
          return (
            <div key={artist.rank} className="flex flex-col items-center gap-3">
              <div
                className="rounded-full flex items-center justify-center font-display font-bold"
                style={{
                  width: isFirst ? 72 : 56,
                  height: isFirst ? 72 : 56,
                  fontSize: isFirst ? 28 : 22,
                  background: isFirst
                    ? "linear-gradient(135deg, #F5A623, #C47D10)"
                    : "rgba(255,255,255,0.08)",
                  color: isFirst ? "#0d0d0d" : "rgba(255,255,255,0.6)",
                  border: isFirst ? "none" : "1px solid rgba(255,255,255,0.1)",
                  boxShadow: isFirst ? "0 0 30px rgba(245,166,35,0.4)" : "none",
                }}
              >
                {["2", "1", "3"][pos]}
              </div>
              <div
                className="flex items-end justify-center pb-3"
                style={{
                  height: heights[pos],
                  width: 80,
                  background: isFirst
                    ? "linear-gradient(180deg, rgba(245,166,35,0.25) 0%, rgba(245,166,35,0.08) 100%)"
                    : "rgba(255,255,255,0.04)",
                  border: isFirst ? "1px solid rgba(245,166,35,0.3)" : "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "12px 12px 0 0",
                }}
              >
              </div>
              <p className="font-body text-xs text-center text-white/60 max-w-[80px] leading-tight">{artist.name}</p>
              <p className="font-display text-xs" style={{ color: "var(--gold)" }}>{artist.hours}ч</p>
            </div>
          );
        })}
      </div>
    </Slide>
  );
}

// ── SLIDE 4: Genres ──────────────────────────────────────
function SlideGenres() {
  return (
    <Slide>
      <p className="font-body text-xs tracking-[0.3em] text-white/40 uppercase mb-8 animate-fade-up">
        Твои жанры
      </p>
      <div className="w-full max-w-xs space-y-4">
        {GENRES.map((genre, i) => (
          <div key={genre.name} className={`animate-fade-up delay-${(i + 1) * 100}`}>
            <div className="flex justify-between mb-1.5">
              <span className="font-body text-sm text-white/80">{genre.name}</span>
              <span className="font-display text-sm" style={{ color: genre.color }}>{genre.pct}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${genre.pct}%`,
                  background: genre.color,
                  animation: `bar-grow 1s ${0.1 + i * 0.15}s ease-out forwards`,
                  transformOrigin: "left",
                  opacity: 0.85,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 animate-fade-up delay-600">
        <p className="font-body text-white/25 text-xs text-center">
          Основной жанр — <span className="text-white/60">Pop</span>
        </p>
      </div>
    </Slide>
  );
}

// ── SLIDE 5: Mood ────────────────────────────────────────
function SlideMood() {
  return (
    <Slide>
      <p className="font-body text-xs tracking-[0.3em] text-white/40 uppercase mb-2 animate-fade-up">
        Настроение года
      </p>
      <p className="font-body text-white/30 text-sm mb-10 animate-fade-up delay-100 text-center">
        Мы проанализировали каждый трек
      </p>
      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        {MOODS.map((mood, i) => (
          <div
            key={mood.label}
            className={`rounded-2xl p-5 text-center animate-scale-in delay-${(i + 1) * 100}`}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="text-3xl mb-2">{mood.emoji}</div>
            <p className="font-display text-2xl font-bold text-white">{mood.pct}%</p>
            <p className="font-body text-xs text-white/40 mt-1">{mood.label}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
}

// ── SLIDE 6: Finale ──────────────────────────────────────
function SlideFinale() {
  return (
    <Slide>
      <div className="relative flex items-center justify-center mb-10">
        <div
          className="absolute rounded-full"
          style={{
            width: 240,
            height: 240,
            background: "radial-gradient(circle, rgba(245,166,35,0.2) 0%, transparent 70%)",
            animation: "pulse-ring 2s ease-in-out infinite",
          }}
        />
        <VinylDisc size={180} spin />
      </div>
      <div className="text-center animate-fade-up delay-200">
        <p className="font-body text-sm tracking-[0.3em] text-white/40 uppercase mb-4">
          До встречи в 2025
        </p>
        <h2 className="font-display text-5xl font-bold text-white leading-tight">
          ТЫ СЛУШАЛ<br />
          <span style={{ color: "var(--gold)" }}>С ДУШОЙ</span>
        </h2>
        <p className="font-body text-white/30 text-sm mt-6 max-w-xs mx-auto leading-relaxed">
          52 480 минут. 5 любимых треков.<br />Один неповторимый год.
        </p>
        <div className="mt-8 flex justify-center">
          <SoundWave active />
        </div>
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
  const [key, setKey] = useState(0);
  const total = SLIDES.length;

  const go = useCallback(
    (dir: 1 | -1) => {
      const next = current + dir;
      if (next < 0 || next >= total) return;
      setCurrent(next);
      setKey((k) => k + 1);
    },
    [current, total]
  );

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") go(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") go(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  // Touch swipe
  useEffect(() => {
    let startY = 0;
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onEnd = (e: TouchEvent) => {
      const dy = startY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 50) go(dy > 0 ? 1 : -1);
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
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,166,35,0.05) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Slide */}
      <SlideComponent key={key} />

      {/* Bottom nav */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4 z-10">
        <ProgressDots total={total} current={current} />

        <div className="flex items-center gap-6">
          <button
            onClick={() => go(-1)}
            disabled={current === 0}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-20"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <Icon name="ChevronUp" size={18} className="text-white/60" />
          </button>

          <button
            onClick={() => go(1)}
            disabled={current === total - 1}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-20"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <Icon name="ChevronDown" size={18} className="text-white/60" />
          </button>
        </div>
      </div>

      {/* Slide counter */}
      <div className="absolute top-8 right-8 z-10">
        <span className="font-display text-xs text-white/20">
          {current + 1}/{total}
        </span>
      </div>
    </div>
  );
}