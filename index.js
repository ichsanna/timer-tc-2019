const ipcRenderer = require('electron').ipcRenderer;

// let win;

let EECCard = document.getElementById('EEC-card');
let IoTCard = document.getElementById('IoT-card');
let TCCountDown = document.getElementById('TC-countdown');

EECCard.addEventListener('click', (element, event) => {
    ipcRenderer.send('EEC-semifinal1', '');
});

IoTCard.addEventListener('click', (element, event) => {
    ipcRenderer.send('IoT-persiapan', '');
});

TCCountDown.addEventListener('click', (element, event) => {
    ipcRenderer.send('TC-countdown', '');
});