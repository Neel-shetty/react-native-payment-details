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
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { colors } from "../constants/colors";
import TransactionInfoScreen from "../screens/Main/TransactionInfoScreen";
// import PayCustomerScreen from "../screens/Main/PayCustomerScreen";``
import SearchTransactionScreen from "../screens/Main/SearchTransactionScreen";
import SearchResultScreen from "../screens/Main/SearchResultScreen";
import CreatedTransactionInfoScreen from "../screens/Main/CreatedTransactionInfoScreen";
import ReceiptScreen from "../screens/Main/ReceiptScreen";
import ProfileScreen from "../screens/Main/ProfileScreen";
import ReceiptInfoScreen from "../screens/Main/ReceiptInfoScreen";

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

  function logOut() {
    SecureStore.setItemAsync("isLoggedIn", "false");
    dispatch(setLoggedIn(false));
  }

  function DrawerNavigator() {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: colors.green,
        }}
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem
                label="Logout"
                onPress={() => {
                  console.log("logged out");
                  logOut();
                }}
                // inactiveBackgroundColor="#e6f4ea"
                labelStyle={{
                  fontFamily: "poppins-semibold",
                  color: colors.red,
                }}
              />
            </DrawerContentScrollView>
          );
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
        <Drawer.Screen
          name="ProfileScreen"
          component={ProfileScreen}
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
                    Update Profile
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
            <Stack.Screen
              name="TransactionInfoScreen"
              component={TransactionInfoScreen}
            />
            <Stack.Screen
              name="SearchTransactionScreen"
              component={SearchTransactionScreen}
            />
            <Stack.Screen
              name="SearchResultScreen"
              component={SearchResultScreen}
            />
            <Stack.Screen name="ReceiptScreen" component={ReceiptScreen} />
            <Stack.Screen
              name="ReceiptInfoScreen"
              component={ReceiptInfoScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
