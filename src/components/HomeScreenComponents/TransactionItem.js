import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { layout } from "../../constants/layout";
import { useNavigation } from "@react-navigation/native";

const TransactionItem = () => {
  const navigation = useNavigation();
  function transactionDetails() {
    navigation.navigate("DetailScreen");
  }
  return (
    <TouchableOpacity onPress={transactionDetails}>
      <View style={styles.root}>
        <Text>TransactionItem</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  root: {
    height: 100,
    width: layout.widthp,
    elevation: 6,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
