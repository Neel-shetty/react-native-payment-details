import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import Header from "../../components/HomeScreenComponents/Header";
import Image from "../../components/HomeScreenComponents/ImageBg";
import { layout } from "../../constants/layout";
import Menu from "../../components/HomeScreenComponents/Menu";
import { colors } from "../../constants/colors";
import { StatusBar } from "expo-status-bar";
import Storage from "../../utils/expireStorage";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../store/slice/userSlice";
import Inactivity from "../../components/Inactivity";

const HomeScreen = () => {
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
    <SafeAreaView style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View
        style={{
          flex: 7,
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View style={styles.imageContainer}>
          <Image />
        </View>
        <View style={styles.menuContainer}>
          <Menu />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#93e3fe",
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#49D7E5",
    width: layout.width,
  },
  imageContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    width: layout.width,
  },
  menuContainer: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
    width: layout.width,
  },
});
