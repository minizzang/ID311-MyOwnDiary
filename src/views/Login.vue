<template>
  <div>
    <div>login</div>
    <input
      type="text" v-model="email"/>
    <input
      type="password" v-model="password"/>
    <button @click="login()">login</button>
    <br/>
    <br/>
    <button class="tab"
      @click="()=>this.$router.replace('/signup')"
    >SignUp</button>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from '@firebase/auth'
import router from '../router'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      signInWithEmailAndPassword(this.$auth, this.email, this.password)
        .then((userCredential) => {
          console.log(userCredential.user.uid)
          router.replace('/diary')
        })
        .catch((err) => {
          const errorCode = err.code
          switch (errorCode) {
            case 'auth/invalid-email':
              alert('Invalid type of Email!')
              break
            case 'auth/user-not-found':
              alert('Cannot find user email')
              break
            case 'auth/wrong-password':
              alert('Wrong password')
              break
            default:
              console.log('signin error: ', errorCode)
              break
          }
        })
      console.log(this.email, this.password)
    }
  }
}
</script>

<style scoped>
</style>
