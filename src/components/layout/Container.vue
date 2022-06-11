<template>
  <div class="top-container">
    <button v-if="this.userSigned" class="btn-logout" @click="signOut()">logout</button>
    <div class="sub-container1">
      <div class="sub-container2">
        <div class="column-box">
          <ProfileVue class="box left" v-if="this.userSigned" v-on:pass="dateSelect"/>
          <div class="box left" v-else>null user : Login!</div>
          <router-view class="box middle" v-bind:props="date"/>
          <div class="right">
            <button class="tab active"
              @click="path = '/diary'; routeTab; setClicked($event)" active
            >Diary</button>
            <button class="tab"
              @click="path = '/todo'; routeTab; setClicked($event)"
            >Todo</button>
            <button class="tab"
              @click="path = '/memo'; routeTab; setClicked($event)"
            >Memo</button>
          </div>
          <div class="ring ring1"/>
          <div class="ring ring2"/>
          <div class="ring ring3"/>
          <div class="ring ring4"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { signOut } from '@firebase/auth'
import router from '../../router'
import ProfileVue from '../../views/Profile.vue'

export default {
  name: 'container',
  components: { ProfileVue },
  data () {
    return {
      userSigned: false,
      path: '/diary',
      date: new Date().toISOString().substring(0, 10)
    }
  },
  mounted () {
    const uid = localStorage.getItem('user')
    uid !== null ? this.userSigned = true : this.userSigned = false

    // convert to Korea time zone
    const dt = new Date()
    this.date = new Date(dt.getTime() - (dt.getTimezoneOffset() * 60000)).toISOString().substring(0, 10)
  },
  watch: {
    $route (to, from) {
      if (from.name === 'Login') { // Login -> show user profile
        this.userSigned = true
      } else if (to.name === 'Login') { // Logout
        this.userSigned = false
      }
    }
  },
  computed: {
    routeTab () {
      if (this.userSigned) {
        if (router.currentRoute.path !== this.path) {
          return router.replace(this.path)
        }
      }
    }
  },
  methods: {
    setClicked (e) {
      const tabs = Array.from(document.getElementsByClassName('tab'))
      tabs.forEach((t) => {
        if (t.classList.contains('active')) {
          t.classList.remove('active')
        }
      })
      e.target.classList.add('active')
    },
    dateSelect (val) { // receive date from Profile.vue
      this.date = val
    },
    signOut () {
      signOut(this.$auth).then(() => {
        console.log('sign out success')
        router.replace('./login')
        localStorage.removeItem('user')
      }).catch((err) => {
        console.log(err, 'sign out error!')
      })
    }
  }
}
</script>

<style scoped>
.top-container {
  width: 100vw;
  height: 100vh;
  background-color: #b49ac1;
}
.sub-container1 {
  width: 75vw;
  height: 90vh;
  background-color: #ebebeb;
  position: absolute;
  top: 5vh;
  left: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #565656;
  border-radius: 10px;
}
.sub-container2 {
  width: 98%;
  height: 96%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  background-color: #9b75a4;
  border-radius: 10px;
}
.btn-logout {
  position: absolute;
  right: 20px;
  top: 10px;
}
.column-box {
  display: flex;
  flex-direction: row;
  position: absolute;
  width: 78vw;
  height: 85%;
  margin: 15px;
}
.box {
  background-color: #ffffff;
  border-radius: 10px;
}
.left {
  width: 25%;
  margin-right: 10px;
}
.middle {
  width: 66%;
}
.right {
  display: flex;
  flex-direction: column;
  width: 9%;
  margin-top: 10px;
}
.ring {
  width: 50px;
  height: 10px;
  background-color: #ffd2d4;
  position: absolute;
  left: calc(25% - 25px);
  border-radius: 5px;
}
.ring1 {
  margin-top: 6%;
}
.ring2 {
  margin-top: 10%;
}
.ring3 {
  margin-top: 36%;
}
.ring4 {
  margin-top: 40%;
}
.tab {
  background-color: #e1b8be;
  color: black;
  width: 90px;
  height: 50px;
  margin-bottom: 8px;
  border: none;
  border-radius: 0 10px 10px 0;
}
.tab:hover {
  background-color: #ffffff;
}
.tab-clicked {
  background-color: #c92323;
}
.active {
  background-color: #ffffff;
}
</style>
