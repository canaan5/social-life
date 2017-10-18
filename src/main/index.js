'use strict'

// import { app, BrowserWindow } from 'electron'
const electron = require('electron')

// Module to control application life.
const app = electron.app

// Module to control app menu
const Menu = electron.Menu

// Module to control app Shell
const shell = electron.shell

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    useContentSize: true
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Exit',
        click () { app.exit() }
      }
    ]
  },
  {
    label: 'Action',
    submenu: [
      {
        label: 'Clear App Data',
        click () {
          let dataPath = app.getPath('userData')
          shell.moveItemToTrash(dataPath)

          app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
          app.exit(0)
        }
      },
      {
        label: 'Reload Application',
        click () { mainWindow.reload() }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
