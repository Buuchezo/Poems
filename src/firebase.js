// src/firebase.js or src/firebase.ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAQnQTRxNBtsZQXjuBD_mWxdBCE-yL5e7w',
  authDomain: 'poems-1eaf3.firebaseapp.com',
  databaseURL: 'https://poems-1eaf3-default-rtdb.firebaseio.com',
  projectId: 'poems-1eaf3',
  storageBucket: 'poems-1eaf3.firebasestorage.app',
  messagingSenderId: '1080620705273',
  appId: '1:1080620705273:web:b11c275b12e92935008928',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
