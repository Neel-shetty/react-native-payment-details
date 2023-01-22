import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Modal from "../../components/OnboarindScreenComponets/Modal";
import { layout } from "../../constants/layout";

const OnboardingScreen = () => {
  return (
    <View style={styles.root}>
      <View style={{ flex: 1 }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>AppName</Text>
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
    backgroundColor: "#F5F6FC",
  },
  modalContainer: {
    flex: 1,
  },
  titleContainer: {
    width: layout.widthp,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "poppins-semibold",
    fontSize: 28.33,
  },
});
