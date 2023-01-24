import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SignInScreen from "../screens/Login/SignInScreen";
import SignUpScreen from "../screens/Login/SignUpScreen";
import OnboardingScreen from "../screens/Login/OnboardingScreen";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { setLoggedIn } from "../store/slice/userSlice";
import DetailScreen from "../screens/Main/DetailScreen";
import TransactionScreen from "../screens/Main/TransactionScreen";
import HomeScreen from "../screens/Main/HomeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { colors } from "../constants/colors";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

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
    // getValueFor("id");
  }, [loggedIn]);

  function DrawerNavigator() {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: colors.green,
        }}
      >
        <Drawer.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            drawerLabel: ({ focused, color }) => {
              return (
                <View>
                  <Text
                    style={{
                      fontFamily: "poppins-semibold",
                      color: focused ? color : colors.gray,
                    }}
                  >
                    Home Screen
                  </Text>
                </View>
              );
            },
          }}
        />
      </Drawer.Navigator>
    );
  }

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
          <>
            <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
            <Stack.Screen
              name="TransactionScreen"
              component={TransactionScreen}
            />
            <Stack.Screen name="DetailScreen" component={DetailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
