import Vue from 'vue'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../firebaseConfig'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Decleare firebase to use globally
Vue.prototype.$firebase = firebase
