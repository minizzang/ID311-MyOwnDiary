import Vue from 'vue'

import * as firebase from 'firebase/app'
import firebaseConfig from '../firebaseConfig'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getDatabase(app)

// Decleare firebase to use globally
Vue.prototype.$app = app
Vue.prototype.$auth = auth
Vue.prototype.$db = db
