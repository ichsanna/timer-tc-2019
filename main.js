const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const ipcMain = require('electron').ipcMain;
let win;

function createWindow () {
    win = new BrowserWindow({ frame: false });

    win.setFullScreen(true);

    win.loadURL(url.format({
        pathname: path.join(__dirname, '/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if(win === null) {
        createWindow();
    }
});

// Event Listener

ipcMain.on('home', (event, arg) => {
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/index.html'),
        protocol: 'file:',
        slashes: true
    }))
})

// Lomba
ipcMain.on('TC-Lomba', (event, arg) => {
	let lomba = arg;
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/views/TC-Lomba.html'),
        protocol: 'file:',
        slashes: true,
		search: arg
    }));
});


// TC Countdown
ipcMain.on('TC-Countdown', (event, arg) => {
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/views/TC-Countdown.html'),
        protocol: 'file:',
        slashes: true
    }));
})