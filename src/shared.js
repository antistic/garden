import local from "./local";

const ding = require("./assets/sounds/ding.wav");

export default {
  state: {
    muted: local.get("STORE_MUTED") || false,
    ringing: local.get("STORE_RINGING") || true,
    ringInterval: local.get("STORE_RING_INTERVAL") || 60,
    alertSound: new Audio(ding),
    pomodoros: local.get("STORE_POMODOROS") || 0
  },
  toggleMute() {
    this.state.muted = !this.state.muted;
    local.set("STORE_MUTED", this.state.muted);
  },
  toggleRinging() {
    this.state.ringing = !this.state.ringing;
    local.set("STORE_RINGING", this.state.ringing);
  },
  setRingInterval(intervalInSeconds) {
    this.state.ringInterval = intervalInSeconds;
    local.set("STORE_RING_INTERVAL", intervalInSeconds);
  },
  addPomodoro() {
    this.state.pomodoros += 1;
    local.set("STORE_POMODOROS", this.state.pomodoros);
  }
};
