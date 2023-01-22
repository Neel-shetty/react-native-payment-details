import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../store/slice/userSlice";
import Header from "../../components/HomeScreenComponents/Header";
import TransactionItem from "../../components/HomeScreenComponents/TransactionItem";

const HomeScreen = () => {
  const dispatch = useDispatch();
  function logOut() {
    SecureStore.setItemAsync("isLoggedIn", "false");
    dispatch(setLoggedIn(false));
  }
  return (
    <View style={styles.root}>
        <Header />
        <Button title="Log Out" onPress={logOut} />
        <TransactionItem />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
