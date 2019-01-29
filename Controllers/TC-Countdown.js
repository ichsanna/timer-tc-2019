const ipcRenderer = require('electron').ipcRenderer;
const moment = require('moment');
const howler = require('howler').Howl;

/* == Component Initialization == */
// Display
let daysDisplay = document.getElementById('days-display');
let timeDisplay = document.getElementById('time-display');

// Button
let homeButton = document.getElementById('home-button');

// Sound
let alert = new howler({
    src: [ __dirname + '/../assets/sounds/notif.mp3' ]
});

/* == Event Listener for the Buttons == */

// Timer Controller
homeButton.addEventListener('click', (element, event) => {
    ipcRenderer.send('home', '');
});

let TCDay = 1552089600000;
let currentTime = Date.now();

let differenceTime = TCDay - currentTime;

let countDown = setInterval( () => {
    differenceTime = differenceTime - 1000;
    let timeString = '';
    let dayString = '';

    playAlert(differenceTime);

    if (Math.floor(moment.duration(differenceTime).asDays()) < 10) {
        dayString = dayString + '0';
    }
      
    dayString = dayString + Math.floor(moment.duration(differenceTime).asDays());

    if(moment.duration(differenceTime).hours() < 10) {
        timeString = timeString + '0';
    }

    timeString = timeString + moment.duration(differenceTime).hours() + ':';

    if(moment.duration(differenceTime).minutes() < 10) {
        timeString = timeString + '0';
    }

    timeString = timeString + moment.duration(differenceTime).minutes() + ':';

    if(moment.duration(differenceTime).seconds() < 10) {
        timeString = timeString + '0';
    }

    timeString = timeString + moment.duration(differenceTime).seconds();

    daysDisplay.innerText = dayString;
    timeDisplay.innerText = timeString;

    colorController(differenceTime);

    if(differenceTime === 0) {
        clearInterval(countDown);
    }
}, 1000);

// Control the color appearance
function colorController(time) {
    if(moment.duration(time).asSeconds() > 10) {
        timeDisplay.style.color = '#F5BA0D'
    } else {
        timeDisplay.style.color = '#FF0000'
    }
}

// Control the alert to ring
function playAlert(time) {
    if(moment.duration(time).asSeconds() === 60 || moment.duration(time).asSeconds() === 30 || moment.duration(time).asSeconds() === 10 || (moment.duration(time).asSeconds() <= 5 && moment.duration(time).asSeconds() > 0)) {
        alert.play();
    }
}