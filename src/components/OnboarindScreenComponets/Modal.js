import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { layout } from "../../constants/layout";

const Modal = () => {
  return (
    <View style={styles.root}>
      <Text>Modal</Text>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: layout.width,
    borderRadius: 30,
  },
});
