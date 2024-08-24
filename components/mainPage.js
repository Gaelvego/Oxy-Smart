import Image from 'next/image'
import Link from 'next/link';
import 'firebase/firestore';
import UserForm from '@/pages/userForm';
import SignIn from './signIn';
import { useState } from 'react';
import MainView from './mainView';

export default function MainPage() {
    const [user, setUser] = useState(null);
    const [isActive, setIsActive] = useState(null);


    return (
        <div>
        </div>
    );
}
