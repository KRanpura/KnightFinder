import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebaseApp from './config';

export default function SearchScreen() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersCollection = await firebaseApp.firestore().collection('users').get();
        const userDataArray = usersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUserData(userDataArray);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User List</Text>
      {userData.map(user => (
        <View key={user.id} style={styles.userContainer}>
          <Text>Email: {user.email}</Text>
          <Text>Name: {user.name}</Text>
          <Text>Age: {user.age}</Text>
          {/* Add your form box here for each user */}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});