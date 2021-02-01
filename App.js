import * as React from "react";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Appearance } from "react-native";

import SignInScreen from "./components/screens/SignInScreen";
import SignUpScreen from "./components/screens/SignUpScreen";
import WelcomeScreen from "./components/screens/WelcomeScreen";
import CreateAdScreen from "./components/screens/CreateAdScreen";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA9qRfZQS7fwWZC8ooU2Q8tq2_ztdUyJog",
  authDomain: "lab-1-mobile.firebaseapp.com",
  databaseURL: "https://lab-1-mobile.firebaseio.com",
  projectId: "lab-1-mobile",
  storageBucket: "lab-1-mobile.appspot.com",
  messagingSenderId: "270862084586",
  appId: "1:270862084586:web:e49a91ccc38531b08f2a93"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer
      theme={Appearance.getColorScheme() === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="CreateAd" component={CreateAdScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
