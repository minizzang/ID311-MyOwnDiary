<template>
  <div class="container">
    <h3 class="top bold">🌼 Welcome! 🌼</h3>
    <img thumbnail fluid src="../assets/sallyBrown.png" alt="Profile Image" height="200px" width="300px" class="profile"/>
    <b-row align-h="center" class="top">
      <h5 class="bold">{{this.userName}}</h5>
    </b-row>
    <b-row align-h="center">
      <h6>{{this.userIntro}}</h6>
    </b-row>
    <b-row class="justify-content-md-center">
      <div class="test">
        <v-date-picker
          v-model="pickerDate"
          no-title
          color="rgb(255,10,100)"
          @click:date="passDate"
          :events="savedDayArray"
          :event-color="getColor"
        ></v-date-picker>
      </div>
    </b-row>
  </div>
</template>

<script>
import { onValue, ref } from '@firebase/database'

export default {
  data () {
    return {
      value: null,
      userName: '',
      userIntro: '',
      pickerDate: new Date().toISOString().substr(0, 10),
      savedDayArray: null,
      savedDayMoodMap: null
    }
  },
  mounted () {
    this.getUserInfo()
    this.getSavedDay()
  },
  methods: {
    setToday () {
      const now = new Date()
      this.value = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    },
    clearDate () {
      this.value = ''
    },
    getUserInfo () {
      const uid = localStorage.getItem('user')
      const userNameRef = ref(this.$db, 'users/' + uid + '/nickname')
      const userIntroRef = ref(this.$db, 'users/' + uid + '/intro')
      onValue(userNameRef, (snapshot) => {
        this.userName = snapshot.val()
      })
      onValue(userIntroRef, (snapshot) => {
        this.userIntro = snapshot.val()
      })
    },
    passDate () { // pass the selected date to Container.vue
      this.$emit('pass', this.pickerDate)
    },
    getSavedDay () {
      console.log('mounted')
      const array = []
      array.push('2022-06-02')
      array.push('2022-06-16')
      this.savedDayArray = array

      const map = new Map()
      map.set(array[0], 1)
      map.set(array[1], 2)

      this.savedDayMoodMap = map

      // event-color="date => this.savedDayMoodMap.get(date) === 1 ? 'rgb(255, 0, 0)' : 'rgb(0, 255, 0)'"
    },
    getColor (date) {
      switch (this.savedDayMoodMap.get(date)) {
        case 1:
          return 'rgb(255, 0, 0)'
        case 2:
          return 'rgb(0, 255, 0)'
        case 3:
          return 'rgb(0, 0, 255)'
        case 4:
          return 'rgb(0, 0, 0)'
      }
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
