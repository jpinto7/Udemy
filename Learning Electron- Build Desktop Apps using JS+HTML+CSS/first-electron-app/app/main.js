const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 800,
    width: 600,
    show: false
  });
  const filePath = url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  });
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  });
  mainWindow.webContents.loadURL(filePath);
});
