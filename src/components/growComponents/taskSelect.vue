<template>
  <div class="taskSelect">
    <div class="select">
      <h1>I want to&nbsp;</h1>
      <input
        type="text"
        placeholder="save the world"
        size="18"
        v-model="taskInput"
        @keyup.enter="submit">
      <h1>.</h1>
      <button @click="submit">→</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskSelect',
  data() {
    return {
      taskInput: ''
    }
  },
  methods: {
    submit() {
      this.$emit('goAction', this.taskInput)
    }
  }
}
</script>

<style lang="scss">
.taskSelect {
  text-align: center;

  .select {
    display: flex;
    flex-flow: row wrap;
    font-size: 2rem;
    align-items: baseline;
    justify-content: center;

    input[type=text] {
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
  }

  button {
    margin: 1em;
    font-size: 1.5rem;
  }
}
</style>
