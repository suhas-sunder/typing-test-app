"use client";

import { Clock3, Gauge, RotateCcw, Settings, Type, X } from "lucide-react";
import {
  memo,
  useEffect,
  useRef,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { DIFFICULTIES } from "@/lib/typing/content";
import {
  formatTestDuration,
  TYPING_TEST_DURATIONS,
} from "@/lib/typing/test-settings";
import type { TypingTestDuration } from "@/lib/typing/test-settings";
import type { DifficultyId, TestMode } from "@/lib/typing/types";
import {
  KEYBOARD_STATS_PLACEMENTS,
  type TypingSessionSettings,
  type TypingSettingsUpdate,
} from "@/components/typing/typing-test-types";

type CoreControlSettings = Pick<
  TypingSessionSettings,
  "difficulty" | "duration" | "mode"
>;

export const TypingTopControls = memo(function TypingTopControls({
  lockText,
  onOpenSettings,
  onRestart,
  onUpdateSettings,
  settings,
  settingsTriggerRef,
  setupControls,
}: {
  lockText: boolean;
  onOpenSettings: () => void;
  onRestart: () => void;
  onUpdateSettings: (update: TypingSettingsUpdate) => void;
  settings: CoreControlSettings;
  settingsTriggerRef: RefObject<HTMLButtonElement | null>;
  setupControls?: ReactNode;
}) {
  return (
    <div className="relative z-20 mb-1 flex min-h-9 justify-end">
      <div className="flex max-w-full items-center justify-end gap-x-3 overflow-x-auto whitespace-nowrap">
        {setupControls}
        {!lockText ? (
          <>
            <div className="hidden md:block">
              <QuickTimeOptions
                duration={settings.duration}
                onDurationChange={(duration) => onUpdateSettings({ duration })}
              />
            </div>
            <div className="hidden lg:block">
              <QuickModeOptions
                mode={settings.mode}
                onModeChange={(mode) => onUpdateSettings({ mode })}
              />
            </div>
            <div className="hidden xl:block">
              <QuickLevelOptions
                difficulty={settings.difficulty}
                onDifficultyChange={(difficulty) =>
                  onUpdateSettings({ difficulty })
                }
              />
            </div>
            <SettingsButton
              buttonRef={settingsTriggerRef}
              onOpenSettings={onOpenSettings}
            />
          </>
        ) : null}

        <button
          type="button"
          className="inline-flex h-8 shrink-0 items-center justify-center gap-2 rounded-pill bg-camp-paper px-4 text-sm font-extrabold text-camp-ink transition hover:bg-camp-orange hover:text-camp-accent-contrast focus-visible:bg-camp-orange focus-visible:text-camp-accent-contrast"
          onClick={onRestart}
        >
          <RotateCcw aria-hidden size={16} className="shrink-0" />
          Restart
        </button>
      </div>
    </div>
  );
});

export function TypingSettingsModal({
  lockText,
  onClose,
  onUpdateSettings,
  settings,
}: {
  lockText: boolean;
  onClose: () => void;
  onUpdateSettings: (update: TypingSettingsUpdate) => void;
  settings: TypingSessionSettings;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus({ preventScroll: true });
  }, []);

  function handleDialogKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      onClose();
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = getFocusableElements(dialogRef.current);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-camp-ink/35 px-4 py-5 sm:items-center sm:justify-center"
      role="presentation"
      onMouseDown={onClose}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-xl rounded-[28px] bg-camp-paper p-5 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="typing-settings-title"
        onKeyDown={handleDialogKeyDown}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-5">
          <div>
            <p className="eyebrow">Typing setup</p>
            <h2 id="typing-settings-title" className="heading-md mt-1">
              Tune the test
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-camp-surface text-camp-ink transition hover:bg-camp-orange hover:text-camp-accent-contrast focus-visible:bg-camp-orange focus-visible:text-camp-accent-contrast"
            aria-label="Close typing settings"
            onClick={onClose}
          >
            <X aria-hidden size={18} />
          </button>
        </div>

        <div className="grid gap-5">
          {!lockText ? (
            <>
              <SettingGroup label="Time">
                {TYPING_TEST_DURATIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`pill ${settings.duration === item ? "pill-active" : ""}`}
                    onClick={() => onUpdateSettings({ duration: item })}
                  >
                    {formatTestDuration(item)}
                  </button>
                ))}
              </SettingGroup>

              <SettingGroup label="Mode">
                {(["words", "quote"] as TestMode[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`pill ${settings.mode === item ? "pill-active" : ""}`}
                    onClick={() => onUpdateSettings({ mode: item })}
                  >
                    {item}
                  </button>
                ))}
              </SettingGroup>

              <SettingGroup label="Difficulty">
                {DIFFICULTIES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`pill ${settings.difficulty === item.id ? "pill-active" : ""}`}
                    onClick={() => onUpdateSettings({ difficulty: item.id })}
                  >
                    {item.label}
                  </button>
                ))}
              </SettingGroup>

              {settings.mode === "words" ? (
                <>
                  <SettingToggle
                    label="Punctuation"
                    description="Use natural sentence-like material"
                    pressed={settings.punctuation}
                    onChange={(punctuation) =>
                      onUpdateSettings({ punctuation })
                    }
                  />
                  <SettingToggle
                    label="Numbers"
                    description="Add occasional dates, times, counts, and values"
                    pressed={settings.numbers}
                    onChange={(numbers) => onUpdateSettings({ numbers })}
                  />
                </>
              ) : (
                <p className="text-sm font-bold text-camp-muted">
                  Quotes keep their authored punctuation and numbers, so those
                  controls do not apply.
                </p>
              )}

              <SettingToggle
                label="Live statistics"
                description="Show remaining time, WPM, and accuracy while typing"
                pressed={settings.showLiveStats}
                onChange={(showLiveStats) =>
                  onUpdateSettings({ showLiveStats })
                }
              />

              <SettingGroup label="Desktop keyboard stats">
                {KEYBOARD_STATS_PLACEMENTS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`pill ${settings.keyboardStatsPlacement === item ? "pill-active" : ""}`}
                    onClick={() =>
                      onUpdateSettings({ keyboardStatsPlacement: item })
                    }
                  >
                    {item === "right"
                      ? "Right side"
                      : item === "left"
                        ? "Left side"
                        : "Hide"}
                  </button>
                ))}
              </SettingGroup>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function QuickTimeOptions({
  duration,
  onDurationChange,
}: {
  duration: number;
  onDurationChange: (value: TypingTestDuration) => void;
}) {
  return (
    <QuickOptionGroup icon={<Clock3 aria-hidden size={14} />} label="time">
      {TYPING_TEST_DURATIONS.map((item) => (
        <QuickOption
          key={item}
          active={duration === item}
          label={`${item} seconds`}
          onClick={() => onDurationChange(item)}
        >
          {formatTestDuration(item)}
        </QuickOption>
      ))}
    </QuickOptionGroup>
  );
}

function QuickModeOptions({
  mode,
  onModeChange,
}: {
  mode: TestMode;
  onModeChange: (value: TestMode) => void;
}) {
  return (
    <QuickOptionGroup icon={<Type aria-hidden size={14} />} label="mode">
      {(["words", "quote"] as TestMode[]).map((item) => (
        <QuickOption
          key={item}
          active={mode === item}
          label={`${item} mode`}
          onClick={() => onModeChange(item)}
        >
          {item}
        </QuickOption>
      ))}
    </QuickOptionGroup>
  );
}

function QuickLevelOptions({
  difficulty,
  onDifficultyChange,
}: {
  difficulty: DifficultyId;
  onDifficultyChange: (value: DifficultyId) => void;
}) {
  return (
    <QuickOptionGroup icon={<Gauge aria-hidden size={14} />} label="level">
      {DIFFICULTIES.map((item) => (
        <QuickOption
          key={item.id}
          active={difficulty === item.id}
          label={`${item.label} difficulty`}
          onClick={() => onDifficultyChange(item.id)}
        >
          {item.label}
        </QuickOption>
      ))}
    </QuickOptionGroup>
  );
}

function SettingsButton({
  buttonRef,
  onOpenSettings,
}: {
  buttonRef: RefObject<HTMLButtonElement | null>;
  onOpenSettings: () => void;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-camp-paper text-camp-ink transition hover:bg-camp-orange hover:text-camp-accent-contrast focus-visible:bg-camp-orange focus-visible:text-camp-accent-contrast"
      aria-label="Open typing settings"
      onClick={onOpenSettings}
    >
      <Settings aria-hidden size={16} />
    </button>
  );
}

function QuickOptionGroup({
  children,
  icon,
  label,
}: {
  children: ReactNode;
  icon: ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5" aria-label={label}>
      <span className="inline-flex items-center gap-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-camp-muted">
        {icon}
        {label}
      </span>
      <div className="flex items-center gap-0.5">{children}</div>
    </div>
  );
}

function QuickOption({
  active,
  children,
  label,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      className={[
        "inline-flex h-7 items-center justify-center rounded-pill px-2.5 text-xs font-black leading-none text-camp-muted transition hover:bg-camp-orange hover:text-camp-accent-contrast focus-visible:bg-camp-orange focus-visible:text-camp-accent-contrast",
        active
          ? "bg-camp-orange !text-camp-accent-contrast hover:bg-camp-coral focus-visible:bg-camp-coral"
          : "",
      ].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function SettingGroup({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div>
      <div className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-camp-muted">
        {label}
      </div>
      <div className="flex flex-wrap gap-2.5">{children}</div>
    </div>
  );
}

function SettingToggle({
  description,
  label,
  onChange,
  pressed,
}: {
  description: string;
  label: string;
  onChange: (value: boolean) => void;
  pressed: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <div className="text-sm font-black text-camp-ink">{label}</div>
        <div className="mt-0.5 text-sm text-camp-muted">{description}</div>
      </div>
      <button
        type="button"
        aria-pressed={pressed}
        className={`pill ${pressed ? "pill-active" : ""}`}
        onClick={() => onChange(!pressed)}
      >
        {pressed ? "On" : "Off"}
      </button>
    </div>
  );
}

function getFocusableElements(container: HTMLElement | null) {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      "button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
    ),
  );
}
