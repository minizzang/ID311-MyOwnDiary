<template>
  <div class="container">
    <h3 class="top bold">🌼 Welcome! 🌼</h3>
    <img thumbnail fluid src="../assets/sallyBrown.png" alt="Profile Image" height="200px" width="300px" class="profile"/>
    <b-row align-h="center" class="top">
      <h5 class="bold">Sally Brown (8)</h5>
    </b-row>
    <b-row align-h="center">
      <h6>"I'll be the world best dancer!"</h6>
    </b-row>
    <b-row class="justify-content-md-center">
      <div class="test">
        <v-date-picker
          v-model="picker"
          no-title
          color="rgb(255,10,100)"
        ></v-date-picker>
      </div>
    </b-row>
  </div>
</template>

<script>

export default {
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
.test {
  background-color: blueviolet;
}
</style>
