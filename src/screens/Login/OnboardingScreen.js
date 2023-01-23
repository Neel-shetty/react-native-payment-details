import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Modal from "../../components/OnboarindScreenComponets/Modal";
import { layout } from "../../constants/layout";

const OnboardingScreen = () => {
  return (
    <View style={styles.root}>
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Wallet Management</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/images/oBg.jpg")}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.modalContainer}>
        <Modal />
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eaf3fa",
    width: layout.width,
  },
  modalContainer: {
    flex: 1,
  },
  titleContainer: {
    width: layout.widthp,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    // backgroundColor: "pink",
    alignSelf: "center",
  },
  title: {
    fontFamily: "poppins-semibold",
    fontSize: 28.33,
  },
  image: {
    // width: layout.width,
    height: 300,
    // width: 600,
    // alignSelf: "center",
    resizeMode: "contain",
    width: "100%",
    // transform: [{ scale: 0.5 }],
  },
  imageContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    flex: 1,
    width: layout.width,
    // alignItems: "center",
    justifyContent: "center",
  },
});
