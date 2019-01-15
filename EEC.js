const ipcRenderer = require('electron').ipcRenderer;

let homeButton = document.getElementById('home-button');
let resetButton = document.getElementById('reset-button');
let editButton = document.getElementById('edit-button');
let playButton = document.getElementById('play-button');
let pauseButton = document.getElementById('pause-button');

homeButton.addEventListener('click', (element, event) => {
    ipcRenderer.send('home', '');
});