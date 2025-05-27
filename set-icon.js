const { app, BrowserWindow, nativeImage } = require('electron');
const path = require('path');

const iconPath = path.join(__dirname, 'build/icons/icon.png');
const image = nativeImage.createFromPath(iconPath);

if (app.dock) { // macOS
  app.dock.setIcon(image);
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: image,
    // ... otras configuraciones
  });
}

app.whenReady().then(createWindow);
