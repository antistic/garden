<template>
  <div id="infoBar">
    <ul>
      <li id="github">
        <a
          target="_blank"
          href="http://github.com/notantonia/garden">
          <img
            src="../assets/imgs/github.png"
            alt="github">
        </a>
        <span>github</span>
      </li>
      <li id="settingsButton">
        <span>settings</span>
        <img
          src="../assets/imgs/settings.png"
          alt="settings"
          @click="showSettings">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'InfoBar',
  methods: {
    showSettings() {
      this.$emit('showSettings')
    },
  },
}
</script>

<style lang="scss">
$imgSize: 30px;

#infoBar {
  position: fixed;
  width: 100%;
  bottom: 0;

  ul {
    margin: 0;
    padding: 1em;
    display: flex;
    justify-content: space-between;

    li {
      display: flex;

      img {
        width: $imgSize;
        height: $imgSize;
        background-size: $imgSize $imgSize;
        box-sizing: border-box;
        cursor: pointer;

        &:active, &:focus {
          padding-left: $imgSize;
        }
      }

      span {
        font-size: 0.8em;
        color: transparent;
        padding: 0 5px;
        transition: color 0.2s;
      }
    }
  }

  &:hover ul > li > span {
    color: #aaa;
  }
}

#github a img {
  background: url("../assets/imgs/github-pressed.png")
}

#settingsButton img {
  background: url("../assets/imgs/settings-pressed.png")
}

</style>
