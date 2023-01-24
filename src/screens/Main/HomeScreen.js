import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../../components/HomeScreenComponents/Header";
import Image from "../../components/HomeScreenComponents/ImageBg";
import { layout } from "../../constants/layout";

const HomeScreen = () => {
  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View style={styles.imageContainer}>
        <Image />
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
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: layout.width,
  },
});
