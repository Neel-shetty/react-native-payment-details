import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../store/slice/userSlice";
import Header from "../../components/HomeScreenComponents/Header";
import TransactionItem from "../../components/HomeScreenComponents/TransactionItem";
import TransactionList from "../../components/HomeScreenComponents/TransactionList";
import { layout } from "../../constants/layout";

const HomeScreen = () => {
  const dispatch = useDispatch();
  function logOut() {
    SecureStore.setItemAsync("isLoggedIn", "false");
    dispatch(setLoggedIn(false));
  }
  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      {/* <Button title="Log Out" onPress={logOut} /> */}
      <View style={styles.listContainer}>
        <TransactionList />
      </View>
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
    width: layout.width,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  listContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 6,
  },
});
