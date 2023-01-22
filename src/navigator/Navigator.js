import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SignInScreen from "../screens/Login/SignInScreen";
import SignUpScreen from "../screens/Login/SignUpScreen";
import OnboardingScreen from "../screens/Login/OnboardingScreen";
import HomeScreen from "../screens/Main/HomeScreen";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import {
  setFormSubmitted,
  setKycStatus,
  setLoggedIn,
} from "../store/slice/userSlice";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const dispatch = useDispatch();

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    console.log("🚀 ~ file: Navigator.js:21 ~ getValueFor ~ result", result);
    if (result === "true") {
      dispatch(setLoggedIn(true));
    }
  }

  const loggedIn = useSelector((state) => state.user.loggedIn);

  useEffect(() => {
    getValueFor("isLoggedIn");
  }, [loggedIn]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!loggedIn ? (
          <>
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
            />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          </>
        ) : (
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
