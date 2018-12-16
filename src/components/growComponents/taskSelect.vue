<template>
  <div class="taskSelect">
    <div class="select">
      <div>
        <h1>I will&nbsp;</h1>
        <input
          type="text"
          placeholder="do something great"
          size="18"
          autofocus
          v-model="taskInput"
          @keyup.enter="go(25)"
        >
        <h1>for</h1>
      </div>
      <div>
        <div class="buttons">
          <button class="minuteSelection" @click="go(5)">5</button>
          <button class="minuteSelection" @click="go(25)">25</button>
          <button class="minuteSelection" @click="go(50)">50</button>
        </div>
        <h1>minutes.</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskSelect",
  data() {
    return {
      taskInput: ""
    };
  },
  methods: {
    go(minutes) {
      this.$emit("goAction", this.taskInput, minutes);
    }
  }
};
</script>

<style lang="scss">
.taskSelect {
  @include flex-center;

  .select {
    @include flex-center;
    flex-direction: column;

    div {
      @include flex-center;
      align-items: baseline;
      font-size: 2rem;

      input[type="text"] {
        padding: 0;
        margin: 0;
        height: 1.7em;
        font-size: 1em;
        border: none;
        border-bottom: 5px solid #000;
        resize: horizontal;
      }

      h1 {
        font-size: 1em;
        margin: 0;
        padding: 0;
      }

      .buttons {
        margin-right: 0.5em;
        font-size: 1.1rem;
      }
    }
  }
}
</style>
