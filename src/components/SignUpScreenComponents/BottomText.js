import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { layout } from "../../constants/layout";

const BottomText = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>
        By continuing you agree to the app's Terms of Services & Privacy Policy
      </Text>
    </View>
  );
};

export default BottomText;

const styles = StyleSheet.create({
  root: {
    width: layout.widthp,
    justifyContent: "flex-end",
    flex: 1,
    paddingBottom: 20,
  },
  text: {
    textAlign: "center",
    fontFamily: "inter-medium",
    fontSize: 13,
  },
});
