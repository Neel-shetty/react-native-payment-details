import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { colors } from "../../constants/colors";
import Header from "../../components/SignInScreenComponents/Header";
import { layout } from "../../constants/layout";
import Title from "../../components/SignInScreenComponents/Title";
import InputFields from "../../components/SignInScreenComponents/InputFields";
import BottomText from "../../components/SignInScreenComponents/BottomText";
import { StatusBar } from "expo-status-bar";

const SignInScreen = ({ navigation }) => {
  function backButton() {
    navigation.goBack();
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 70}
      enabled={false}
      style={styles.root}
    >
      <StatusBar style="dark" />
      <View style={styles.headerContainer}>
        <Header loc="signIn" back={backButton} />
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
        <View style={styles.empty} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

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
    flex: 3,
    // backgroundColor: "violet",
  },
  bottomContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    // backgroundColor: "coral",
  },
  empty: {
    flex: 4,
  },
});
