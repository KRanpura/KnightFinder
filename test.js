// Import Firebase and initialize it
import firebaseApp from './config';

// Function to test Firebase connection by retrieving data from Firestore
const testFirebaseConnection = async () => {
  try {
    const snapshot = await firebaseApp.firestore().collection('users').get();
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
    console.log('Firebase connection successful!');
  } catch (error) {
    console.error('Error fetching data from Firestore:', error);
  }
};

// Call the function to test Firebase connection
testFirebaseConnection();