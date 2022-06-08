<template>
  <div>
    <div>Sign up</div>
    <input type="text" v-model="email"/>
    <input type="password" v-model="password"/>
    <div>
      <div>닉네임</div>
      <input type="text" v-model="nickname"/>
    </div>
    <div>
      <div>한 줄 소개</div>
      <input type="text" v-model="intro"/>
    </div>
    <br/>
    <button @click="registerAccount()">sign up</button>
    <button @click="check()">check</button>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from '@firebase/auth'
import { ref, set } from '@firebase/database'
import router from '../router'
export default {
  data () {
    return {
      email: '',
      password: '',
      nickname: '',
      intro: ''
    }
  },
  methods: {
    registerAccount () {
      const auth = this.$auth
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const uid = userCredential.user.uid
          set(ref(this.$db, 'users/' + uid), {
            nickname: this.nickname,
            intro: this.intro
          }).then(() => {
            router.replace('/diary')
          }).catch((err) => {
            console.log(err)
          })
          console.log('signup success')
        })
        .catch((err) => {
          const errorCode = err.code
          console.log('signup error: ', errorCode)
          switch (errorCode) {
            case 'auth/invalid-email':
              alert('Invalid type of Email!')
              break
            case 'auth/weak-password':
              alert('The password is too short. Use longer than 6 characters')
              break
            case 'auth/email-already-in-use':
              alert('Email is already in use')
              break
          }
        })
    },
    check () {
      console.log(this.$auth.currentUser)
    }
  }
}
</script>

<style scoped>
</style>
