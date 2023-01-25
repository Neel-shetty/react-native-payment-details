import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { layout } from "../../constants/layout";

const BottomContainer = () => {
  return (
    <View style={styles.root}>
      <Text>BottomContainer</Text>
    </View>
  );
};

export default BottomContainer;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    height: 400,
    width: layout.width,
    elevation: 6,
    backgroundColor: "white",
    borderRadius: 20,
    flex: 1,
  },
});
