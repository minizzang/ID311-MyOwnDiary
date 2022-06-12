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
          :max-date="maxDate"
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
      maxDate: '2022-06-04', // todo: prevent future dates
      userName: '',
      userIntro: '',
      pickerDate: new Date().toISOString().substring(0, 10),
      savedDayArray: null,
      savedDayMoodMap: null
    }
  },
  mounted () {
    this.getUserInfo()
    this.getSavedDay()

    // convert to Korea time zone
    const dt = new Date()
    this.pickerDate = new Date(dt.getTime() - (dt.getTimezoneOffset() * 60000)).toISOString().substring(0, 10)
    this.maxDate = this.pickerDate
  },
  methods: {
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
      // load user's diary log (day of worte diary)
      const uid = localStorage.getItem('user')
      const userDiaryRef = ref(this.$db, 'diary/' + uid)
      let userDiaryData
      onValue(userDiaryRef, (snapshot) => {
        userDiaryData = snapshot.val()

        // array and map for checking diary wrote day
        const array = []
        const map = new Map()

        if (userDiaryData != null) {
          Object.keys(userDiaryData).forEach((key) => {
            const date = key.substring(0, 4) + '-' + key.substring(4, 6) + '-' + key.substring(6, 8)
            array.push(date)
            map.set(date, userDiaryData[key].mood)
          })
        }

        this.savedDayArray = array
        this.savedDayMoodMap = map
      })
    },
    getColor (date) {
      switch (this.savedDayMoodMap.get(date)) {
        case 'Very Good':
          return 'rgb(255, 0, 0)'
        case 'Nice':
          return 'rgb(0, 255, 0)'
        case 'Just OK':
          return 'rgb(0, 0, 255)'
        case 'Bad':
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
