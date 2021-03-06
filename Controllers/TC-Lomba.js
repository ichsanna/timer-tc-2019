const ipcRenderer = require('electron').ipcRenderer;
const moment = require('moment');
const howler = require('howler').Howl;
let query = location.search;

/* == Component Initialization == */
// Title
let lomba;
if (query === '?EEC') lomba = 'Electrical Engineering Competition';
else if (query === '?IoT') lomba = 'IoT Development Competition';
let namasesi = document.getElementById('namasesi');

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

//Data [sesi, display waktu, waktu (ms)]
let dataEEC = [
	['Semifinal I','01:00:00',3600000],
	['Semifinal II','00:10:00',600000],
	['Pembuatan Alat','02:40:00',9600000],
	['Pengujian','00:05:00',300000],
	['Presentasi','00:15:00',900000],
	['Tanya Jawab','00:10:00',600000]
	];
let dataIoT = [
	['Persiapan','00:05:00',300000],
	['Presentasi','00:15:00',900000],
	['Tanya Jawab','00:10:00',600000]
	];
// Sound
let alert = new howler({
    src: [ __dirname + '/../assets/sounds/notif.mp3' ]
});
//Initialization
let nomorsesi = 0;
let currentSesi;
let currentTime;
let currentTimeDisplay;
let timerNow;
let time;
document.title = lomba;
namalomba.innerText = lomba;
function init(){
	// Nama Sesi
	if (lomba === 'Electrical Engineering Competition'){
		currentSesi = dataEEC[nomorsesi][0];
		currentTimeDisplay = dataEEC[nomorsesi][1];
		currentTime = dataEEC[nomorsesi][2];
	}
	else if (lomba === 'IoT Development Competition'){
		currentSesi = dataIoT[nomorsesi][0];
		currentTimeDisplay = dataIoT[nomorsesi][1];
		currentTime = dataIoT[nomorsesi][2];
	}
	namasesi.innerText = currentSesi;
	resetTime();
	pauseTime();
}
init();

/* == Event Listener for the Buttons == */

// Next - Before Controller
beforeButton.addEventListener('click', (element, event) => {
    if ( lomba === 'Electrical Engineering Competition'){
		if (nomorsesi > 0) nomorsesi--;
		else nomorsesi=5;
	}
	if ( lomba === 'IoT Development Competition'){
		if (nomorsesi > 0) nomorsesi--;
		else nomorsesi=2;
	}
	init();
});

nextButton.addEventListener('click', (element, event) => {
    if ( lomba === 'Electrical Engineering Competition'){
		if (nomorsesi < 5) nomorsesi++;
		else nomorsesi=0;
	}
	if ( lomba === 'IoT Development Competition'){
		if (nomorsesi < 2) nomorsesi++;
		else nomorsesi=0;
	}
	init();
});

// Timer Controller
homeButton.addEventListener('click', (element, event) => {
    ipcRenderer.send('home', '');
});

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
            if(time === 0) pauseTime();
        }, 1000);
    } 
});

pauseButton.addEventListener('click', (element, event) => {
    pauseTime();
});

resetButton.addEventListener('click', (element, event) => {
    return UIkit.modal(modalResetTimer).show();
});

resetConfirmButton.addEventListener('click', (element, event) => {
    time = currentTime;
    timeDisplay.innerText = currentTimeDisplay;
	pauseTime();

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
    editTimerMinutes.value = '';
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

// Pauses time
function pauseTime(){
	pauseButtonHolder.style.display = 'none';
    playButtonHolder.style.display = 'inline';
    
    clearInterval(timerNow);
}

// Reset time when time is up
function resetTime() {
	//Time Display
    timeDisplay.innerText = currentTimeDisplay;
	//Timer
    time = currentTime;
	colorController(currentTime);
}

// Control the alert to ring
function playAlert(time) {
    if(moment.duration(time).asSeconds() === 60 || moment.duration(time).asSeconds() === 30 || moment.duration(time).asSeconds() === 10 || (moment.duration(time).asSeconds() <= 5 && moment.duration(time).asSeconds() > 0)) {
        alert.play();
    }
}