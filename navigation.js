import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import MeScreen from './MeScreen';
import SearchScreen from './SearchScreen';
import ChatScreen from './ChatScreen';
import firebaseApp from './config'; // Import the Firebase configuration


const AuthStack = createStackNavigator();

export function AuthStackNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Me" component={MeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}