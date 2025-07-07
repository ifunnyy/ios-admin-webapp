const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  openFolder: async (path) => {
    return await ipcRenderer.invoke('open-folder', path)
  }
})

// 监听来自 iframe 的消息，转发给主进程
window.addEventListener('message', (event) => {
  // 你可以加安全检查 event.origin，确保来源可信
  if (event.data?.type === 'open-folder') {
    ipcRenderer.send('open-folder', event.data.path)
  }
})