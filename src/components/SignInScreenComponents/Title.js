import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { layout } from "../../constants/layout";

const Title = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.title1}>Let's Sign you in</Text>
      <Text style={styles.title2}>You have been Missed!</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  root: {
    width: layout.widthp,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title1: {
    fontFamily: "inter-regular",
    fontSize: 16,
    color: "#181A20",
  },
  title2: {
    fontFamily: "poppins-semibold",
    fontSize: 24,
    color: "#231F20",
  },
});
