<template>
  <div id="app">
    <grow />
    <transition name="fade">
      <settings
        v-show="showSettings === true"
        @hideSettings="showSettings = false" />
    </transition>
    <infoBar @showSettings="showSettings = true" />
  </div>
</template>

<script>
import grow from "./components/grow.vue";
import infoBar from "./components/infoBar.vue";
import settings from "./components/settings.vue";

export default {
  name: "App",
  components: {
    grow,
    infoBar,
    settings
  },
  data() {
    return {
      showSettings: false
    };
  }
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: "Noto Sans", "San Francisco", "Helvetica Neue", "Calibri Light",
    "sans-serif";
}

#app {
  img {
    image-rendering: pixelated;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to,
.fade-slow-enter,
.fade-slow-leave-to {
  opacity: 0;
}

.fade-slow-enter-active,
.fade-slow-leave-active {
  transition: opacity 0.4s;
}

.slide-enter-active,
.slide-leave-active {
  transition-duration: 0.5s;
  transition-property: opacity, height, transform;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-50vh);
}
</style>
