import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { layout } from "../../constants/layout";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../constants/colors";

const TransactionItem = ({ data }) => {
  const navigation = useNavigation();
  function transactionDetails() {
    // navigation.navigate("DetailScreen");
  }
  return (
    <TouchableOpacity onPress={transactionDetails}>
      <View style={styles.root}>
        <Text style={styles.title}>Transaction {data}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  root: {
    height: 50,
    width: layout.widthp,
    elevation: 6,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: colors.green,
  },
  title: {
    fontFamily: "poppins-medium",
    fontSize: 16,
  },
});
