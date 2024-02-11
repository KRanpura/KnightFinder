import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import firebaseApp from './config';

export default function MeScreen() {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const user = firebaseApp.auth().currentUser;
      if (user) {
        const userDoc = await firebaseApp.firestore().collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          setUserData(userDoc.data());
        } else {
          console.log('User data not found');
        }
      } else {
        console.log('User not logged in');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <Image source={require('./assets/profile.jpeg')} style={styles.profilePic} />
          <Text style={styles.label}>Name: {userData.name}</Text>
          <Text style={styles.label}>Email: {userData.email}</Text>
          <Text style={styles.label}>Age: {userData.age}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});