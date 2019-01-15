const ipcRenderer = require('electron').ipcRenderer;
const moment = require('moment');

let timeDisplay = document.getElementById('time-display');
let homeButton = document.getElementById('home-button');
let resetButton = document.getElementById('reset-button');
let editButton = document.getElementById('edit-button');
let playButton = document.getElementById('play-button');
let pauseButton = document.getElementById('pause-button');
let playButtonHolder = document.getElementById('play-button-holder');
let pauseButtonHolder = document.getElementById('pause-button-holder');

homeButton.addEventListener('click', (element, event) => {
    ipcRenderer.send('home', '');
});

timeDisplay.innerText = '00:15:00';
// Default Time
let time = 9000;

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

        // if(moment.duration(time).milliseconds() < 1000) {
        //     timerString = timeString + '0';  
        // }

        // if(moment.duration(time).milliseconds() < 100) {
        //     timeString = timeString + '0';
        // }

        // timeString = timeString + moment.duration(time).milliseconds();

        timeDisplay.innerText = timeString;

        if(time === 0) {
            pauseButtonHolder.style.display = 'none';
            playButtonHolder.style.display = 'inline';

            clearInterval(timerNow);
            time = 9000;
            timeDisplay.innerText = '00:15:00';
        }
    }, 1000);
});

pauseButton.addEventListener('click', (element, event) => {
    pauseButtonHolder.style.display = 'none';
    playButtonHolder.style.display = 'inline';

    clearInterval(timerNow);
});