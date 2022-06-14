<template>
  <div class="container">
    <h3 class="top bold">🌼 Welcome! 🌼</h3>
    <ProfileEditor v-bind:props="[userName, userIntro]" v-if="this.isEditProfile" @uploadProfile="setEditProfile"></ProfileEditor>
    <div v-else>
      <img thumbnail fluid :src="userImg" alt="Profile Image" height="200px" width="300px" class="profile"/>
      <b-row align-h="center" class="top">
        <h5 class="bold username">
          {{this.userName}}
          <button
            @click="setEditProfile"
            class="editButton"
          ><i class="fa-solid fa-pen"></i></button>
        </h5>
      </b-row>
      <b-row align-h="center">
        <h6>{{this.userIntro}}</h6>
      </b-row>
    </div>
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
import ProfileEditor from './ProfileEditor.vue'

export default {
  components: {
    ProfileEditor
  },
  data () {
    return {
      maxDate: '2022-06-04', // todo: prevent future dates
      userName: '',
      userIntro: '',
      userImg: '',
      isEditProfile: false,
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
      const userImgRef = ref(this.$db, 'users/' + uid + '/img')
      onValue(userNameRef, (snapshot) => {
        this.userName = snapshot.val()
      })
      onValue(userIntroRef, (snapshot) => {
        this.userIntro = snapshot.val()
      })
      onValue(userImgRef, (snapshot) => {
        this.userImg = snapshot.val()
        if (this.userImg == null) {
          // this.userImg = '../assets/blankProfile.jpg'
          const defaultImgRef = ref(this.$db, 'users/defaultImg')
          onValue(defaultImgRef, (snapshot1) => {
            this.userImg = snapshot1.val()
            console.log(this.userImg)
          })
        }
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

        this.isEditProfile = false
      })
    },
    getColor (date) {
      switch (this.savedDayMoodMap.get(date)) {
        case 'What a happy day!':
          return 'rgb(237, 85, 100)'
        case 'So-so.':
          return 'rgb(255, 206, 84)'
        case 'Want to cry TT':
          return 'rgb(79,193,232)'
        case 'Really upset!':
          return 'rgb(172,146,235)'
        case 'Eww.. Tired..':
          return 'rgb(79,193,40)'
      }
    },
    setEditProfile () {
      this.isEditProfile = !this.isEditProfile
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
  width: 30%;
  position: absolute;
  bottom: 0;
}
.username {
  padding-left: 26px;
}
.editButton {
    margin-left: 5px;
    color: black;
    font-size: 15px;
}
</style>
