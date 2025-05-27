// set-icon.js
const { nativeImage, app } = require('electron');
const path = require('path');

module.exports = function setAppIcon() {
  const iconPath = process.platform === 'win32'
    ? path.join(__dirname, 'build/icons/icon.ico')
    : path.join(__dirname, 'build/icons/icon.png');

  const icon = nativeImage.createFromPath(iconPath);
  
  if (!icon.isEmpty() && process.platform === 'darwin') {
    app.dock.setIcon(icon);
  }
  
  return icon;
};
