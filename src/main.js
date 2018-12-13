import Vue from "vue";
import App from "./App.vue";
import shared from "./shared";
import local from "./local";

Vue.prototype.$shared = shared;
Vue.prototype.$local = local;

export default new Vue({
  el: "#app",
  render: h => h(App)
});
