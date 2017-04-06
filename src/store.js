import Vue from 'vue'
import Vuex from 'vuex'
import local from './local'

Vue.use(Vuex)

const ding = require('./assets/sounds/ding.wav')

export default new Vuex.Store({
  state: {
    muted: local.get('STORE_MUTED') || false,
    alertSound: new Audio(ding),
    pomodoros: local.get('STORE_POMODOROS') || 0,
  },
  mutations: {
    toggleMute(state) {
      state.muted = !state.muted
      local.set('STORE_MUTED', state.muted)
    },
    addPomodoro(state) {
      state.pomodoros += 1
      local.set('STORE_POMODOROS', state.pomodoros)
    },
  },
})
