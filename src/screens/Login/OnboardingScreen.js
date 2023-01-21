import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Modal from "../../components/OnboarindScreenComponets/Modal";

const OnboardingScreen = () => {
  return (
    <View style={styles.root}>
      <View style={{ flex: 1 }}>
        <Text>OnboardingScreen</Text>
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
});
