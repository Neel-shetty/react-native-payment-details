import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { layout } from "../../constants/layout";
import { colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const Modal = () => {
  return (
    <View style={styles.root}>
      <View style={styles.iconContainer}>
        <Ionicons name="home" size={55} color={colors.green} />
      </View>
      <View style={styles.textContainer}>
        <Text>Welcome to AppName</Text>
        <Text>The best app for lorem ipsum lorem ipsum</Text>
      </View>
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
    backgroundColor: colors.whiteBg,
  },
  iconContainer: {
    width: layout.widthp,
  },
  textContainer: {
    width: layout.widthp,
  },
  title: {
    
  },
});
