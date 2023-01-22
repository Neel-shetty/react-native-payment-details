import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { layout } from "../constants/layout";
import { colors } from "../constants/colors";

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.root}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  root: {
    width: layout.widthp,
    height: 46,
    borderRadius: 50,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "inter-bold",
    fontSize: 16,
    color: "white",
  },
});
