<template>
  <div
    id="settings"
    @click="hideSettings">
    <div @click.stop>
      <h2>settings</h2>
      <ul id="setting-list">
        <li>
          <input
            id="mute"
            type="checkbox"
            @change="$shared.toggleMute"
            :checked="$shared.state.muted">
          <label for="mute">Mute</label>
        </li>
        <li>
          <input
            id="keepRinging"
            type="checkbox"
            @change="$shared.toggleRinging"
            :checked="$shared.state.ringing">
          <label for="keepRinging">Keep ringing after timer is up</label>
          <ul>
            <li>
              <label for="ringInterval">
                every
                <input
                  id="ringInterval"
                  class="short"
                  type="number"
                  @change="$shared.setRingInterval(ringInterval)"
                  v-model="ringInterval">
                seconds
              </label>
              <p class="info">(changes after next ring)</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      ringInterval: this.$shared.state.ringInterval
    };
  },
  methods: {
    hideSettings() {
      this.$emit("hideSettings");
    }
  }
};
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

    #setting-list {
      padding: 0;
      margin: 0;
      margin-top: 2em;

      li {
        display: inline-block;
      }
    }
  }

  input[type="number"].short {
    width: 3em;
  }

  p.info {
    color: #aaa;
    margin: 0;
    padding: 0;
    font-size: 0.5em;
  }
}
</style>
