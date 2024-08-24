"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { collection, doc, getDoc } from "firebase/firestore"; // Import Firestore functions
//import firebase from 'firebase/app';
import heartRateLogo from '../public/heartRateLogo.png';
import oxygenLogo from '../public/oxygenLogo.png';
//import 'firebase/firestore';
import { onValue, ref } from "firebase/database";
import LineChart from './lineChart';
import { realtimeDb } from "./config";
import SignIn from './signIn';
import { db } from "./config";



export default function Data() {
    const [heartRate, setHeartRate] = useState(null);
    const [oxygen, setOxygen] = useState(null);
    const [heartRateData, setHeartRateData] = useState([2, 3, 4, 5, 2, 4, 5, 6]);
    const [oxygenLevelData, setOxygenLevelData] = useState([2, 5, 8, 4, 7, 3, 3, 8]);
    const [listening, setListening] = useState(false);
    const [prediction, setPrediction] = useState(120);


    const getPrediction = async () => {
      try {
        const userDoc = doc(db, 'patients', 'prediction');
        const docSnap = await getDoc(userDoc);
    
        if (docSnap.exists()) {
          const predictionData = docSnap.data();
          const predictionValue = predictionData.prediction;
          console.log('Prediction Value:', predictionValue);

          const { predictions } = predictionValue;
          if (Array.isArray(predictions) && predictions.length > 0) {
            const [value] = predictions;
            setPrediction(value)
            console.log(value);
          } else {
            console.error('Invalid or empty predictions array');
          }

          return predictionValue;
        } else {
          console.log('No prediction data found');
          return null;
        }
      } catch (error) {
        console.error('Error getting prediction:', error.message);
        return null;
      }
    };

    let recognition;
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continous = true;
        recognition.lang = 'en-US';
    }


    const startListening = () => {
        if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
    
            recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log('You said:', transcript);
    
            // Check if the user asked for vital signs
            if (transcript.includes('vital signs')) {
              // Replace this with the logic to retrieve and read the user's vital signs
              const vitalSigns = `Your vital signs are normal. Heart rate: ${heartRate} bpm, Oxygen:  ${oxygen} SPO2.`;
    
              // Call the function to read out the vital signs
              readOutLoud(vitalSigns);
            }
          };
    
          recognition.start();
    
          // Set the listening state to true when starting
          setListening(true);
        }
      };
    
    const stopListening = () => {
        // Stop the recognition
        recognition.stop();

        // Set the listening state to false when stopping
        setListening(false);
    };
    

    // Function to read out loud
    function readOutLoud(message) {
        const speech = new SpeechSynthesisUtterance(message);
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;
        window.speechSynthesis.speak(speech);
    }



    // Listen for real-time updates to sensor data
    const listenForUpdates = () => {
      const sensorDataRef = ref(realtimeDb); // Replace with your path in the database
      const unsubscribe = onValue(sensorDataRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setHeartRate(data.Heart_Rate);
          setOxygen(data.SPO2);
          setOxygenLevelData((prevData) => [...prevData.slice(1), data.SPO2]);
          setHeartRateData((prevData) => [...prevData.slice(1), data.Heart_Rate]);
          if (data.Heart_Rate > prediction) {
            const warningMessage = "Warning! Your vital signs are outside normal ranges. Calling emergency contact.";
            readOutLoud(warningMessage);          
          }
        }
      });
  
      // Unsubscribe when the component unmounts
      return () => unsubscribe();
    };

    useEffect(() => {
        // Listen for real-time updates
        const unsubscribe = listenForUpdates();
        getPrediction();


        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    return (
      <div className="flex flex-col items-center">
        {/* Oxygen Level Display */}
        <div className="flex items-center mb-4">
          <LineChart data={oxygenLevelData} maxHR={prediction} color="blue" />
          <div className="flex flex-col items-center">
            <Image
              src={oxygenLogo}
              className="w-12 h-12 rounded-full mt-4"
              width={80}
              height={80}
              alt="Oxygen Level"
            />
            <div className="p-4 bg-white rounded-lg mt-2">
              <p className="text-black">{oxygen}</p>
            </div>
          </div>
        </div>
    
        {/* Heart Rate Display */}
        <div className="flex items-center mb-4">
          <LineChart data={heartRateData} maxHR={prediction} color="red" />
          <div className="flex flex-col items-center">
            <Image
              src={heartRateLogo}
              className="w-12 h-12 mt-4"
              width={80}
              height={80}
              alt="Heart Rate"
            />
            <div className="p-4 bg-white rounded-lg mt-2">
              <p className="text-black">{heartRate}</p>
            </div>
          </div>
        </div>
    
        {/* Listening Button */}
        <button
          onClick={listening ? stopListening : startListening}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          {listening ? 'Stop Listening' : 'Start Listening'}
        </button>
      </div>
    );
    
}