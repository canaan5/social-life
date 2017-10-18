import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

import 'materialize-css/dist/css/materialize.min.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {remote} = require('electron')
const {ipcMain} = remote

// Context menu
ipcMain.removeAllListeners(['open-in-new-window'])
ipcMain.removeAllListeners(['app-home'])

ipcMain.on('app-home', (event) => {
  let APP_HOME = new CustomEvent('current-app-home')
  document.dispatchEvent(APP_HOME)
  // remote.webContents().loadURL('http://www.google.com');
})

ipcMain.on('open-in-new-window', (event, link) => {
  let win = new remote.BrowserWindow({width: 800, height: 600})
  win.loadURL(link)

  win.on('closed', () => {
    win = null
  })
})
