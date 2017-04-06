export default {
  data: JSON.parse(window.localStorage.vuex || '{}'),
  get(key) {
    return JSON.parse(this.data[key] || null)
  },
  set(key, value) {
    window.localStorage[key] = JSON.stringify(value)
  },
}
