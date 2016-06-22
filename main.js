var s,
GardenApp = {
    settings: {
        startButton: document.getElementById("start"),
        stopButton: document.getElementById("stop"),
        settingsButton: document.getElementById("settingsButton"),
        timeText: document.getElementById("time"),
        marks: document.getElementById("marks"),
        showSettings: false,
        allowAlert: true,
        muted: false,
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
        UI.bindUIActions();
        this.load();
    },

    startTimer: function() {
        timer.start('tomato');
    },

    addMark: function(thing) {
        var newMark = document.createElement("div");
        newMark.className = "mark " + thing;
        s.marks.appendChild(newMark);
    },

    toggleMute: function() {
        s.muted = !s.muted;
    },

    reset: function() {
        var doIt = window.confirm("Do you really want to reset?");
        if (doIt){
            document.location.reload();
            localStorage.clear();
        }
    }
};

var UI = {
    vars: {
        plantImg: document.getElementById("plant"),
        settingsDiv: document.getElementById("settings"),
    },

    bindUIActions: function() {
        s.startButton.addEventListener("click", function() {
            GardenApp.startTimer();
        });
        s.stopButton.addEventListener("click", function() {
            timer.cancel();
        });
        s.settingsButton.addEventListener("click", function() {
            UI.toggleSettings();
        });
        document.getElementById("mute").addEventListener("click", function() {
            GardenApp.toggleMute();
        });
        document.getElementById("reset").addEventListener("click", function() {
            GardenApp.reset();
        });
    },

    loadPlant: function(plantType) {
        var path = "./imgs/plants/" + plantType + "/x.png";
        this.vars.plantImg.style.backgroundImage = "url(" + path + ")";
        this.vars.plantImg.classList = "";
    },

    unloadPlant: function() {
        this.vars.plantImg.classList = "hidden";
    },

    updatePlant: function(plantType, number) {
        this.vars.plantImg.style.backgroundPosition = (number * -256) + "px";
    },

    toggleSettings: function() {
        if (s.showSettings) {
            this.hideSettings();
        } else {
            this.showSettings();
        }
    },

    showSettings: function() {
        s.showSettings = true;
        this.vars.settingsDiv.classList = "";
        document.addEventListener("click", UI.outsideDivHandler);
    },

    hideSettings: function() {
        s.showSettings = false;
        this.vars.settingsDiv.classList = "hidden";
        document.removeEventListener("click", UI.outsideDivHandler);
    },

    outsideDivHandler: function(e) {
        if (e.target.id == "settings") {
            UI.hideSettings();
        }
    }
};

var timer = {
    startTime: 0,
    stopTime: 0,
    timeLeft: {
        mins: -1,
        secs: -1,
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
        UI.loadPlant(this.active);

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
        UI.unloadPlant();
        GardenApp.save();
    },
    updateClock: function() {
        var time = this.stopTime - (new Date).getTime();
        time = Math.floor(time/1000);
        var mins = Math.floor(time % 3600 / 60);
        var secs = Math.floor(time % 3600 % 60);

        s.timeText.textContent = mins + ":" + (secs < 10 ? "0" : "") + secs;

        if (this.timeLeft.mins != mins) {
            UI.updatePlant(this.active, this.types[this.active] - mins - 1);
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
            UI.loadPlant(this.active);
            this.run();
        }
    },
};

function notifyMe(notificationText) {
    if (!s.mute) { document.getElementById("sound").play(); };
    alert(notificationText);
};

(function() {
    GardenApp.init();
})();
