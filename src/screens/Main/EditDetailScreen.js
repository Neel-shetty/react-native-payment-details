import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/EditDetailScreenComponents/Header";
import Fields from "../../components/EditDetailScreenComponents/Fields";

const EditDetailScreen = () => {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.headerContainer}>
        <Header />
      </View>
      {/* <Text>{text}</Text> */}
      <View style={styles.fieldContainer}>
        <Fields />
      </View>
    </View>
  );
};

export default EditDetailScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldContainer: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "pink",
  },
});
