export interface GymBridge {
  loadStore: () => Promise<unknown>;
  saveStore: (state: unknown) => Promise<boolean>;
  openTextFile: () => Promise<{ name: string; text: string } | null>;
  fetchText: (url: string) => Promise<string>;
  fetchJson: (url: string) => Promise<unknown>;
}

declare global {
  interface Window {
    gym?: GymBridge;
  }
}

export {};
