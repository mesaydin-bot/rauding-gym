import { defaultState, type AppState } from "../types";

const KEY = "rauding-gym-state-v1";

export async function loadState(): Promise<AppState> {
  try {
    if (window.gym?.loadStore) {
      const remote = await window.gym.loadStore();
      if (remote && typeof remote === "object") return mergeState(remote as AppState);
    }
    const raw = localStorage.getItem(KEY);
    if (raw) return mergeState(JSON.parse(raw) as AppState);
  } catch {
    // fall through
  }
  return defaultState();
}

export async function saveState(state: AppState): Promise<void> {
  localStorage.setItem(KEY, JSON.stringify(state));
  if (window.gym?.saveStore) {
    await window.gym.saveStore(state);
  }
}

function mergeState(partial: Partial<AppState>): AppState {
  const base = defaultState();
  return {
    ...base,
    ...partial,
    settings: { ...base.settings, ...partial.settings },
    progress: {
      study: { ...base.progress.study, ...partial.progress?.study },
      normal: { ...base.progress.normal, ...partial.progress?.normal },
      gist: { ...base.progress.gist, ...partial.progress?.gist },
      scan: { ...base.progress.scan, ...partial.progress?.scan }
    },
    customPassages: partial.customPassages ?? [],
    sessions: partial.sessions ?? [],
    reviews: partial.reviews ?? [],
    vocabulary: partial.vocabulary ?? []
  };
}
