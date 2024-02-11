import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { firebase } from './config';

const Fetch = () => {
  const [users, setUsers] = useState([]);
  const userRef = firebase.firestore().collection('users');

  useEffect(() => {
    const unsubscribe = userRef.onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const { email, name, age } = doc.data();
        users.push({
          id: doc.id,
          name,
          age
        });
      });
      setUsers(users);
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <FlatList
        style={{ height: '100%' }}
        data={users}
        numColumns={1}
        renderItem={({ item }) => (
          <Pressable style={styles.container}>
            <View style={styles.innerContainer}>
              <Text style={styles.itemName}>{item.name} </Text>
              <Text style={styles.itemName}>{item.age} </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

const validateForm = async (email, password, setErrors) => {
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
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return true;
  } catch (error) {
    console.error("Authentication Error:", error.message);
    setErrors({ authError: "Incorrect email or password" }); // Set error message for authentication failure
    return false;
  }
};

export { Fetch as default, validateForm };

// const styles = Stylesheet.create({
//     container:{
//         backgroundColor: '#e5e5e5',
//         padding: 15,
//         borderRadius: 15,
//         margin: 5,
//         marginHorizontal: 10,

//     },
//     innerContainer: {
//         alignItems: 'center', 
//         flexDirection: 'column',
//     },
//     itemName: {
//         fontWeight: 'bold'
//     },
//     itemText: {
//         fontWeight: '300'
//     }
    
// })