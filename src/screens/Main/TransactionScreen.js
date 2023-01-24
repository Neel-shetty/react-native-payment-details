import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../store/slice/userSlice";
import Header from "../../components/TransactionScreenComponents/Header";
// import s from '../../components/TransactionScreenComponents/Header'
import TransactionItem from "../../components/TransactionScreenComponents/TransactionItem";
import TransactionList from "../../components/TransactionScreenComponents/TransactionList";
import { layout } from "../../constants/layout";

const TransactionScreen = () => {
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

export default TransactionScreen;

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
