const ipcRenderer = require('electron').ipcRenderer;
// let win;

let EECCard = document.getElementById('EEC-card');
let IoTCard = document.getElementById('IoT-card');
let TCCountDown = document.getElementById('TC-countdown');

EECCard.addEventListener('click', (element, event) => {
    ipcRenderer.send('TC-Lomba', 'EEC');
});

IoTCard.addEventListener('click', (element, event) => {
    ipcRenderer.send('TC-Lomba', 'IoT');
});

TCCountDown.addEventListener('click', (element, event) => {
    ipcRenderer.send('TC-Countdown', '');
});