const { app, BrowserWindow, ipcMain, shell } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1728,
    height: 972,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  win.loadURL('http://192.168.115.176/admin.php')
//   win.webContents.openDevTools()
}

// 监听消息，打开文件夹
ipcMain.handle('open-folder', async (event, folderPath) => {
  const result = await shell.openPath(folderPath)
  if (result) {
    return { success: false, error: result }
  } else {
    return { success: true }
  }
})

app.whenReady().then(createWindow)