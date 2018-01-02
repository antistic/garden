import Vue from 'vue'
import Vuex from 'vuex'
import local from './local'

Vue.use(Vuex)

const ding = require('./assets/sounds/ding.wav')

export default new Vuex.Store({
  state: {
    muted: local.get('STORE_MUTED') || false,
    ringing: local.get('STORE_RINGING') || true,
    ringInterval: local.get('STORE_RING_INTERVAL') || 60,
    alertSound: new Audio(ding),
    pomodoros: local.get('STORE_POMODOROS') || 0,
  },
  mutations: {
    toggleMute(state) {
      state.muted = !state.muted
      local.set('STORE_MUTED', state.muted)
    },
    toggleRinging(state) {
      state.ringing = !state.ringing
      local.set('STORE_RINGING', state.ringing)
    },
    setRingingInterval(state, intervalInSeconds) {
      state.ringInterval = intervalInSeconds
      local.set('STORE_RING_INTERVAL', intervalInSeconds)
    },
    addPomodoro(state) {
      state.pomodoros += 1
      local.set('STORE_POMODOROS', state.pomodoros)
    },
  },
})
