import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const STORE_NAME = "rauding-gym-state.json";

function storePath(): string {
  return join(app.getPath("userData"), STORE_NAME);
}

function ensureDir(filePath: string): void {
  mkdirSync(dirname(filePath), { recursive: true });
}

function createWindow(): void {
  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 880,
    minHeight: 640,
    backgroundColor: "#161412",
    title: "Rauding Gym",
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, "../preload/index.mjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  if (process.env.ELECTRON_RENDERER_URL) {
    void win.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    void win.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

app.whenReady().then(() => {
  ipcMain.handle("store:load", () => {
    const path = storePath();
    if (!existsSync(path)) return null;
    try {
      return JSON.parse(readFileSync(path, "utf8"));
    } catch {
      return null;
    }
  });

  ipcMain.handle("store:save", (_event, state: unknown) => {
    const path = storePath();
    ensureDir(path);
    writeFileSync(path, JSON.stringify(state, null, 2), "utf8");
    return true;
  });

  ipcMain.handle("dialog:openText", async () => {
    const result = await dialog.showOpenDialog({
      title: "Open a passage",
      properties: ["openFile"],
      filters: [{ name: "Text", extensions: ["txt", "md"] }]
    });
    if (result.canceled || !result.filePaths[0]) return null;
    const path = result.filePaths[0];
    const text = readFileSync(path, "utf8");
    return { name: path.split(/[\\/]/).pop() ?? "untitled.txt", text };
  });

  ipcMain.handle("net:fetchText", async (_event, url: string) => {
    const res = await fetch(url, {
      headers: { "User-Agent": "RaudingGym/1.0 (local educational reader)" }
    });
    if (!res.ok) {
      throw new Error(`Fetch failed (${res.status})`);
    }
    return await res.text();
  });

  ipcMain.handle("net:fetchJson", async (_event, url: string) => {
    const res = await fetch(url, {
      headers: { "User-Agent": "RaudingGym/1.0 (local educational reader)" }
    });
    if (!res.ok) {
      throw new Error(`Fetch failed (${res.status})`);
    }
    return await res.json();
  });

  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
