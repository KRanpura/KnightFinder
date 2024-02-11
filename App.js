import React, { useState } from 'react';
import { Platform } from 'react-native';
import { KeyboardAvoidingView, View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function MeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
    </View>
  );
}

function SignUpScreen() {
  const [scarletmail, setScarletmail] = useState("");
  const [name, setFirstName] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    // Validation and submission logic
  };

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0} style={styles.container}>
      <View style={styles.form}>
        <Image source={require("./assets/logo_for_KF.png")} style={styles.image} />
        <Text style={styles.label}>Scarletmail</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Scarletmail address"
          value={scarletmail}
          onChangeText={setScarletmail}
        />
        {/* Error handling for Scarletmail */}
        
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your First Name"
          value={name}
          onChangeText={setFirstName}
        />
        {/* Error handling for First Name */}

        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        {/* Error handling for Age */}
        
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {/* Error handling for Password */}
        
        <Button title="Sign Up" onPress={handleSubmit}/>
      </View>
    </KeyboardAvoidingView>
  );
}

function SearchScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Search</Text>
    </View>
  );
}

function ChatScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Chat</Text>
    </View>
  );
}

const AuthStack = createStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Me" component={MeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AuthStackScreen />
    </NavigationContainer>
  );
}

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (email === "example@example.com" && password === "password") {
      console.log("Authentication successful");
      navigation.navigate('MeScreen');
    } else {
      setError("Invalid email or password");
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
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
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
  subText: {
    color: '#d3d3d3',
    marginBottom: 0,
    alignSelf: "center"
  }
});