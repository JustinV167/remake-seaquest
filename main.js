const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const setAppIcon = require('./set-icon'); // Importa la función

let mainWindow;

function createWindow() {
  const icon = setAppIcon(); // Obtiene el icono configurado

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
        icon: icon, // Asigna el icono aquí
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  mainWindow.loadFile('index.html');

  // Abrir herramientas de desarrollo (opcional)
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

ipcMain.on('close-game', () => {
    const window = BrowserWindow.getFocusedWindow();
    if (window) window.close();
});

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
