<template>
  <div id="grow">
    <transition name="slide">
      <taskSelect
        class="child"
        @goAction="startTimer"
        v-show="activeComponent === 'taskSelect'" />
    </transition>

    <transition name="fade-slow">
      <countdown
        class="child"
        :seconds-left="secondsLeft"
        :plant-type="plantType"
        :task-name="taskName"
        :is-break="isBreak"
        @addTime="addTime"
        @takeBreak="takeBreak"
        @newTask="newTimer"
        v-show="activeComponent === 'countdown'"/>
    </transition>
  </div>
</template>

<script>
import growComponents from "./growComponents";
import plants from "./growComponents/plants";

export default {
  name: "Grow",
  components: growComponents,
  data() {
    return {
      activeComponent: "taskSelect",
      taskName: "",
      isBreak: false,
      plantType: "tomato",
      plants,
      // unix start & end time
      startTime: this.$local.get("GROW_STARTTIME") || 0,
      endTime: this.$local.get("GROW_ENDTIME") || 0,
      now: 0,
      running: false,
      ringID: null
    };
  },
  computed: {
    secondsLeft() {
      return Math.floor((this.endTime - this.now) / 1000);
    }
  },
  mounted() {
    this.updateNow();
    window.setInterval(() => {
      this.tick();
    }, 500);
  },
  methods: {
    updateNow() {
      this.now = new Date().getTime();
    },
    // setters
    switchTo(component) {
      this.activeComponent = component;
    },
    setStartTime(time) {
      this.startTime = time;
      this.$local.set("GROW_STARTTIME", time);
    },
    setEndTime(time) {
      this.endTime = time;
      this.$local.set("GROW_ENDTIME", time);
    },
    setRunning(bool) {
      this.running = bool;
      this.$local.set("GROW_RUNNING", bool);
    },
    // timer
    tick() {
      this.updateNow();
      if (this.running && this.secondsLeft <= 0) this.timeUp();
    },
    startTimer(taskName, minutes, isBreak = false) {
      this.updateNow();

      this.taskName = taskName;
      this.isBreak = isBreak;

      const delay = minutes * 60 * 1000;
      this.setStartTime(this.now);
      this.setEndTime(this.now + delay + 500);
      this.setRunning(true);

      this.switchTo("countdown");
    },
    stopTimer() {
      this.setEndTime(this.now);
      this.setRunning(false);
      window.clearInterval(this.ringID);
    },
    newTimer() {
      this.stopTimer();
      this.switchTo("taskSelect");
    },
    addTime(minutes) {
      window.clearInterval(this.ringID);
      this.setEndTime(Math.max(this.endTime, this.now) + minutes * 60 * 1000);
    },
    timeUp() {
      this.ringUntilNew();

      this.setRunning(false);
      this.$shared.addPomodoro;
    },
    ringUntilNew() {
      const { state } = this.$shared;
      const that = this;
      function ring() {
        if (!state.muted) {
          state.alertSound.play();
        }

        const interval = state.ringInterval * 1000;
        that.ringID = window.setTimeout(ring, interval);
      }

      ring();
    },
    takeBreak() {
      this.stopTimer();
      this.startTimer("take a break", 5, true);
    }
  }
};
</script>

<style lang="scss">
#grow {
  position: relative;
  height: 100%;
  width: 100%;

  .child {
    position: absolute;
    height: 100vh;
    width: 100vw;
  }
}
</style>
