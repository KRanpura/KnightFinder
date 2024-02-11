import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Import getAuth
import { getFirestore } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { signInWithEmailAndPassword } from 'firebase/auth';

// Initialize Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhmW1rKhvyhBvgtllj6sCQPS9WAgJCTXs",
  authDomain: "knightfinder-eadd9.firebaseapp.com",
  projectId: "knightfinder-eadd9",
  storageBucket: "knightfinder-eadd9.appspot.com",
  messagingSenderId: "152522916903",
  appId: "1:152522916903:web:4e4dac5035edad6a5e3a02",
  measurementId: "G-CW2TJ2HZXV"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(firebaseApp); // Use getAuth to get the Auth object
export const firestore = getFirestore(firebaseApp);

// Function to sign up a user
export const signUpUser = async (email, password, name, age) => {
  try {
    // Sign up the user
    const userCredential = await auth.createUserWithEmailAndPassword(email, password); // Use auth.createUserWithEmailAndPassword
    
    // Add additional user details to Firestore
    await firestore.collection('users').doc(userCredential.user.uid).set({
      name,
      age,
      email,
    });

    return true; // Sign up successful
  } catch (error) {
    console.error("Error signing up:", error.message);
    return false; // Sign up failed
  }
};

// Function to validate form inputs
export const validateForm = async (email, password, setErrors) => {
  let errors = {};

  if (!email) {
    errors.email = "Email is required";
  }
  if (!password) {
    errors.password = "Password is required";
  }

  setErrors(errors);

  if (Object.keys(errors).length !== 0) {
    return false;
  }

  try {
    await auth.signInWithEmailAndPassword(email, password); // Use auth.signInWithEmailAndPassword
    return true;
  } catch (error) {
    console.error("Authentication Error:", error.message);
    setErrors({ authError: "Incorrect email or password" }); // Set error message for authentication failure
    return false;
  }
};