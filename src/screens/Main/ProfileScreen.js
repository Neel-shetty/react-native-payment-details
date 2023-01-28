import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import Header from "../../components/ProfileScreenComponents/Header";
import Fields from "../../components/ProfileScreenComponents/Fields";

const ProfileScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 70}
      enabled={false}
      style={styles.root}
    >
      {/* <View style={styles.root}> */}
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Header />
      </View>
      <View
        style={{ alignItems: "center", justifyContent: "flex-start", flex: 8 }}
      >
        <Fields />
      </View>
      {/* </View> */}
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
