import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { layout } from "../../constants/layout";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/ReceiptInfoScreenComponents/Header";
import TData from "../../components/ReceiptInfoScreenComponents/TData";

const ReceiptInfoScreen = ({ route }) => {
  console.log(route?.params?.transaction_id);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View style={styles.dataContainer}>
        <TData />
      </View>
    </View>
  );
};

export default ReceiptInfoScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  dataContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 7,
    // backgroundColor: "pink",
    width: layout.width,
  },
});
