import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { randomQuote, type Quote } from "@/lib/quotes";
import { getRemaining, type SavedCountdown } from "@/lib/countdown";

// Fixed exam date — edit here and redeploy to change it.
const EXAM: SavedCountdown = {
  target: new Date("2026-11-29T10:00:00+05:30").getTime(),
  startedAt: new Date("2026-01-01T00:00:00+05:30").getTime(),
};
const EXAM_LABEL = "Sunday, November 29, 2026 at 10:00 AM IST";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CAT 2026 Countdown" },
      { name: "description", content: "Live countdown to CAT 2026 — Sunday, November 29, 2026 at 10:00 AM IST." },
      { property: "og:title", content: "CAT 2026 Countdown" },
      { property: "og:description", content: "Live countdown to CAT 2026 — Sunday, November 29, 2026 at 10:00 AM IST." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      {ready && <CountdownView countdown={EXAM} />}
    </main>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

function CountdownView({ countdown }: { countdown: SavedCountdown }) {
  const [now, setNow] = useState(() => Date.now());
  const r = getRemaining(countdown.target, now);

  useEffect(() => {
    if (r.done) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [r.done, countdown.target]);

  const span = Math.max(1, countdown.target - countdown.startedAt);
  const progress = Math.min(100, Math.max(0, ((now - countdown.startedAt) / span) * 100));
  const examLabel = EXAM_LABEL;

  return (
    <section className="w-full max-w-4xl animate-fade-up text-center">
      <div className="mb-6 flex justify-center">
        {r.done ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-xs tracking-widest text-muted-foreground">
            COUNTDOWN COMPLETE
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-xs tracking-widest text-success">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse-dot" /> COUNTDOWN ACTIVE
          </span>
        )}
      </div>
      <h1 className="font-mono text-4xl font-semibold tracking-[0.2em] sm:text-5xl">
        CAT <span className="text-primary">2026</span>
      </h1>

      {r.done ? (
        <p className="mt-12 animate-fade-up font-mono text-2xl font-semibold tracking-[0.15em] text-primary sm:text-4xl">
          CAT 2026 HAS STARTED
        </p>
      ) : (
        <>
          <p className="mt-3 text-sm uppercase tracking-[0.3em] text-muted-foreground">Time Remaining</p>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
            <TimeCard value={r.days} label="Days" wide />
            <TimeCard value={r.hours} label="Hours" />
            <TimeCard value={r.minutes} label="Minutes" />
            <TimeCard value={r.seconds} label="Seconds" />
          </div>
          <div className="mx-auto mt-10 max-w-xl">
            <div className="h-1 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-[width] duration-1000 ease-linear" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 font-mono text-xs text-muted-foreground">{progress.toFixed(1)}% of the way since Jan 1, 2026</p>
          </div>
        </>
      )}

      <p className="mt-10 text-muted-foreground">
        Exam: <span className="text-foreground">{examLabel}</span>
      </p>
      <DailyQuote />
    </section>
  );
}

function DailyQuote() {
  const [quote] = useState<Quote>(() => randomQuote());
  return (
    <figure className="mx-auto mt-12 max-w-xl animate-fade-up border-t border-border pt-6">
      <blockquote className="text-base italic leading-relaxed text-foreground sm:text-lg">"{quote.text}"</blockquote>
      <figcaption className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">— {quote.author}</figcaption>
    </figure>
  );
}

function TimeCard({ value, label, wide }: { value: number; label: string; wide?: boolean }) {
  const text = wide ? String(value).padStart(2, "0") : pad(value);
  return (
    <div className="rounded-2xl border border-border bg-card px-3 py-6 shadow-card sm:py-8">
      <div key={text} className="animate-tick font-mono text-5xl font-semibold tabular-nums sm:text-6xl lg:text-7xl">
        {text}
      </div>
      <div className="mt-3 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
    </div>
  );
}
