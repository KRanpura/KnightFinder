import React, { useState } from 'react';
import { Platform, View, Text, TextInput, Button, Image, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { validateForm } from './config';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    const isValid = await validateForm(email, password, setError);

    if (isValid) {
      console.log("Authentication successful");
      navigation.navigate('MainTab');
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0} style={styles.container}>
      <View style={styles.form}>
        <Image source={require("./assets/logo_for_KF.png")} style={styles.image} />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
        
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {error && <Text style={styles.errorText}>{error.authError}</Text>}
        
        <Button title="Login" onPress={handleSubmit}/>
        <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')}/>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 75,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 50,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  input: {
    color: '#000000',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    padding: 5,
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 50,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});