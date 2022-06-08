<template>
  <div class="top-container">
    <button class="btn-logout" @click="signOut()">logout</button>
    <div class="sub-container1">
      <div class="sub-container2">
        <div class="column-box">
          <ProfileVue class="box left"/>
          <router-view class="box middle"/>
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
  mounted () {
    // if (router.currentRoute.path !== '/diary') {
    //   return router.replace('/diary')
    // }
  },
  data () {
    return {
      path: '/diary'
    }
  },
  computed: {
    routeTab () {
      if (this.$auth.currentUser !== null) {
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
    signOut () {
      signOut(this.$auth).then(() => {
        console.log('sign out success')
        router.replace('./login')
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
