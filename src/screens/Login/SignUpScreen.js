import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { colors } from "../../constants/colors";
import { layout } from "../../constants/layout";
import Header from "../../components/SignInScreenComponents/Header";
import Title from "../../components/SignUpScreenComponents/Title";
import InputFields from "../../components/SignUpScreenComponents/InputFields";
import BottomText from "../../components/SignUpScreenComponents/BottomText";

const SignUpScreen = ({ navigation }) => {
  function backButton() {
    navigation.goBack();
  }
  return (
    // <View style={styles.root}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 70}
      enabled={false}
      style={styles.root}
    >
      <View style={styles.headerContainer}>
        <Header back={backButton} />
      </View>
      <View style={styles.popupContainer}>
        <View style={styles.titleContainer}>
          <Title />
        </View>
        <View style={styles.inputContainer}>
          <InputFields />
        </View>
        <View style={styles.bottomContainer}>
          <BottomText />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: colors.rootBgColor,
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  popupContainer: {
    flex: 6,
    width: layout.width,
    backgroundColor: colors.whiteBg,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: layout.width,
    flex: 1,
    // backgroundColor: "pink",
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 4,
    // paddingTop:30,
    // backgroundColor: "violet",
  },
  bottomContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 3,
    // backgroundColor: "coral",
  },
  // empty: {
  //   flex: 4,
  // },
});
