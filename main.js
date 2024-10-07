// Modules to control application life and create native browser window
// DENNA KÖR NODE JS
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    autoHideMenuBar: false // true to hide, press Alt to show when hidden
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open DevTools automatically (comment out if you don't want it)
  mainWindow.webContents.openDevTools() // så att inspectorn kommer fram vid öppning (shift + ctrl +  1 anars)

}

// Called when Electron is ready to create browser windows.
app.whenReady().then(() => {


  createWindow()

  // Check original template for MacOS stuff!
}) // startar appen och vi får vårt fönster

// Example functions for communication between main and renderer (backend/frontend)
// invikar i preload, då körs funktioner
ipcMain.handle('get-stuff-from-main', () => 'Stuff from main!')
// tar nu emt datan, event msåt alltid va där, sedan loggas datan (syns i node)
// COnsole log i main --> nodemon erminal
// consoloe log irender --> browser consolen 
ipcMain.handle('send-stuff-to-main', async (event, data) => console.log(data))

ipcMain.handle('user-message', async (event, data) => {
  console.log(data)

  return 'Message recieved'
  
})



app.on('window-all-closed', function () {
  app.quit()
  // Check original template for MacOS stuff!
}) // elcetron stängs av, inget iminnet då man klickar bort browser windowet


