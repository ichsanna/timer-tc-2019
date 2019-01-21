const ipcRenderer = require('electron').ipcRenderer;
const moment = require('moment');

/* == Component Initialization == */
// Time Display
let timeDisplay = document.getElementById('time-display');

// Buttons
let homeButton = document.getElementById('home-button');
let resetButton = document.getElementById('reset-button');
let editButton = document.getElementById('edit-button');
let playButton = document.getElementById('play-button');
let pauseButton = document.getElementById('pause-button');
let resetConfirmButton = document.getElementById('button-reset-confirm');
let editConfirmButton = document.getElementById('button-edit-confirm');

// Inputs
let editTimerHours = document.getElementById('edit-timer-hours').value;
let editTimerMinutes = document.getElementById('edit-timer-minutes').value;
let editTimerSeconds = document.getElementById('edit-timer-seconds').value;

// Holders
let playButtonHolder = document.getElementById('play-button-holder');
let pauseButtonHolder = document.getElementById('pause-button-holder');

// Modals
let modalResetTimer = document.getElementById('modal-reset-timer');
let modalEditTimer = document.getElementById('modal-edit-timer');

/* == Event Listener for the Buttons == */

homeButton.addEventListener('click', (element, event) => {
    ipcRenderer.send('home', '');
});

timeDisplay.innerText = '00:00:20';
// Default Time
let time = 20000;

// Dynamic Time
let timerNow;

playButton.addEventListener('click', (element, event) => {
    playButtonHolder.style.display = 'none';
    pauseButtonHolder.style.display = 'inline';

    timerNow = setInterval( () => {
        time = time - 1000;
        let timeString = '';

        if(moment.duration(time).hours() < 10) {
            timeString = timeString + '0';
        }

        timeString = timeString + moment.duration(time).hours() + ':';

        if(moment.duration(time).minutes() < 10) {
            timeString = timeString + '0';
        }

        timeString = timeString + moment.duration(time).minutes() + ':';

        if(moment.duration(time).seconds() < 10) {
            timeString = timeString + '0';
        }

        timeString = timeString + moment.duration(time).seconds();

        timeDisplay.innerText = timeString;
        colorController(time);
        if(time === 0) {
            pauseButtonHolder.style.display = 'none';
            playButtonHolder.style.display = 'inline';

            clearInterval(timerNow);
        }
    }, 1000);
});

pauseButton.addEventListener('click', (element, event) => {
    pauseButtonHolder.style.display = 'none';
    playButtonHolder.style.display = 'inline';

    clearInterval(timerNow);
});

resetButton.addEventListener('click', (element, event) => {


    // clearInterval(timerNow);
    return UIkit.modal(modalResetTimer).show();
    // time = 20000;
    // timeDisplay.innerText = '00:00:20'
    // pauseButtonHolder.style.display = 'none';
    // playButtonHolder.style.display = 'inline';

    // colorController(time);
});

resetConfirmButton.addEventListener('click', (element, event) => {
    clearInterval(timerNow);
    time = 20000;
    timeDisplay.innerText = '00:00:20'
    pauseButtonHolder.style.display = 'none';
    playButtonHolder.style.display = 'inline';

    colorController(time);
});

editButton.addEventListener('click', (element, event) => {
    return UIkit.modal(modalEditTimer).show();
});

// Control the color appearance
function colorController(time) {
    if(moment.duration(time).seconds() > 10) {
        timeDisplay.style.color = '#F5BA0D'
    } else {
        timeDisplay.style.color = '#FF0000'
    }
}