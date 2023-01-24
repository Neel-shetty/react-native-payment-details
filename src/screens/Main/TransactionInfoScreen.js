import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../../components/TransactionInfoScreenComponents/Header";

const TransactionInfoScreen = ({ route }) => {
  console.log(route?.params?.transaction_id);

  return (
    <View>
      <Header />
    </View>
  );
};

export default TransactionInfoScreen;

const styles = StyleSheet.create({});
