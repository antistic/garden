<template>
  <div id="grow">
    <taskSelect
      @goAction="startTimer"
      v-show="activeComponent === 'taskSelect'" />

    <countdown
      :secondsLeft="secondsLeft"
      :plantType="plantType"
      :taskName="taskName"
      @stopAction="stopTimer"
      @newAction="newTimer"
      v-show="activeComponent === 'countdown'"/>
  </div>
</template>

<script>
import growComponents from './growComponents'
import plants from './growComponents/plants'

export default {
  name: 'grow',
  components: growComponents,
  data() {
    return {
      activeComponent: 'taskSelect',
      taskName: '',
      plantType: 'tomato',
      plants,
      // unix start & end time
      startTime: this.$local.get('GROW_STARTTIME') || 0,
      endTime: this.$local.get('GROW_ENDTIME') || 0,
      now: 0,
      running: false,
    }
  },
  mounted() {
    this.updateNow()
    window.setInterval(() => {
      this.tick()
    }, 500)
  },
  computed: {
    secondsLeft() {
      return Math.floor((this.endTime - this.now) / 1000)
    },
  },
  methods: {
    updateNow() {
      this.now = (new Date()).getTime()
    },
    // setters
    switchTo(component) {
      this.activeComponent = component
    },
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
    tick() {
      this.updateNow()
      if (this.running && this.secondsLeft <= 0) this.timeUp()
    },
    startTimer(taskName) {
      this.updateNow()

      this.taskName = taskName

      const delay = this.plants[this.plantType].time
      this.setStartTime(this.now)
      this.setEndTime(this.now + delay + 500)
      this.setRunning(true)

      this.switchTo('countdown')
    },
    stopTimer() {
      this.setEndTime(this.now)
      this.setRunning(false)
      this.newTimer()
    },
    newTimer() {
      this.switchTo('taskSelect')
    },
    timeUp() {
      if (!this.$store.state.muted)
        this.$store.state.alertSound.play()
      this.setRunning(false)
      this.$store.commit('addPomodoro')
    },
  },
}
</script>
