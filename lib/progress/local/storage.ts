import { LEGACY_RESULTS_KEY, PROGRESS_STORAGE_KEY, type LocalProgress, type StorageCapability } from "@/lib/progress/types";

export type ProgressStorage = Pick<Storage, "getItem" | "setItem">;

const SAME_TAB_EVENT = "freeTypingCamp:progress-change";

export type StorageRead =
  | { status: "available"; value: string | null }
  | { status: "unavailable"; value: null };

export function browserProgressStorage(): ProgressStorage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function readStorageItem(storage: ProgressStorage, key: string): StorageRead {
  try {
    return { status: "available", value: storage.getItem(key) };
  } catch {
    return { status: "unavailable", value: null };
  }
}

export function writeProgress(storage: ProgressStorage, data: LocalProgress): StorageCapability {
  try {
    storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(data));
    return "available";
  } catch (error) {
    return isQuotaError(error) ? "quota" : "unavailable";
  }
}

export function notifyProgressChanged() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(SAME_TAB_EVENT));
}

export function subscribeToProgress(listener: () => void) {
  if (typeof window === "undefined") return () => undefined;

  const onStorage = (event: StorageEvent) => {
    if (event.key === PROGRESS_STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(SAME_TAB_EVENT, listener);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(SAME_TAB_EVENT, listener);
  };
}

export function legacySourceCount(storage: ProgressStorage) {
  const result = readStorageItem(storage, LEGACY_RESULTS_KEY);
  if (result.status !== "available" || !result.value) return 0;
  try {
    const parsed = JSON.parse(result.value);
    return Array.isArray(parsed) ? Math.min(parsed.length, 10_000) : 0;
  } catch {
    return 0;
  }
}

function isQuotaError(error: unknown) {
  return error instanceof DOMException && (error.name === "QuotaExceededError" || error.name === "NS_ERROR_DOM_QUOTA_REACHED");
}
