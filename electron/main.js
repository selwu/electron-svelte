const { app, BrowserWindow, ipcMain } = require('electron');
const { join } = require('path');

const isDev = process.env.IS_DEV == 'true' ? true : false;

function createWindow() {
  const mainWindow = new BrowserWindow({
    minWidth: 1176,
    minHeight: 768,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${join(__dirname, '../dist/index.html')}`
  );
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
