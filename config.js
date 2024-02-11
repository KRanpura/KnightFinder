import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBhmW1rKhvyhBvgtllj6sCQPS9WAgJCTXs",
    authDomain: "knightfinder-eadd9.firebaseapp.com",
    projectId: "knightfinder-eadd9",
    storageBucket: "knightfinder-eadd9.appspot.com",
    messagingSenderId: "152522916903",
    appId: "1:152522916903:web:4e4dac5035edad6a5e3a02",
    measurementId: "G-CW2TJ2HZXV"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export {firebase}; 
