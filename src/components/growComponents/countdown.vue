<template>
  <div id="countdown">
    <h1 v-show="taskName">{{ taskName }}</h1>
    <div
      id="plant"
      :style="plantStyle" />

    <div id="timer">
      <p v-show="running">{{ minutes }}:{{ seconds }}</p>
      <p v-show="!running">0:00</p>
    </div>

    <button
      v-show="running"
      @click="$emit('stopAction')">cancel</button>
    <button
      v-show="!running"
      @click="$emit('newAction')">new</button>

    <pomodoroCounter />
  </div>
</template>

<script>
import pomodoroCounter from './pomodoroCounter.vue'
import plants from './plants'

export default {
  name: 'Countdown',
  components: {
    pomodoroCounter,
  },
  props: {
    'seconds-left': {
      type: Number,
      default: 0,
    },
    'plant-type': {
      type: String,
      default: '',
    },
    'task-name': {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      plants,
    }
  },
  computed: {
    minutes() {
      return Math.floor(this.secondsLeft / 60)
    },
    seconds() {
      const secs = Math.floor(this.secondsLeft % 60)
      return (secs < 10 ? '0' : '') + secs
    },
    running() {
      return this.secondsLeft > 0
    },
    frame() {
      const plant = this.plants[this.plantType]
      if (this.ended) return plant.totalFrames - 1
      if (this.running) {
        const amountDone = this.secondsLeft / (plant.time / 1000)
        return plant.totalFrames - Math.round(plant.totalFrames * amountDone)
      }
      return 0
    },
    plantStyle() {
      return {
        'background-image': `url(${this.plants[this.plantType].path})`,
        'background-position': `${this.frame * -256}px bottom`,
      }
    },
  },
}
</script>

<style lang="scss">
#countdown {
  @include flex-center;
  flex-flow: column nowrap;

  button {
    font-size: 1.2em;
    padding: 0.5em 1.2em;
    color: #666;
    background: #fafafa;
    border: 1px solid #dadada;
    border-radius: 3px;
  }
}

#plant {
  background-size: auto 256px;
  display: inline-block;
  height: 256px;
  width: 256px;
  image-rendering: pixelated;
}

#timer {
  font-size: 4.5em;
  p {
    padding: 0;
    margin: 0.2em 0;
    color: #222;
  }
}
</style>
