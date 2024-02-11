import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ToastAndroid } from 'react-native';
import { Platform } from 'react-native';
import Fetch, { validateForm } from './Fetch'; // Import Fetch component and validateForm function

import { Text, TextInput, Button, View, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    const isValid = await validateForm(email, password, setErrors);
    if (!isValid) {
      // Authentication failed, no need to clear inputs, just set the errors
      console.log("Authentication failed");
      return;
    }

    // Authentication succeeded, clear inputs and errors
    console.log("Submitted", email, password);
    setEmail("");
    setPassword("");
    setErrors({});
  };

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.OS == "ios" ? 50 : 0} style={styles.container}>
      <View style={styles.form}>
        <Image source={require("./assets/adaptive-icon.png")} style={styles.image} />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          secureTextEntry={false}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        {errors.authError && <Text style={styles.errorText}>{errors.authError}</Text>}
        
        <Button title="Login" onPress={handleSubmit}/>
        <Text style={styles.subText}> or</Text>
        <Button title="Sign Up" onPress={() => {}}/>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  form: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 75,
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 5
    },
    shadowOpacity: .5,
    shadowRadius: 10,
    elevation: 50
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    alignSelf: "center"
  },
  input: {
    color: '#000000',
    height: 40, 
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    padding: 5,
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 50,
  }, 
  errorText: {
    color: "red",
    marginBottom: 5,
  },
  subText: {
    color: "#d3d3d3",
    marginBottom: 0,
    alignSelf: "center"
  }
});