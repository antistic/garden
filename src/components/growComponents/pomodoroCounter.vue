<template>
  <div
    id="pomodoros"
    v-if="pomodoros > 0">
    <span>{{ pomodoros }}</span>
    <div class="pomodoro" />
  </div>
</template>

<script>
export default {
  name: 'PomodoroCounter',
  computed: {
    pomodoros() {
      return this.$store.state.pomodoros
    },
  },
}
</script>

<style lang="scss">
#pomodoros {
  margin-top: 1em;
  .pomodoro {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    display: inline-block;
    background-color: #EE2222;
    margin: 0 3px;
  }
}
</style>
