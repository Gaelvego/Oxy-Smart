"use client";
import { initializeApp } from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
//import 'firebase/firestore';
import {getFirestore} from 'firebase/firestore'
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: //,
    authDomain: "oxy-smart.firebaseapp.com",
    projectId: "oxy-smart",
    storageBucket: "oxy-smart.appspot.com",
    messagingSenderId: "137821413785",
    appId: "1:137821413785:web:997d323541e5173bcaf308"
}
  
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
const db = getFirestore()
const realtimeDb = getDatabase(app); 

export { auth, provider, db, realtimeDb };
