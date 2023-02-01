import { StyleSheet, Text, View } from "react-native";
// import React from "react";
import React, { useEffect } from "react";
import Header from "../../components/TransactionInfoScreenComponents/Header";
import TData from "../../components/TransactionInfoScreenComponents/TData";
import { layout } from "../../constants/layout";
import { StatusBar } from "expo-status-bar";
import Storage from "../../utils/expireStorage";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../store/slice/userSlice";

const TransactionInfoScreen = ({ route }) => {
  console.log(route?.params?.transaction_id);
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
      <View style={styles.dataContainer}>
        <TData />
      </View>
    </View>
  );
};

export default TransactionInfoScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  dataContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 7,
    // backgroundColor: "pink",
    width: layout.width,
  },
});
