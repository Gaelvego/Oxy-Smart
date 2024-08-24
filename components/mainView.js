import Image from 'next/image'
import Link from 'next/link';
import 'firebase/firestore';
import SensorData from '../components/sensorData';
import Data from '@/components/data';
import patientImage from '../public/patientOxySmart.jpg';
import graph from '../public/graph.jpeg';
import UserForm from '@/pages/userForm';
import Test from '@/pages/test';
import SignIn from './signIn';
import { useRouter } from 'next/router';


export default function MainView() {

  return (
    <div className="flex h-screen">
      
      <div className="flex-1 p-8 bg-gradient-to-b from-cyan-500 to-cyan-700 text-white">
        <div className="items-center text-center mb-8">
          <h1 className="text-4xl font-extrabold">Oxy-Smart</h1>
        </div>

        <div className="flex items-center mb-8">
          {/* Profile Picture */}
          <Image
            src={patientImage}
            className="w-16 h-16 rounded-full mr-4"
            width={130}
            height={130}
            alt="Patient Profile"
          />

          {/* Basic Patient Information */}
          <div>
            <h2 className="text-xl font-bold">Patient Name</h2>
            <p className="text-gray-300">Age: 30</p>
            <p className="text-gray-300">Gender: Male</p>
            {/* Add more patient information here */}
          </div>
        </div>
        {/* Heart Rate and Oxygen Level Displays */}
          <Data/>
        {/* Historical Data Section */}
        

        <div className='flex absolute inset-x-0 bottom-0 items-center justify-between p-7'>
          <div>
            <h3 className="text-lg font-semibold mb-2">Emergency Contact: Jose</h3>
            {/* Add Emergency Contact Information */}
          </div>
          <button className="bg-red-500 text-white p-2 rounded">
            Call Emergency Contact
          </button>
        </div>
      </div>
    </div>
  );
}
