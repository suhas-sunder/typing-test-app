"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { apiRequest } from "@/lib/api/client";

type Summary = {
  totalScore?: number;
  bestWpm?: number;
  bestAccuracy?: number;
  testsTaken?: number;
};

export function DashboardClient() {
  const auth = useAuth();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "unavailable">("idle");

  useEffect(() => {
    let active = true;

    if (auth.isLoading) return;
    if (!auth.isAuthenticated || !auth.userId) {
      setStatus("unavailable");
      return;
    }

    setStatus("loading");
    Promise.allSettled([
      apiRequest<{ totalScore: number }>("/v1/api/account/totalscore"),
      apiRequest<{ bestWpm: number; bestAccuracy: number; testsTaken: number }>("/v1/api/account/best-stats"),
    ]).then(([totalScore, bestStats]) => {
      if (!active) return;

      const nextSummary: Summary = {};

      if (totalScore.status === "fulfilled") {
        nextSummary.totalScore = totalScore.value.totalScore;
      }

      if (bestStats.status === "fulfilled") {
        nextSummary.bestWpm = bestStats.value.bestWpm;
        nextSummary.bestAccuracy = bestStats.value.bestAccuracy;
        nextSummary.testsTaken = bestStats.value.testsTaken;
      }

      setSummary(nextSummary);
      setStatus(Object.keys(nextSummary).length > 0 ? "ready" : "unavailable");
    });

    return () => {
      active = false;
    };
  }, [auth.isAuthenticated, auth.isLoading, auth.userId]);

  if (auth.isLoading || status === "loading") {
    return <DashboardShell title="Loading your progress" body="Checking your saved test history." />;
  }

  if (!auth.isAuthenticated) {
    return (
      <DashboardShell
        title="Sign in to see your progress"
        body="Stats stay off the page until they belong to a real account."
        action={<Link href="/login" className="button-primary">Sign in</Link>}
      />
    );
  }

  if (status !== "ready" || !summary) {
    return (
      <DashboardShell
        title="No saved results yet"
        body="Take a typing test while signed in and this dashboard will start filling itself in."
        action={<Link href="/typing-test" className="button-primary">Start a test</Link>}
      />
    );
  }

  return (
    <section className="section-pad">
      <div className="page-shell">
        <div className="mb-8">
          <p className="eyebrow">Dashboard</p>
          <h1 className="heading-lg mt-2">Welcome back, {auth.userName}.</h1>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Total score" value={summary.totalScore ?? 0} />
          <Stat label="Best WPM" value={summary.bestWpm ?? 0} />
          <Stat label="Best accuracy" value={`${summary.bestAccuracy ?? 0}%`} />
          <Stat label="Tests taken" value={summary.testsTaken ?? 0} />
        </div>
      </div>
    </section>
  );
}

function DashboardShell({ action, body, title }: { action?: React.ReactNode; body: string; title: string }) {
  return (
    <section className="section-pad">
      <div className="page-shell">
        <div className="card mx-auto max-w-2xl p-8 text-center">
          <p className="eyebrow">Dashboard</p>
          <h1 className="heading-lg mt-2">{title}</h1>
          <p className="body-lg mt-4">{body}</p>
          {action ? <div className="mt-6">{action}</div> : null}
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="card p-6">
      <div className="text-4xl font-black text-camp-ink">{value}</div>
      <div className="mt-2 text-sm font-extrabold uppercase tracking-[0.12em] text-camp-muted">{label}</div>
    </div>
  );
}
