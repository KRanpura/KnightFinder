
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackNavigator, MainTabNavigator } from './navigation';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

const Stack = createStackNavigator();

const Root = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={AuthStackNavigator} />
      <Stack.Screen name="MainTab" component={MainTabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

// Register the Root component as the entry point of your application
AppRegistry.registerComponent(appName, () => Root);

export default Root;