export type ActiveTimerState = {
  accumulatedMs: number;
  completed: boolean;
  runningSinceMs: number | null;
  started: boolean;
};

export function createActiveTimer(): ActiveTimerState {
  return {
    accumulatedMs: 0,
    completed: false,
    runningSinceMs: null,
    started: false,
  };
}

export function startActiveTimer(state: ActiveTimerState, nowMs: number): ActiveTimerState {
  if (state.started || state.completed) return state;
  return { ...state, runningSinceMs: finiteNow(nowMs), started: true };
}

export function pauseActiveTimer(state: ActiveTimerState, nowMs: number): ActiveTimerState {
  if (state.runningSinceMs === null || state.completed) return state;
  return {
    ...state,
    accumulatedMs: elapsedActiveTime(state, nowMs),
    runningSinceMs: null,
  };
}

export function resumeActiveTimer(state: ActiveTimerState, nowMs: number): ActiveTimerState {
  if (!state.started || state.completed || state.runningSinceMs !== null) return state;
  return { ...state, runningSinceMs: finiteNow(nowMs) };
}

export function completeActiveTimer(state: ActiveTimerState, nowMs: number): ActiveTimerState {
  if (state.completed) return state;
  const paused = pauseActiveTimer(state, nowMs);
  return { ...paused, completed: true, runningSinceMs: null };
}

export function elapsedActiveTime(state: ActiveTimerState, nowMs: number): number {
  if (state.runningSinceMs === null) return state.accumulatedMs;
  return state.accumulatedMs + Math.max(0, finiteNow(nowMs) - state.runningSinceMs);
}

function finiteNow(nowMs: number) {
  return Number.isFinite(nowMs) ? nowMs : 0;
}
