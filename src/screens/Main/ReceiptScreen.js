import { StyleSheet, Text, View } from "react-native";
// import React from "react";
import React, { useEffect } from "react";
import Header from "../../components/ReceiptScreenComponents/Header";
import ReceiptItem from "../../components/ReceiptScreenComponents/ReceiptItem";
import ReceiptList from "../../components/ReceiptScreenComponents/ReceiptList";
import { StatusBar } from "expo-status-bar";
import Storage from "../../utils/expireStorage";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../store/slice/userSlice";

const ReceiptScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function checkLogin() {
      let result = await Storage.getItem("isLoggedIn");
      console.log("🚀 ~ file: checkLogin.js:21 ~ getValueFor ~ result", result);
      if (result !== "true") {
        dispatch(setLoggedIn(false));
      }
    }

    checkLogin();
  }, []);
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View style={styles.listContainer}>
        <ReceiptList />
      </View>
    </View>
  );
};

export default ReceiptScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#F6F7FD",
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
