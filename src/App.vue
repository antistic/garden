<template>
  <div id="app">
    <grow></grow>
    <transition name="fade">
      <settings v-show="showSettings === true" @hideSettings="showSettings = false"></settings>
    </transition>
    <infoBar @showSettings="showSettings = true"></infoBar>
  </div>
</template>

<script>
import grow from './components/grow.vue'
import infoBar from './components/infoBar.vue'
import settings from './components/settings.vue'

export default {
  name: 'app',
  components: {
    grow,
    infoBar,
    settings,
  },
  data() {
    return {
      showSettings: false,
    }
  },
}
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Noto Sans', 'San Francisco', 'Helvetica Neue', 'Calibri Light', 'sans-serif';
}

#app {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    image-rendering: pixelated;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
