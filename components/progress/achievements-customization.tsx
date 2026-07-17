"use client";

import { Award, CalendarDays, Compass, Gauge, Map as MapIcon, Target } from "lucide-react";
import { applyCurrentTheme } from "@/components/theme/theme-controller";
import { ACHIEVEMENTS, ACHIEVEMENT_CATEGORIES, getAchievement, type AchievementCategory } from "@/lib/progress/achievements";
import { selectCampEmblem, selectLocalTheme } from "@/lib/progress/repository";
import type { LocalProgress } from "@/lib/progress/types";
import { isThemeAvailable, THEMES } from "@/lib/themes/registry";

const categoryLabels: Record<AchievementCategory, string> = {
  progress: "Progress", accuracy: "Accuracy", speed: "Speed", consistency: "Consistency", exploration: "Exploration",
};
const categoryIcons = { progress: MapIcon, accuracy: Target, speed: Gauge, consistency: CalendarDays, exploration: Compass };

export function LocalCampIdentity({ progress }: { progress: LocalProgress }) {
  const emblem = progress.customization.selectedEmblemId ? getAchievement(progress.customization.selectedEmblemId) : null;
  return (
    <section className="mt-8 flex flex-wrap items-center gap-4 bg-camp-paper px-5 py-5 sm:px-8" aria-label="Local camp identity">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-camp-peach text-camp-coral"><Award aria-hidden size={23} /></span>
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-camp-muted">Camp emblem</p>
        <p className="mt-1 font-black text-camp-ink">{emblem?.name ?? "No emblem selected"}</p>
      </div>
      <div className="ml-auto text-right">
        <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-camp-muted">Theme</p>
        <p className="mt-1 font-black text-camp-ink">{THEMES.find((theme) => theme.id === progress.customization.selectedThemeId)?.name ?? "Base Camp"}</p>
      </div>
    </section>
  );
}

export function AchievementsCustomization({ progress, onStatus }: { progress: LocalProgress; onStatus: (message: string) => void }) {
  const unlocked = new Map(progress.achievements.unlocked.map((record) => [record.id, record]));
  return (
    <div className="mt-12 grid gap-12">
      <section aria-labelledby="achievements-heading">
        <p className="eyebrow">Achievements</p>
        <h2 id="achievements-heading" className="heading-md mt-2">Milestones earned from completed local practice</h2>
        <p className="mt-3 max-w-3xl leading-7 text-camp-muted">Achievements are calculated from progress stored in this browser. Locked milestones show the exact next requirement.</p>
        <div className="mt-8 grid gap-9">
          {ACHIEVEMENT_CATEGORIES.map((category) => {
            const Icon = categoryIcons[category];
            return (
              <div key={category}>
                <h3 className="flex items-center gap-2 text-lg font-black text-camp-ink"><Icon aria-hidden size={19} />{categoryLabels[category]}</h3>
                <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                  {ACHIEVEMENTS.filter((achievement) => achievement.category === category).map((achievement) => {
                    const record = unlocked.get(achievement.id);
                    return (
                      <li key={achievement.id} className={record ? "bg-camp-peach/55 px-5 py-4" : "bg-camp-tan/45 px-5 py-4"}>
                        <div className="flex items-start gap-3">
                          <Award aria-hidden className={record ? "mt-0.5 shrink-0 text-camp-coral" : "mt-0.5 shrink-0 text-camp-muted"} size={20} />
                          <div>
                            <p className="font-black text-camp-ink">{achievement.name}</p>
                            <p className="mt-1 text-sm font-bold text-camp-muted">{record ? achievement.description : achievement.requirement}</p>
                            <p className="mt-2 text-xs font-extrabold uppercase tracking-[0.08em] text-camp-muted">{record ? `Unlocked ${formatDate(record.unlockedAt)}${record.retroactive ? " · from existing progress" : ""}` : "Locked"}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="emblem-heading">
        <p className="eyebrow">Camp emblem</p>
        <h2 id="emblem-heading" className="heading-md mt-2">Choose one unlocked milestone</h2>
        <p className="mt-3 max-w-3xl leading-7 text-camp-muted">This emblem appears only with progress stored in this browser. It is not a public avatar.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <ChoiceButton selected={progress.customization.selectedEmblemId === null} label="No emblem" onClick={() => updateEmblem(null)} />
          {progress.achievements.unlocked.map((record) => {
            const achievement = getAchievement(record.id);
            return achievement ? <ChoiceButton key={record.id} selected={progress.customization.selectedEmblemId === record.id} label={achievement.name} onClick={() => updateEmblem(record.id)} /> : null;
          })}
        </div>
      </section>

      <section aria-labelledby="themes-heading">
        <p className="eyebrow">Themes</p>
        <h2 id="themes-heading" className="heading-md mt-2">Choose a calm local appearance</h2>
        <p className="mt-3 max-w-3xl leading-7 text-camp-muted">Themes change semantic colours only. Layout, typography, keyboard geometry, and lesson content stay the same.</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {THEMES.map((theme) => {
            const available = isThemeAvailable(theme, progress);
            const selected = progress.customization.selectedThemeId === theme.id;
            return (
              <li key={theme.id} className={selected ? "bg-camp-peach/60 p-5" : "bg-camp-tan/45 p-5"}>
                <div className="flex gap-2" aria-hidden>
                  {[theme.tokens.page, theme.tokens.accent, theme.tokens.success].map((token, index) => <span key={`${token}-${index}`} className="h-6 w-6 rounded-full" style={{ backgroundColor: `rgb(${token.replaceAll(" ", ",")})` }} />)}
                </div>
                <p className="mt-3 font-black text-camp-ink">{theme.name}</p>
                <p className="mt-1 text-sm leading-6 text-camp-muted">{theme.description}</p>
                <p className="mt-2 text-xs font-extrabold uppercase tracking-[0.08em] text-camp-muted">{available ? (selected ? "Selected" : "Available") : `Locked · ${theme.requirement}`}</p>
                <button type="button" className="button-secondary mt-4" disabled={!available || selected} onClick={() => updateTheme(theme.id)}>{selected ? "Selected" : available ? "Use theme" : "Locked"}</button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );

  function updateEmblem(id: string | null) {
    const result = selectCampEmblem(id);
    onStatus(result.changed ? "Camp emblem updated on this device." : "The camp emblem could not be updated.");
  }

  function updateTheme(id: string) {
    const result = selectLocalTheme(id);
    if (result.changed) applyCurrentTheme();
    onStatus(result.changed ? "Theme updated on this device." : "That theme is not available yet.");
  }
}

function ChoiceButton({ label, onClick, selected }: { label: string; onClick: () => void; selected: boolean }) {
  return <button type="button" className={selected ? "pill pill-active" : "pill"} aria-pressed={selected} onClick={onClick}>{label}{selected ? " · Selected" : ""}</button>;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));
}
