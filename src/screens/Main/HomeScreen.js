import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import Header from "../../components/HomeScreenComponents/Header";
import Image from "../../components/HomeScreenComponents/ImageBg";
import { layout } from "../../constants/layout";
import Menu from "../../components/HomeScreenComponents/Menu";
import { colors } from "../../constants/colors";
import { StatusBar } from "expo-status-bar";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View style={styles.imageContainer}>
        <Image />
      </View>
      <View style={styles.menuContainer}>
        <Menu />
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
    backgroundColor: "#F6F7FD",
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    width: layout.width,
    // backgroundColor: "pink",
  },
  menuContainer: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
    width: layout.width,
  },
});
