<template>
  <div id="countdown">
    <h1 v-show="taskName">{{ taskName }}</h1>

    <p id="timer">{{ timeLeft }}</p>

    <div class="addTimeButtons">
      <button class="minuteSelection" @click="$emit('addTime', 1)">+1</button>
      <button v-show="!isBreak" class="minuteSelection" @click="$emit('addTime', 5)">+5</button>
      <button v-show="!isBreak" class="minuteSelection" @click="$emit('addTime', 15)">+15</button>
    </div>

    <div v-show="!running">
      <div v-show="!isBreak" class="breakSelect">
        <h2>take a &nbsp;</h2>
          <button class="minuteSelection" @click="$emit('takeBreak', 2)">2</button>
          <button class="minuteSelection" @click="$emit('takeBreak', 5)">5</button>
          <button class="minuteSelection" @click="$emit('takeBreak', 15)">15</button>
        <h2>&nbsp;minute break</h2>
      </div>
      <button class="newTask" @click="$emit('newTask')" v-show="isBreak">new task</button>
    </div>

    <pomodoroCounter/>
  </div>
</template>

<script>
import pomodoroCounter from "./pomodoroCounter.vue";
import plants from "./plants";

export default {
  name: "Countdown",
  components: {
    pomodoroCounter
  },
  props: {
    "seconds-left": {
      type: Number,
      default: 0
    },
    "time-left": {
      type: String,
      default: "0:00"
    },
    "plant-type": {
      type: String,
      default: ""
    },
    "task-name": {
      type: String,
      default: ""
    },
    "is-break": {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      plants
    };
  },
  computed: {
    running() {
      return this.secondsLeft > 0;
    },
    frame() {
      const plant = this.plants[this.plantType];
      if (this.ended) return plant.totalFrames - 1;
      if (this.running) {
        const amountDone = this.secondsLeft / (plant.time / 1000);
        return plant.totalFrames - Math.round(plant.totalFrames * amountDone);
      }
      return 0;
    },
    plantStyle() {
      return {
        "background-image": `url(${this.plants[this.plantType].path})`,
        "background-position": `${this.frame * -256}px bottom`
      };
    }
  }
};
</script>

<style lang="scss">
#countdown {
  @include flex-center;
  flex-flow: column nowrap;
}

#plant {
  background-size: auto 256px;
  display: inline-block;
  height: 256px;
  width: 256px;
  image-rendering: pixelated;
}

#timer {
  font-size: 7em;
  padding: 0;
  margin: 0.2em 0;
}

.addTimeButtons {
  font-size: 1.1rem;
}

.newTask {
  font-size: 1.2em;
  padding: 0.4em 1em;
  cursor: pointer;
}

.breakSelect {
  @include flex-center;
  font-size: 0.9em;
}
</style>
