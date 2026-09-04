import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("gym", {
  loadStore: () => ipcRenderer.invoke("store:load"),
  saveStore: (state: unknown) => ipcRenderer.invoke("store:save", state),
  openTextFile: () => ipcRenderer.invoke("dialog:openText"),
  fetchText: (url: string) => ipcRenderer.invoke("net:fetchText", url),
  fetchJson: (url: string) => ipcRenderer.invoke("net:fetchJson", url)
});
