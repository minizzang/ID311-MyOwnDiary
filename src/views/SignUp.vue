<template>
  <div class="container">
    <div class="title">Sign up</div>
    <div class="content">
      <div class="line-box">
        <div class="attribute">Email</div>
        <div class="input">
          <b-form-input
            id="input-email"
            v-model="email"
            @input="()=>{isEmailValid = false}"
            :state="validEmail"
            aria-describedby="input-email-feedback"
            placeholder="example@abc.com"
            trim
          ></b-form-input>
          <b-form-invalid-feedback id="input-email-feedback">
            Email format is not valid
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="line-box">
        <div class="attribute">Password</div>
        <div class="input">
          <b-form-input
            id="input-pw"
            v-model="password"
            :state="validPassword"
            @input="()=>{isPwValid = false}"
            type="password"
            aria-describedby="input-pw-feedback"
            placeholder="longer than 5 characters"
            trim
          ></b-form-input>
          <b-form-invalid-feedback id="input-pw-feedback">
            Password should be longer than 5 characters
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="line-box">
        <div class="attribute">User name</div>
        <div class="input">
          <b-form-input
            id="input-nickname"
            v-model="nickname"
            :state="validName"
            @click="()=>{isNameValid = false}"
            aria-describedby="input-name-feedback"
            placeholder="user name"
            trim
          ></b-form-input>
          <b-form-invalid-feedback id="input-name-feedback">
            Please enter user name
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="line-box">
        <div class="attribute">Introduction</div>
        <div class="input">
          <b-form-input
            id="input-intro"
            v-model="intro"
            :state="null"
            placeholder=""
            trim
          ></b-form-input>
        </div>
      </div>

      <button class="btn" @click="registerAccount()">Sign Up</button>
    </div>
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
      intro: '',
      isEmailValid: null,
      isPwValid: null,
      isNameValid: null
    }
  },
  computed: {
    validEmail () {
      if (this.isEmailValid === null) {
        return null
      }
      var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const result = regex.test(this.email)
      this.setValidEmail(result)
      return result
    },
    validPassword () {
      if (this.isPwValid === null) {
        return null
      }
      const result = this.password.length > 5
      this.setValidPW(result)
      return result
    },
    validName () {
      if (this.isNameValid === null) {
        return null
      }
      const result = this.nickname.length >= 1
      this.setValidName(result)
      return result
    }
  },
  methods: {
    setValidEmail (val) {
      this.isEmailValid = val
    },
    setValidPW (val) {
      this.isPwValid = val
    },
    setValidName (val) {
      this.isNameValid = val
    },
    registerAccount () {
      if (this.isEmailValid && this.isPwValid && this.isNameValid) {
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
      } else {
        if (!this.isEmailValid) alert('Check email type')
        else if (!this.isPwValid) alert('Check password length')
        else if (!this.isNameValid) alert('Enter the user name')
      }
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
  margin-bottom: 10px;
}
.content {
  display: flex;
  flex-direction: column;
  height: 65%;
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
  height: 60px;
  line-height: 30px;
  font-size: 25px;
  font-weight: 600;
  padding: 10px 16px;
  text-align: center;
  border-radius: 8px;
  margin: 10px;
  color: #FFFFFF;
}
.btn:hover,
.btn:focus {
  background-color: #F082AC;
  box-shadow: none;
  border: none;
  outline: none;
}
</style>
