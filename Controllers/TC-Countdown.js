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

let TCDay = moment('09-03-2019 00:07:00', 'DD-MM-YY HH:mm:ss').unix();
let current = moment().unix();

timeDisplay.innerText = '00:15:00';
daysDisplay.innerText = '30';
// Default Time
let time = 900000;

// Dynamic Time
let timerNow;

playButton.addEventListener('click', (element, event) => {
    // Prevent Negative Time
    if (time === 0) {
        resetTime();
        colorController(time);
    } else {
        playButtonHolder.style.display = 'none';
        pauseButtonHolder.style.display = 'inline';
    
        timerNow = setInterval( () => {
            time = time - 1000;
            let timeString = '';

            playAlert(time);
              
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
    } 
});

// Control the color appearance
function colorController(time) {
    if(moment.duration(time).asSeconds() > 10) {
        timeDisplay.style.color = '#F5BA0D'
    } else {
        timeDisplay.style.color = '#FF0000'
    }
}