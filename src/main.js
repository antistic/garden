import Vue from 'vue'
import App from './App.vue'
import store from './store'
import local from './local'

Vue.prototype.$local = local

export default new Vue({
  el: '#app',
  store,
  render: h => h(App),
})
