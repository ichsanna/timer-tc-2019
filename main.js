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

// EEC
ipcMain.on('EEC', (event, arg) => {
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/views/EEC.html'),
        protocol: 'file:',
        slashes: true
    }));
});

// IoT
ipcMain.on('IoT-persiapan', (event, arg) => {
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/views/IoT-Persiapan.html'),
        protocol: 'file:',
        slashes: true
    }));
});

ipcMain.on('IoT-tanya-jawab', (event, arg) => {
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/views/IoT-TanyaJawab.html'),
        protocol: 'file:',
        slashes: true
    }));
});

ipcMain.on('IoT-presentasi', (event, arg) => {
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/views/IoT-Presentasi.html'),
        protocol: 'file:',
        slashes: true
    }));
});