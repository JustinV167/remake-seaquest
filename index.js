const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Configura el protocolo personalizado
function setupIPC() {
  // Para obtener rutas de la aplicación
  ipcMain.handle('get-path', (_, type) => {
    return app.getPath(type); // 'exe', 'userData', 'appData', etc.
  });

  // Para obtener la ruta de assets (específico para tu caso)
  ipcMain.handle('get-asset-path', (_, relativePath) => {
    return path.join(process.resourcesPath, 'assets', relativePath);
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // IMPORTANTE para seguridad
      nodeIntegration: false  // IMPORTANTE para seguridad
    }
  });

  // Carga el index.html
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  setupIPC();
  createWindow();
});
