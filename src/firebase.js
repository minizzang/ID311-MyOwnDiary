import Vue from 'vue'

import * as firebase from 'firebase/app'
import firebaseConfig from '../firebaseConfig'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getDatabase(app)
const storage = getStorage(app)

// Decleare firebase to use globally
Vue.prototype.$app = app
Vue.prototype.$auth = auth
Vue.prototype.$db = db
Vue.prototype.$storage = storage
