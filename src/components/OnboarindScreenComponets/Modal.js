import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { layout } from "../../constants/layout";
import { colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../CustomButton";
import SecondaryButton from "../SecondaryButton";

const Modal = () => {
  return (
    <View style={styles.root}>
      <View style={styles.iconContainer}>
        <Ionicons name="home" size={55} color={colors.green} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome to AppName</Text>
        <Text style={styles.subtitle}>
          The best app for lorem ipsum lorem ipsum
        </Text>
      </View>
      <View style={styles.line} />
      <View style={styles.buttonContainer}>
        <View style={{ paddingVertical: 8 }}>
          <CustomButton title={"Sign In"} />
        </View>
        <View style={{ paddingVertical: 8 }}>
          <SecondaryButton title={"Sign Up"} />
        </View>
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
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  textContainer: {
    width: layout.widthp,
    flex: 2,
    alignItems: "flex-start",
    // justifyContent: "center",
    paddingTop: 10,
  },
  title: {
    fontFamily: "poppins-semibold",
    fontSize: 24,
  },
  subtitle: {
    fontFamily: "poppins-semibold",
    fontSize: 18,
    color: "#rgba(24, 26, 32, 0.55)",
  },
  line: {
    height: 1,
    width: layout.widthp,
    backgroundColor: "#rgba(24, 26, 32, 0.55)",
    marginVertical: 10,
  },
  buttonContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});
