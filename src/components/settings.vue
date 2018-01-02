<template>
  <div
    id="settings"
    @click="hideSettings">
    <div @click.stop>
      <h2>settings</h2>
      <ul>
        <li>
          <input
            id="mute"
            type="checkbox"
            @change="$store.commit('toggleMute')"
            :checked="$store.state.muted">
          <label for="mute">Mute</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  methods: {
    hideSettings() {
      this.$emit('hideSettings')
    },
  },
}
</script>

<style lang="scss">
#settings {
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);

  @include flex-center;

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
