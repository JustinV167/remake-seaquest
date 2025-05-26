const { ipcRenderer, contextBridge } = require('electron');

// Expone APIs seguras al renderer
contextBridge.exposeInMainWorld('electronAPI', {
  getPath: (type) => ipcRenderer.invoke('get-path', type),
  getAssetPath: (relativePath) => ipcRenderer.invoke('get-asset-path', relativePath)
});
