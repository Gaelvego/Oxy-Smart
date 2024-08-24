"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { collection, doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import axios from 'axios';
import { db } from "/Users/gaelvego/Documents/iot/oxy-smart/components/config.js";
import { Formik, useFormik, Form, Field, ErrorMessage } from 'formik';
import '/app/globals.css'
import Link from 'next/link';

let prediction;

const handle = async () => {
    
  try {
    const userDoc = doc(db, 'patients', 'prediction');
    await setDoc(userDoc, {
      prediction: prediction,
      // Add other user data as needed
    });

  } catch (error) {
    console.error('Google Sign-In Error:', error.message);
  }
};

const makePredictionRequest = async (inputData) => {


  try {
    // Make the POST request to the Flask server
    const response = await axios.post('http://localhost:10000/predict', inputData, { withCredentials: true });

    // Handle the predictions, update the UI, etc.
    console.log('Predictions:', response.data);

    // Return the predictions or do further processing as needed
    //setPrediction(response.data)s
    prediction = response.data;
    handle();
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);

    // Handle errors or return an error message
    return { error: 'An error occurred while making the prediction request.' };
  }
};

const inputData = {
  Age: 34,
  Sex: "M",
  ChestPainType: "ASY",
  RestingBP: 120,
  Cholesterol: 200,
  FastingBS: 2,
  RestingECG: "ST",
  ExerciseAngina: "Y",
  Oldpeak: 2,
  ST_Slope: "Up",
  HeartDisease: 1,
};



const onSubmit = async (values, actions) => {
    /*try {
      // Make the POST request to the Flask server
      const response = await axios.post('/predict', inputData);

      // Handle the predictions, update the UI, etc.
      console.log('Predictions:', response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }*/
    makePredictionRequest(values);
    actions.resetForm();
};

export default function UserForm() {

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      Age: "",
      Sex: "",
      ChestPainType: "",
      RestingBP: "",
      Cholesterol: "",
      FastingBS: "",
      RestingECG: "",
      ExerciseAngina: "",
      Oldpeak: "",
      ST_Slope: "",
      HeartDisease: "",
    },
    onSubmit,
  });

  const [prediction, setPrediction] = useState(null);

  

  return (
<div className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 min-w-screen flex items-center justify-center">
    <div className="max-w-md mx-auto p-4 bg-blue-400 rounded-md shadow-md">
    <h1 className="text-3xl font-bold text-blue-800 mb-4">
        Welcome! Add your medical history to generate a prediction of your max heart rate.
      </h1>
    <form onSubmit={handleSubmit} autoComplete="off" className="max-w-md mx-auto p-4 bg-blue-100 rounded-md shadow-md text-black">
      <div className="mb-4">
        <label htmlFor="Age" className="block text-sm font-semibold text-blue-800">Age</label>
        <input
          value={values.Age}
          onChange={handleChange}
          id="Age"
          type="number"
          placeholder="Enter your age"
          onBlur={handleBlur}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.Age && touched.Age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="sex" className="block text-sm font-semibold text-blue-800">Sex</label>
        <select
          value={values.Sex}
          onChange={handleChange}
          id="Sex"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Select sex</option>
          <option value="F">F</option>
          <option value="M">M</option>
        </select>
        {errors.Sex && touched.Sex && <p className="text-red-500 text-xs mt-1">{errors.Sex}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="chestPainType" className="block text-sm font-semibold text-blue-800"> Chest Pain Type </label>
          <select
            value={values.ChestPainType}
            onChange={handleChange}
            id="ChestPainType"
            placeholder="Enter sex"
            onBlur={handleBlur}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select chest pain type</option>
            <option value="ATA">ATA</option>
            <option value="NAP">NAP</option>
            <option value="ASY">ASY</option>
            <option value="TA">TA</option>
        </select>
        {errors.ChestPainType && touched.ChestPainType && <p className="text-red-500 text-xs mt-1">{errors.ChestPainType}</p>}
        </div>
        <div className="mb-4">
        <label htmlFor="RestingBP" className="block text-sm font-semibold text-blue-800">Resting Blood Pressure</label>
        <input
            value={values.RestingBP}
            onChange={handleChange}
            id="RestingBP"
            type="text"
            placeholder="Enter your resting blood pressure"
            onBlur={handleBlur}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.RestingBP && touched.RestingBP && <p className="text-red-500 text-xs mt-1">{errors.RestingBP}</p>}
        </div>
        <div className="mb-4">
        <label htmlFor="Cholesterol" className="block text-sm font-semibold text-blue-800">Cholesterol</label>
        <input
            value={values.Cholesterol}
            onChange={handleChange}
            id="Cholesterol"
            type="text"
            placeholder="Enter your cholesterol"
            onBlur={handleBlur}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.Cholesterol && touched.Cholesterol && <p className="text-red-500 text-xs mt-1">{errors.Cholesterol}</p>}
        </div>
        <div className="mb-4">
        <label htmlFor="FastingBS" className="block text-sm font-semibold text-blue-800"> Fasting Blood Sugar </label>
          <select
            value={values.FastingBS}
            onChange={handleChange}
            id="FastingBS"
            placeholder="Enter fasting blood sugar"
            onBlur={handleBlur}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select fasting blood sugar</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
        </select>
        {errors.FastingBS && touched.FastingBS && <p className="text-red-500 text-xs mt-1">{errors.FastingBS}</p>}
        </div>
        <div className="mb-4">
        <label htmlFor="RestingECG" className="block text-sm font-semibold text-blue-800"> Resting electrocardiogram </label>
          <select
            value={values.RestingECG}
            onChange={handleChange}
            id="RestingECG"
            placeholder="Enter resting electrocardiogram"
            onBlur={handleBlur}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Resting ECG</option>
            <option value="Normal">Normal</option>
            <option value="ST">ST</option>
        </select>
        {errors.RestingBP && touched.RestingBP && <p className="text-red-500 text-xs mt-1">{errors.RestingBP}</p>}
        </div>
        <div className="mb-4">
        <label htmlFor="ExerciseAngina" className="block text-sm font-semibold text-blue-800"> Exercise Angina </label>
          <select
            value={values.ExerciseAngina}
            onChange={handleChange}
            id="ExerciseAngina"
            placeholder="Enter exercise angina"
            onBlur={handleBlur}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select exercise angina</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
        </select>
        {errors.ExerciseAngina && touched.ExerciseAngina && <p className="text-red-500 text-xs mt-1">{errors.ExerciseAngina}</p>}
        </div>
        <div className="mb-4">
        <label htmlFor="Oldpeak" className="block text-sm font-semibold text-blue-800">Oldpeak</label>
        <input
            value={values.Oldpeak}
            onChange={handleChange}
            id="Oldpeak"
            type="number"
            placeholder="Enter oldpeak"
            onBlur={handleBlur}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.Oldpeak && touched.Oldpeak && <p className="text-red-500 text-xs mt-1">{errors.Oldpeak}</p>}
        </div>
        <div className="mb-4">
        <label htmlFor="ST_Slope" className="block text-sm font-semibold text-blue-800"> ST slope </label>
          <select
            value={values.ST_Slope}
            onChange={handleChange}
            id="ST_Slope"
            placeholder="Enter ST slope"
            onBlur={handleBlur}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select ST slope</option>
            <option value="Up">Up</option>
            <option value="Flat">Flat</option>
        </select>
        {errors.ST_Slope && touched.ST_Slope && <p className="text-red-500 text-xs mt-1">{errors.ST_Slope}</p>}
        </div>
        <div className="mb-4">
        <label htmlFor="HeartDisease" className="block text-sm font-semibold text-blue-800"> Heart Disease </label>
          <select
            value={values.HeartDisease}
            onChange={handleChange}
            id="HeartDisease"
            placeholder="heartDisease"
            onBlur={handleBlur}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Heart Disease</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
        </select>
        {errors.HeartDisease && touched.HeartDisease && <p className="text-red-500 text-xs mt-1">{errors.HeartDisease}</p>}
        </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
            Submit
          </button>
          <Link href="/">
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mg-right:0">
              Finish Form
            </button>
          </Link>
    </form>
    </div>
    </div>
  );
};

