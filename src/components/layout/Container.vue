<template>
  <div class="top-container">
    <button v-if="this.userSigned" class="btn-logout" @click="signOut()">logout</button>
    <div class="sub-container1">
      <div class="sub-container2">
        <img thumbnail src="../../assets/myworldLogo.png" alt="Logo Image" class="logo"/>
        <div class="column-box">
          <ProfileVue class="box left" v-if="this.userSigned" v-on:pass="dateSelect"/>
          <div class="box left" v-else></div>
          <router-view class="box middle" v-bind:props="date"/>
          <div class="right">
            <button id="diaryTab" class="tab active"
              @click="path = '/diary'; routeTab;" active
            >Diary</button>
            <button id="todoTab" class="tab"
              @click="path = '/todo'; routeTab;"
            >Todo</button>
            <button id="memoTab" class="tab"
              @click="path = '/memo'; routeTab;"
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
    this.path = '/diary'
    if (this.userSigned && (router.currentRoute.path !== this.path)) {
      router.replace(this.path)
    }

    // convert to Korea time zone
    const dt = new Date()
    this.date = new Date(dt.getTime() - (dt.getTimezoneOffset() * 60000)).toISOString().substring(0, 10)
  },
  watch: {
    $route (to, from) {
      if (from.name === 'Login' && to.name !== 'Signup') { // Login -> show user profile
        this.userSigned = true
      } else if (to.name === 'Login') { // Logout
        this.userSigned = false
      }
      this.activateTab(to.name)
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
    activateTab (target) {
      const diary = document.getElementById('diaryTab')
      const todo = document.getElementById('todoTab')
      const memo = document.getElementById('memoTab')

      const tabs = Array.from(document.getElementsByClassName('tab'))
      tabs.forEach((t) => {
        if (t.classList.contains('active')) {
          t.classList.remove('active')
        }
      })
      switch (target) {
        case 'Diary':
          diary.classList.add('active')
          break
        case 'Todo':
          todo.classList.add('active')
          break
        case 'Memo':
          memo.classList.add('active')
          break
      }
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
  right: 10px;
  top: 10px;
  padding: 3px 8px;
  border-bottom: 1px solid #565656;
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
.logo {
  width: 200px;
  margin-bottom: 79vh;
  margin-left: 17px;
}
</style>
