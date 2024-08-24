"use client";
import React, { useEffect, useState } from "react";
import { auth, provider, db } from "./config";
import { signInWithPopup, onAuthStateChanged, getAuth } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import MainView from "./mainView";


function SignIn() {
    const [user, setUser] = useState(null);
    const [prediction, setPrediction] = useState(null);

    const handleGoogleSignIn = async () => {
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user)

      // Store user data in Firestore
      const userDoc = doc(db, 'patients', user.uid);
      await setDoc(userDoc, {
        displayName: user.displayName,
        email: user.email,
        // Add other user data as needed
      });


      console.log('Google Sign-In Successful:', user);
    } catch (error) {
      console.error('Google Sign-In Error:', error.message);
    }
  };
  


  return (
    <div>
      
    </div>
  );
}

export default SignIn;
