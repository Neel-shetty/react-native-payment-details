import { StyleSheet, Text, View } from "react-native";
// import React from "react";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/EditDetailScreenComponents/Header";
import Fields from "../../components/EditDetailScreenComponents/Fields";
import Storage from "../../utils/expireStorage";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../store/slice/userSlice";

const EditDetailScreen = () => {
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
      {/* <Text>{text}</Text> */}
      <View style={styles.fieldContainer}>
        <Fields />
      </View>
    </View>
  );
};

export default EditDetailScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldContainer: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "pink",
  },
});
