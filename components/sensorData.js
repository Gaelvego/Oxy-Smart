"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
//import firebase from 'firebase/app';
import heartRateLogo from '../public/heartRateLogo.png';
import oxygenLogo from '../public/oxygenLogo.png';
//import 'firebase/firestore';
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
  } from 'firebase/firestore'
import LineChart from './lineChart';
import { db } from "./config";

export default function SensorData() {
  const [oxygenLevel, setOxygenLevel] = useState(null);
  const [heartRate, setHeartRate] = useState(null);
  const [heartRateData, setHeartRateData] = useState([2, 3, 4, 5, 2, 4, 5, 6]);
  const [oxygenLevelData, setOxygenLevelData] = useState([2, 5, 8, 4, 7, 3, 3, 8]);

  
  

  /*useEffect(() => {
    

  
    setOxygenLevelData(prevData => [...prevData.slice(1), Math.floor(Math.random() * 100) + 1]);

  }, [oxygenLevelData]);*/




  // init firebase
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "patients", "patient1"), (doc) => {
        const data = doc.data();
        if (data) {
            const newOxygenLevel = data.oxygen;
            const newHeartRate = data.heartRate;
            console.log('Oxygen Level changed:', newOxygenLevel);
            console.log('Heart Rate changed:', newHeartRate);
            setOxygenLevel(newOxygenLevel);
            setHeartRate(newHeartRate);
             // Update data arrays
            setOxygenLevelData((prevData) => [...prevData.slice(1), newOxygenLevel]);
            setHeartRateData((prevData) => [...prevData.slice(1), newHeartRate]);
            console.log(oxygenLevelData);
        }
    });
    return () => unsub();

  }, [heartRate, oxygenLevel]);


  return (
    <div className="flex justify-center" >
        <LineChart
          data = {oxygenLevelData}
        />
        {/* Heart Rate and Oxygen Level Displays */}
        <div className="flex mb-8 items-center ">
          {/* Heart Rate Display */}
          <Image
            src={heartRateLogo}
            className="w-12 h-12  mr-4"
            width={80}
            height={80}
            alt="Patient Profile"
          />
          <div className="flex-1 mr-1 p-4 bg-white rounded-lg">
            <p className="text-black">{heartRate}</p>
          </div>

          {/* Oxygen Level Display */}
          <Image
            src={oxygenLogo}
            className="w-12 h-12 rounded-full mr-2 ml-2"
            width={80}
            height={80}
            alt="Patient Profile"
          />
          <div className="flex-1 p-4 bg-white rounded-lg">
            <p className="text-black">{oxygenLevel}</p>
          </div>
        </div>
    </div>
  );
}
