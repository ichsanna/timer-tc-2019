const ipcRenderer = require('electron').ipcRenderer;
const moment = require('moment');
const howler = require('howler').Howl;

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
let beforeButton = document.getElementById('before-button');
let nextButton = document.getElementById('next-button');

// Inputs
let editTimerHours = document.getElementById('edit-timer-hours');
let editTimerMinutes = document.getElementById('edit-timer-minutes');
let editTimerSeconds = document.getElementById('edit-timer-seconds');

// Holders
let playButtonHolder = document.getElementById('play-button-holder');
let pauseButtonHolder = document.getElementById('pause-button-holder');

// Modals
let modalResetTimer = document.getElementById('modal-reset-timer');
let modalEditTimer = document.getElementById('modal-edit-timer');

// Sounds
let alert = new howler({
    src: [ __dirname + '/../assets/sounds/notif.mp3' ]
});

/* == Event Listener for the Buttons == */

// Next - Before Controller
beforeButton.addEventListener('click', (element, event) => {
    ipcRenderer.send('EEC-semifinal2', '');
});

nextButton.addEventListener('click', (element, event) => {
    ipcRenderer.send('EEC-pengujian', '');
});


// Timer Controller
homeButton.addEventListener('click', (element, event) => {
    ipcRenderer.send('home', '');
});

timeDisplay.innerText = '02:40:00';
// Default Time
let time = 9600000;

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
    return UIkit.modal(modalResetTimer).show();
});

resetConfirmButton.addEventListener('click', (element, event) => {
    clearInterval(timerNow);
    time = 9600000;
    timeDisplay.innerText = '02:40:00'
    pauseButtonHolder.style.display = 'none';
    playButtonHolder.style.display = 'inline';

    colorController(time);
});

editButton.addEventListener('click', (element, event) => {
    return UIkit.modal(modalEditTimer).show();
});

editConfirmButton.addEventListener('click', () => {
    let newTime = 0;

    if (editTimerHours.value > 0){
        newTime += parseInt(editTimerHours.value) * 3600 * 1000;
    }

    if (editTimerMinutes.value > 0) {
        newTime += parseInt(editTimerMinutes.value) * 60 * 1000;
    }

    if (editTimerSeconds.value > 0) {
        newTime += parseInt(editTimerSeconds.value) * 1000;
    }

    time = newTime;
    colorController(time);
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

    

    editTimerHours.value = '';
    editTimerMinutes.value = '10';
    editTimerSeconds.value = '';
});

// Control the color appearance
function colorController(time) {
    if(moment.duration(time).asSeconds() > 10) {
        timeDisplay.style.color = '#F5BA0D'
    } else {
        timeDisplay.style.color = '#FF0000'
    }
}