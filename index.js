const ipcRenderer = require('electron').ipcRenderer;

// let win;

let EECCard = document.getElementById('EEC-card');
let IoTCard = document.getElementById('IoT-card');

EECCard.addEventListener('click', (element, event) => {
    ipcRenderer.send('EEC-semifinal1', '');
});

IoTCard.addEventListener('click', (element, event) => {
    ipcRenderer.send('IoT-persiapan', '');
});