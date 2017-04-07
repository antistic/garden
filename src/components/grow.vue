<template>
  <div id="grow">
    <transition name="slide">
      <div v-show="running || showLastFrame" id="plant" :style="plantStyle"></div>
    </transition>

    <div id="timer">
      <p v-show="running">{{minutes}}:{{seconds}}</p>
      <p v-show="!running">0:00</p>
    </div>

    <button v-show="running" @click="stopTimer">stop</button>
    <button v-show="!running" @click="startTimer">start</button>

    <div id="pomodoros">
      <div class="pomodoro" v-for="p in pomodoros"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'grow',
  data() {
    return {
      // unix start & end time
      startTime: this.$local.get('GROW_STARTTIME') || 0,
      endTime: this.$local.get('GROW_ENDTIME') || 0,
      running: this.$local.get('GROW_RUNNING') || false,
      now: 0,
      showLastFrame: false,
      plantType: 'tomato',
      plants: {
        tomato: {
          path: require('../assets/imgs/plants/tomato.png'),
          time: 25 * 60 * 1000,
          totalFrames: 25,
        },
      },
    }
  },
  mounted() {
    this.update()
    if (this.secondsLeft <= 0) this.running = false
    window.setInterval(() => {
      if (this.running) {
        this.update()
        if (this.secondsLeft <= 0) this.timeUp()
      }
    }, 500)
  },
  computed: {
    secondsLeft() {
      return Math.floor((this.endTime - this.now) / 1000)
    },
    minutes() {
      return Math.floor(this.secondsLeft / 60)
    },
    seconds() {
      const secs = Math.floor(this.secondsLeft % 60)
      return (secs < 10 ? '0' : '') + secs
    },
    frame() {
      const plant = this.plants[this.plantType]
      if (this.showLastFrame) return plant.totalFrames - 1
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
    pomodoros() {
      return this.$store.state.pomodoros
    },
  },
  methods: {
    update() {
      this.now = (new Date()).getTime()
    },
    // setters
    setStartTime(time) {
      this.startTime = time
      this.$local.set('GROW_STARTTIME', time)
    },
    setEndTime(time) {
      this.endTime = time
      this.$local.set('GROW_ENDTIME', time)
    },
    setRunning(bool) {
      this.running = bool
      this.$local.set('GROW_RUNNING', bool)
    },
    // timer
    startTimer() {
      this.update()

      const delay = this.plants[this.plantType].time
      this.setStartTime(this.now)
      this.setEndTime(this.now + delay)
      this.showLastFrame = false
      this.setRunning(true)
    },
    stopTimer() {
      this.setEndTime(this.now)
      this.setRunning(false)
    },
    timeUp() {
      if (!this.$store.state.muted)
        this.$store.state.alertSound.play()
      this.showLastFrame = true
      this.setRunning(false)
      this.$store.commit('addPomodoro')
    },
  },
}
</script>

<style lang="scss">
#grow {
  text-align: center;

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

.slide-enter-active, .slide-leave-active {
  transition-duration: 0.5s;
  transition-property: opacity, height, transform;
}

.slide-enter, .slide-leave-to {
  opacity: 0;
  height: 1px !important;
  transform: translateY(-50vh);
}
</style>
