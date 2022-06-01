<template>
  <div class="container">
    <h1 class="top bold">🌼 Sally's Daily Life 🌼</h1>
    <img thumbnail fluid src="../assets/sallyBrown.png" alt="Profile Image" height="200px" width="300px" class="profile"/>
    <b-row class="justify-content-md-center">
        <Calendar class="cal"/>
    </b-row>
    <b-row align-h="center" class="top">
      <h3 class="bold">Sally Brown(8), Dancer</h3>
    </b-row>
    <b-row align-h="center">
      <h4>"I'll be the world best dancer!"</h4>
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
</style>
