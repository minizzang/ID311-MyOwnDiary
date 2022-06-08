<template>
  <div class="container">
    <div class="title">Login</div>
    <div class="content">
      <div class="line-box">
        <div class="attribute">Email</div>
        <div class="input">
          <b-form-input
            v-model="email"
            placeholder="example@abc.com"
            trim
          ></b-form-input>
        </div>
      </div>
      <div class="line-box">
        <div class="attribute">Password</div>
        <div class="input">
          <b-form-input
            v-model="password"
            type="password"
            placeholder="longer than 5 characters"
            trim
          ></b-form-input>
        </div>
      </div>
      <button class="btn" @click="login()">Login</button>
      <button class="btn btn-signup"
        @click="()=>this.$router.push('/signup')"
      >SignUp</button>
    </div>
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
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  height: 100px;
  line-height: 100px;
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 40px;
}
.content {
  display: flex;
  flex-direction: column;
  height: 50%;
  justify-content: center;
}
.line-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 25px;
}
.attribute {
  width: 20%;
  font-size: 1.5em;
  font-weight: bold;
  text-align: start;
}
.input {
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: flex-start;
}
.btn {
  align-self: center;
  background-color: #EA4C89;
  display: inline-block;
  width: 200px;
  height: 50px;
  line-height: 30px;
  font-size: 25px;
  font-weight: 600;
  padding: 10px 16px;
  text-align: center;
  border-radius: 8px;
  margin-top: 50px;
  margin-bottom: 10px;
  color: #FFFFFF;
}
.btn:hover,
.btn:focus {
  background-color: #F082AC;
  box-shadow: none;
  border: none;
  outline: none;
}
.btn-signup {
  background-color: #FFFFFF;
  color: #EA4C89;
  border: 2px solid #EA4C89;
  margin-top: 0px;
}
.btn-signup:hover,
.btn-signup:focus {
  background-color: #FFFFFF;
  border: 2px solid #EA4C89;
}

</style>
