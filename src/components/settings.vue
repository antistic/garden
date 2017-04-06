<template>
  <div id="settings" @click="hideSettings">
    <div @click.stop>
      <h2>settings</h2>
      <ul>
        <li>
          <span>Timer sound: </span>
          <button @click="toggleMute">{{muteButtonText}}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'settings',
  computed: {
    muteButtonText() {
      return this.$store.state.muted ? 'Unmute' : 'Mute'
    },
  },
  methods: {
    hideSettings() {
      this.$emit('hideSettings')
    },
    toggleMute() {
      this.$store.commit('toggleMute')
    },
  },
}
</script>

<style lang="scss">
#settings {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);

  display: flex;
  align-items: center;
  justify-content: center;

  div {
    background-color: #fff;
    padding: 2em;
    width: 300px;

    h2 {
      margin: 0;
    }

    ul {
      padding: 0;
      margin: 0;
      margin-top: 2em;

      li {
        display: inline-block;
      }
    }
  }
}
</style>
