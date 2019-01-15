const ipcRenderer = require('electron').ipcRenderer;

// let win;

let EECCard = document.getElementById('EEC-card');
let IoTCard = document.getElementById('IoT-card');

EECCard.addEventListener('click', (element, event) => {
    ipcRenderer.send('EEC', '');
});

IoTCard.addEventListener('click', (element, event) => {
    ipcRenderer.send('IoT', '');
});