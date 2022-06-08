<template>
  <div class="container">
    <h3 class="top bold">🌼 Welcome! 🌼</h3>
    <img thumbnail fluid src="../assets/sallyBrown.png" alt="Profile Image" height="200px" width="300px" class="profile"/>
    <b-row class="justify-content-md-center">
        <Calendar class="cal"/>
    </b-row>
    <b-row align-h="center" class="top">
      <h5 class="bold">Sally Brown (8)</h5>
    </b-row>
    <b-row align-h="center">
      <h6>"I'll be the world best dancer!"</h6>
    </b-row>
  </div>
</template>

<script>
import Calendar from './ProfileCalendar.vue'

export default {
  components: { Calendar },
  data () {
    return {
      value: null
    }
  },
  methods: {
    setToday () {
      const now = new Date()
      this.value = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    },
    clearDate () {
      this.value = ''
    }
  }
}
</script>

<style scoped>
.cal {
  width: auto;
  position: absolute;
  bottom: 1em;
}
.profile {
  width: 200px;
  height: 200px;
  border-radius: 100%;
  overflow: hidden;
}
.bold {
  font-weight: bold;
}
.top {
  margin-top: 1em;
}
</style>
