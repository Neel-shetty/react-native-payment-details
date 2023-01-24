import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../../components/TransactionInfoScreenComponents/Header";
import TData from "../../components/TransactionInfoScreenComponents/TData";
import { layout } from "../../constants/layout";

const TransactionInfoScreen = ({ route }) => {
  console.log(route?.params?.transaction_id);

  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View style={styles.dataContainer}>
        <TData />
      </View>
    </View>
  );
};

export default TransactionInfoScreen;

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
