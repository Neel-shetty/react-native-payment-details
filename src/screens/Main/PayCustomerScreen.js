import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import TopContainer from "../../components/PayCustomerScreenComponents/TopContainer";
import SearchBar from "../../components/PayCustomerScreenComponents/SearchBar";
import BottomContainer from "../../components/PayCustomerScreenComponents/BottomContainer";
const PayCustomerScreen = () => {
  return (
    // <View style={styles.root}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 70}
      enabled={false}
      style={styles.root}
    >
      <SafeAreaView style={styles.root}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 20,
          }}
        >
          <SearchBar />
        </View>
        <View
          style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
        >
          <TopContainer />
        </View>
        <View style={{ flex: 5 }}>
          <BottomContainer />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default PayCustomerScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#F6F7FD",

  },
});
