var s,
GardenApp = {
    settings: {
        startButton: document.getElementById("start"),
        stopButton: document.getElementById("stop"),
        timeText: document.getElementById("time"),
        marks: document.getElementById("marks"),
        plantImg: document.getElementById("plant"),
        allowAlert: true,
    },

    data: {
        tomato: 0,
        orange: 0,
    },

    saveData: function() {
        localStorage.setItem('data', JSON.stringify( this.data ));
    },

    loadData: function() {
        var data = JSON.parse(localStorage.getItem('data'));
        if (data != undefined) {
            this.data = data
        }
        for (var i = 0; i < this.data.tomato; i++) {
            this.addMark('tomato');
        }
    },

    save: function() {
        this.saveData();
        timer.save();
    },

    load: function() {
        this.loadData();
        timer.load();
    },

    init: function() {
        s = this.settings;
        this.bindUIActions();
        this.load();
    },

    bindUIActions: function() {
        s.startButton.addEventListener("click", function() {
            GardenApp.startTimer();
        })
        s.stopButton.addEventListener("click", function() {
            timer.cancel();
        })
    },

    startTimer: function() {
        timer.start('tomato');
    },

    addMark: function(thing) {
        var newMark = document.createElement("div");
        newMark.className = "mark " + thing;
        s.marks.appendChild(newMark);
    },

    updatePlant: function(plantType, number) {
        var path = "./imgs/plants/" + plantType + "/a/" + number + ".png"
        s.plantImg.src = path;
    }
};

var timer = {
    startTime: 0,
    stopTime: 0,
    timeLeft: {
        mins: 0,
        secs: 0,
    },
    running: false,
    intervalID: null,
    minutesC: 1000*60,
    active: 'tomato',
    types: {
        tomato: 25,
    },
    start: function(type){
        var d = (new Date).getTime();
        this.startTime = d;
        this.stopTime = d + this.types[type] * this.minutesC;
        this.active = type;
        this.running = true;

        GardenApp.save();
        this.run();
    },
    run: function() {
        this.updateClock.bind(this);
        this.intervalID = window.setInterval(this.updateClock.bind(this), 500);
    },
    stop: function() {
        GardenApp.addMark(this.active);
        GardenApp.data[this.active] += 1;
        notifyMe("Time's up!");
        this.cancel();
    },
    cancel: function() {
        window.clearInterval(this.intervalID);
        timer.stopTime = 0;
        this.running = false;
        s.timeText.textContent = '0:00';
        GardenApp.save();
    },
    updateClock: function() {
        var time = this.stopTime - (new Date).getTime();
        time = Math.floor(time/1000);
        var mins = Math.floor(time % 3600 / 60);
        var secs = Math.floor(time % 3600 % 60);

        s.timeText.textContent = mins + ":" + (secs < 10 ? "0" : "") + secs;

        if (this.timeLeft.mins != mins) {
            GardenApp.updatePlant(this.active, this.types[this.active] - mins);
        }
        this.timeLeft.mins = mins;
        this.timeLeft.secs = secs;

        if (time <= 0) {
            this.stop();
        }
    },
    save: function() {
        localStorage.setItem('timerEnd', JSON.stringify( this.stopTime ));
        localStorage.setItem('timerRunning', JSON.stringify( this.running ));
    },

    load: function() {
        var timerRunning = JSON.parse(localStorage.getItem('timerRunning'));
        if (timerRunning != null && timerRunning) {
            var timerEnd = JSON.parse(localStorage.getItem('timerEnd'));
            if (timerEnd != undefined) {
                this.stopTime = timerEnd;
            }
            this.run();
        }
    },
};

function notifyMe(notificationText) {
    document.getElementById("sound").play();
    alert(notificationText);
};

(function() {
    GardenApp.init();
})();
