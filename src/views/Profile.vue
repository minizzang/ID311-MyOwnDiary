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
      pickerDate: new Date().toISOString().substr(0, 10)
    }
  },
  mounted () {
    this.getUserInfo()
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
